from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sympy as sp
import numpy as np
from fastapi import FastAPI

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extractMatrixAndCoords(body):
    metric = body['metric']
    metric = sp.Matrix(metric)
    coords = body['coords']
    shape = len(coords)
    metric = metric.reshape(shape,shape)
    if('partial_derivatives' not in body):
        return metric, coords, None
    partial_derivatives = body['partial_derivatives']
    return metric, coords, partial_derivatives

def dg(g, coords, i, j, k):

    x_k = coords[k]
    res = sp.diff(g[i,j], x_k)
    res = sp.simplify(res)
    return res

def christ1(i, j, k):

    res = 0.5 * (dg(j, i, k) + dg(k, i, j) - dg(j, k, i))
    res = sp.simplify(res)
    return res

def christ2(g, coords, i, j, k):

    GI = g.inv()
    dim = len(coords)
    res = 0
    for l in range(dim):
        res += 0.5 * GI[i, l] * (dg(g, coords, j, l, k) + dg(g, coords, k, l, j) - dg(g, coords, j, k, l))

    return sp.simplify(res)

def christoffel_symbols(g, coords):

    dim = len(coords)
    mat = np.zeros((dim, dim, dim), dtype=object)

    for i in range(dim):
        for j in range(dim):
            for k in range(dim):
                mat[i, j, k] = christ2(g, coords, i, j, k)

    return mat

@app.get("/api/ping")
def ping():
    return {"message": "pong"}

@app.get("/api/sympy_test")
def sympy_test():
    x = sp.Symbol('x')
    expr = sp.sin(x**2)
    derivative = sp.diff(expr, x)
    return {"expr": str(expr), "derivative": str(derivative)}
            
@app.post("/api/trace")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    trace = sp.trace(metric)
    strTrace = str(trace)
    return {"trace": {
        "value": strTrace,
        "latex": sp.latex(trace)
    }}

@app.post("/api/determinant")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    determinant = sp.simplify(sp.det(metric))
    strDeterminant = str(determinant)
    return {"determinant": {
        "value": strDeterminant,
        "latex": sp.latex(determinant)
    }}

@app.post("/api/inverse")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    inverse = sp.simplify(metric.inv())
    strInverse = str(inverse.tolist())
    return {"inverse": {
        "value": strInverse,
        "latex": sp.latex(inverse)
    }}

@app.post("/api/transpose")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    transpose = str(metric.T.tolist())
    return {"transpose": transpose}

@app.post("/api/partial_derivatives")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, _  = extractMatrixAndCoords(body)   
    shape = len(coords)

    # dg_array = np.empty((shape,shape,shape), dtype=object)
    dg_array=[sp.zeros(shape, shape) for _ in range(shape)]

    for i in range(shape):
        for j in range(shape):
            for k in range(shape):

                    dg_array[k][i,j] = dg(metric, coords, i, j, k)

    formattedValue = { coords[i]: str(dg_array[i].tolist()) for i in range(shape) }
    formattedLatex = {coords[i]: sp.latex(dg_array[i]) for i in range(shape) }
    return {
        "partial_derivatives": {
            "value": formattedValue,
            "latex": formattedLatex
        }
    }

@app.post("/api/christoffel_1")
async def get_body(req: Request):
    body = await req.json()
    _, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    shape = len(coords)

    christoffel_1_arrays = [sp.zeros(shape, shape) for _ in range(shape)]
    
    for i in range(shape):
        for j in range(shape):
            for k in range(shape):

                res = 0.5*(sp.Matrix(sp.parse_expr(partial_derivatives[coords[j]]))[k,i] + 
                           sp.Matrix(sp.parse_expr(partial_derivatives[coords[i]]))[k,j] - 
                           sp.Matrix(sp.parse_expr(partial_derivatives[coords[k]]))[i,j])
                res=str(sp.simplify(res))

                christoffel_1_arrays[k][i,j] = res

    formattedValue = { coords[i]: str(christoffel_1_arrays[i].tolist()) for i in range(shape) }
    formattedLatex = {coords[i]: sp.latex(christoffel_1_arrays[i]) for i in range(shape) }
                    
    return {
        "christoffel_1": {
            "value": formattedValue,
            "latex": formattedLatex
            }
        }

    
@app.post("/api/christoffel_2")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    shape = len(coords)

    if(partial_derivatives == None):
        return {"christoffel_2": "partial_derivatives not found"}
    
    res = christoffel_symbols(metric, coords)

    return {
        "christoffel_2": {
            coords[i]: str(res[i].tolist()) for i in range(shape)
            }
        } 
    
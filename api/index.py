from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sympy as sp
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
    metric = metric.reshape(3,3)
    if('coords' not in body):
        return metric, None, None
    coords = body['coords']
    if('partial_derivatives' not in body):
        return metric, coords, None
    partial_derivatives = body['partial_derivatives']
    return metric, coords, partial_derivatives

@app.get("/python/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/python/ping")
def ping():
    return {"message": "pong"}

@app.get("/python/sympy_test")
def sympy_test():
    x = sp.Symbol('x')
    expr = sp.sin(x**2)
    derivative = sp.diff(expr, x)
    return {"expr": str(expr), "derivative": str(derivative)}
            
@app.post("/python/trace")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    trace = str(sp.trace(metric))
    return {"trace": trace}

@app.post("/python/determinant")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    determinant = str(sp.simplify(sp.det(metric)))
    return {"determinant": determinant}

@app.post("/python/inverse")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    inverse = str(sp.simplify(metric.inv()).tolist())
    return {"inverse": inverse}

@app.post("/python/transpose")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    transpose = str(metric.T.tolist())
    return {"transpose": transpose}

@app.post("/python/partial_derivatives")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, _  = extractMatrixAndCoords(body)   
    dg_arrays = [
        sp.zeros(3, 3),
        sp.zeros(3, 3),
        sp.zeros(3, 3)
    ]

    if(coords == None):
        return {"partial_derivatives": "coords not found"}

    for i in range(3):
        for j in range(3):
            for k in range(3):
                res = sp.diff(metric[i,j], coords[k])
                res = str(sp.simplify(res))
                dg_arrays[k][i,j] = res

    return {
        "partial_derivatives": {
            coords[0]: str(dg_arrays[0].tolist()), 
            coords[1]: str(dg_arrays[1].tolist()), 
            coords[2]: str(dg_arrays[2].tolist())
            }}

@app.post("/python/christoffel_1")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    
    christoffel_1_arrays = [
        sp.zeros(3, 3),
        sp.zeros(3, 3),
        sp.zeros(3, 3)
    ]

    if(coords == None):
        return {"christoffel_1": "coords not found"}
    
    if(partial_derivatives == None):
        return {"christoffel_1": "partial_derivatives not found"}
    
    for i in range(3):
        for j in range(3):
            for k in range(3):

                res = 0.5*(sp.Matrix(sp.parse_expr(partial_derivatives[coords[j]]))[k,i] + 
                           sp.Matrix(sp.parse_expr(partial_derivatives[coords[i]]))[k,j] - 
                           sp.Matrix(sp.parse_expr(partial_derivatives[coords[k]]))[i,j])
                res=str(sp.simplify(res))

                christoffel_1_arrays[k][i,j] = res
                    
    return {
        "christoffel_1": {
            coords[0]: str(christoffel_1_arrays[0].tolist()), 
            coords[1]: str(christoffel_1_arrays[1].tolist()), 
            coords[2]: str(christoffel_1_arrays[2].tolist())
            }}

    
@app.post("/python/christoffel_2")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    
    christoffel_2_arrays = [
        sp.zeros(3, 3),
        sp.zeros(3, 3),
        sp.zeros(3, 3)
    ]


    if(metric == None):
        return {"christoffel_2": "metric not found"}

    if(coords == None):
        return {"christoffel_2": "coords not found"}
    
    if(partial_derivatives == None):
        return {"christoffel_2": "partial_derivatives not found"}
    
    contra_metric = metric.inv()
                    
    for i in range(3):
        for j in range(3):
            for k in range(3):
                res = 0
                for l in range(3):

                    res += contra_metric[i,l]*(
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[k]]))[j,l] +
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[j]]))[k,l] -
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[l]]))[j,k])
                    res = sp.simplify(res)
                
                christoffel_2_arrays[k][i,j] = str(res)
                christoffel_2_arrays[k][j,i] = str(res)
    
    return {
        "christoffel_2": {
            coords[0]: str(christoffel_2_arrays[0].tolist()), 
            coords[1]: str(christoffel_2_arrays[1].tolist()), 
            coords[2]: str(christoffel_2_arrays[2].tolist())
            }}
                    
    
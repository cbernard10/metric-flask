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
    coords = body['coords']
    shape = len(coords)
    metric = metric.reshape(shape,shape)
    if('partial_derivatives' not in body):
        return metric, coords, None
    partial_derivatives = body['partial_derivatives']
    return metric, coords, partial_derivatives


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
    trace = str(sp.trace(metric))
    return {"trace": trace}

@app.post("/api/determinant")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    determinant = str(sp.simplify(sp.det(metric)))
    return {"determinant": determinant}

@app.post("/api/inverse")
async def get_body(req: Request):
    body = await req.json()
    metric, _, _ = extractMatrixAndCoords(body)
    inverse = str(sp.simplify(metric.inv()).tolist())
    return {"inverse": inverse}

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

    dg_arrays = [sp.zeros(shape, shape) for _ in range(shape)]

    for i in range(shape):
        for j in range(shape):
            for k in range(shape):
                res = sp.diff(metric[i,j], coords[k])
                res = str(sp.simplify(res))
                dg_arrays[k][i,j] = res

    return {
        "partial_derivatives": {
            coords[i]: str(dg_arrays[i].tolist()) for i in range(shape)
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
                    
    return {
        "christoffel_1": {
            coords[i]: str(christoffel_1_arrays[i].tolist()) for i in range(shape)
            }
        }

    
@app.post("/api/christoffel_2")
async def get_body(req: Request):
    body = await req.json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    shape = len(coords)

    christoffel_2_arrays = [sp.zeros(shape, shape) for _ in range(shape)]
    
    if(partial_derivatives == None):
        return {"christoffel_2": "partial_derivatives not found"}
    
    contra_metric = metric.inv()
                    
    for i in range(shape):
        for j in range(shape):
            for k in range(shape):
                res = 0
                for l in range(shape):

                    res += contra_metric[i,l]*(
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[k]]))[j,l] +
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[j]]))[k,l] -
                        sp.Matrix(sp.parse_expr(partial_derivatives[coords[l]]))[j,k])
                    res = sp.simplify(res)
                
                christoffel_2_arrays[k][i,j] = str(res)
                christoffel_2_arrays[k][j,i] = str(res)
    
    return {
        "christoffel_2": {
            coords[i]: str(christoffel_2_arrays[i].tolist()) for i in range(shape)
            }
        } 
    
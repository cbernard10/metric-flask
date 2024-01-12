from fastapi import FastAPI, Request
from fastapi***REMOVED***middleware***REMOVED***cors import CORSMiddleware
import sympy as sp
from fastapi import FastAPI

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app = FastAPI()

app***REMOVED***add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extractMatrixAndCoords(body):
    metric = body['metric']
    metric = sp***REMOVED***Matrix(metric)
    metric = metric***REMOVED***reshape(3,3)
    if('coords' not in body):
        return metric, None, None
    coords = body['coords']
    if('partial_derivatives' not in body):
        return metric, coords, None
    partial_derivatives = body['partial_derivatives']
    return metric, coords, partial_derivatives

@app***REMOVED***get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app***REMOVED***get("/api/ping")
def ping():
    return {"message": "pong"}

@app***REMOVED***get("/api/sympy_test")
def sympy_test():
    x = sp***REMOVED***Symbol('x')
    expr = sp***REMOVED***sin(x**2)
    derivative = sp***REMOVED***diff(expr, x)
    return {"expr": str(expr), "derivative": str(derivative)}
            
@app***REMOVED***post("/api/trace")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _, _ = extractMatrixAndCoords(body)
    trace = str(sp***REMOVED***trace(metric))
    return {"trace": trace}

@app***REMOVED***post("/api/determinant")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _, _ = extractMatrixAndCoords(body)
    determinant = str(sp***REMOVED***simplify(sp***REMOVED***det(metric)))
    return {"determinant": determinant}

@app***REMOVED***post("/api/inverse")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _, _ = extractMatrixAndCoords(body)
    inverse = str(sp***REMOVED***simplify(metric***REMOVED***inv())***REMOVED***tolist())
    return {"inverse": inverse}

@app***REMOVED***post("/api/transpose")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _, _ = extractMatrixAndCoords(body)
    transpose = str(metric***REMOVED***T***REMOVED***tolist())
    return {"transpose": transpose}

@app***REMOVED***post("/api/partial_derivatives")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords, _  = extractMatrixAndCoords(body)   
    dg_arrays = [
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3)
    ]

    if(coords == None):
        return {"partial_derivatives": "coords not found"}

    for i in range(3):
        for j in range(3):
            for k in range(3):
                res = sp***REMOVED***diff(metric[i,j], coords[k])
                res = str(sp***REMOVED***simplify(res))
                dg_arrays[k][i,j] = res

    return {
        "partial_derivatives": {
            coords[0]: str(dg_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(dg_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(dg_arrays[2]***REMOVED***tolist())
            }}

@app***REMOVED***post("/api/christoffel_1")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    
    christoffel_1_arrays = [
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3)
    ]

    if(coords == None):
        return {"christoffel_1": "coords not found"}
    
    if(partial_derivatives == None):
        return {"christoffel_1": "partial_derivatives not found"}
    
    for i in range(3):
        for j in range(3):
            for k in range(3):

                res = 0***REMOVED***5*(sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[j]]))[k,i] + 
                           sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[i]]))[k,j] - 
                           sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[k]]))[i,j])
                res=str(sp***REMOVED***simplify(res))

                christoffel_1_arrays[k][i,j] = res
                    
    return {
        "christoffel_1": {
            coords[0]: str(christoffel_1_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(christoffel_1_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(christoffel_1_arrays[2]***REMOVED***tolist())
            }}

    
@app***REMOVED***post("/api/christoffel_2")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords, partial_derivatives = extractMatrixAndCoords(body)   
    print('partial_derivatives', partial_derivatives)
    
    christoffel_2_arrays = [
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3)
    ]


    if(metric == None):
        return {"christoffel_2": "metric not found"}

    if(coords == None):
        return {"christoffel_2": "coords not found"}
    
    if(partial_derivatives == None):
        return {"christoffel_2": "partial_derivatives not found"}
    
    contra_metric = metric***REMOVED***inv()
                    
    for i in range(3):
        for j in range(3):
            for k in range(3):
                res = 0
                for l in range(3):

                    res += contra_metric[i,l]*(
                        sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[k]]))[j,l] +
                        sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[j]]))[k,l] -
                        sp***REMOVED***Matrix(sp***REMOVED***parse_expr(partial_derivatives[coords[l]]))[j,k])
                    res = sp***REMOVED***simplify(res)
                
                christoffel_2_arrays[k][i,j] = str(res)
                christoffel_2_arrays[k][j,i] = str(res)
    
    return {
        "christoffel_2": {
            coords[0]: str(christoffel_2_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(christoffel_2_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(christoffel_2_arrays[2]***REMOVED***tolist())
            }}
                    
    
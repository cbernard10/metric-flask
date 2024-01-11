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
    if('diffMatrix' not in body):
        return metric, coords, None
    diffMatrix = body['diffMatrix']
    return metric, coords, diffMatrix

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

@app***REMOVED***post("/api/diffMatrix")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords, _  = extractMatrixAndCoords(body)   
    dg_arrays = [
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3)
    ]

    if(coords == None):
        return {"diffMatrix": "coords not found"}

    for i in range(3):
        for j in range(3):
            for k in range(3):
                res = sp***REMOVED***diff(metric[i,j], coords[k])
                res = str(sp***REMOVED***simplify(res))
                dg_arrays[k][i,j] = res

    return {
        "diffMatrix": {
            coords[0]: str(dg_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(dg_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(dg_arrays[2]***REMOVED***tolist())
            }}

@app***REMOVED***post("/api/christ1")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords, diffMatrix = extractMatrixAndCoords(body)   
    print('diffMatrix', diffMatrix)
    
    christ1_arrays = [
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3),
        sp***REMOVED***zeros(3, 3)
    ]


    if(coords == None):
        return {"christ1": "coords not found"}
    
    if(diffMatrix == None):
        return {"christ1": "diffMatrix not found"}
    
    for i in range(3):
        for j in range(3):
            for k in range(3):

                # print(coords[j])
                # print(diffMatrix[coords[j]])
                # A = sp***REMOVED***Matrix(sp***REMOVED***parse_expr(diffMatrix[coords[j]]))
                # print(A)

                res = 0***REMOVED***5*(sp***REMOVED***Matrix(sp***REMOVED***parse_expr(diffMatrix[coords[j]]))[k,i] + 
                           sp***REMOVED***Matrix(sp***REMOVED***parse_expr(diffMatrix[coords[i]]))[k,j] - 
                           sp***REMOVED***Matrix(sp***REMOVED***parse_expr(diffMatrix[coords[k]]))[i,j])
                res=str(sp***REMOVED***simplify(res))

                christ1_arrays[k][i,j] = res
                    
    return {
        "christ1": {
            coords[0]: str(christ1_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(christ1_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(christ1_arrays[2]***REMOVED***tolist())
            }}

    
# def dg(self, i, j, k, at=None):

    
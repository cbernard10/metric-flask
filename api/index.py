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
        return metric, None
    coords = body['coords']
    return metric, coords

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
    metric, _ = extractMatrixAndCoords(body)
    trace = str(sp***REMOVED***trace(metric))
    return {"trace": trace}

@app***REMOVED***post("/api/determinant")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _ = extractMatrixAndCoords(body)
    determinant = str(sp***REMOVED***det(metric))
    return {"determinant": determinant}

@app***REMOVED***post("/api/inverse")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _ = extractMatrixAndCoords(body)
    inverse = str(metric***REMOVED***inv()***REMOVED***tolist())
    return {"inverse": inverse}

@app***REMOVED***post("/api/transpose")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, _ = extractMatrixAndCoords(body)
    transpose = str(metric***REMOVED***T***REMOVED***tolist())
    return {"transpose": transpose}

@app***REMOVED***post("/api/diffMatrix")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric, coords = extractMatrixAndCoords(body)   
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
                res = str(res)
                dg_arrays[k][i,j] = res

    return {
        "diffMatrix": {
            coords[0]: str(dg_arrays[0]***REMOVED***tolist()), 
            coords[1]: str(dg_arrays[1]***REMOVED***tolist()), 
            coords[2]: str(dg_arrays[2]***REMOVED***tolist())
            }}

# def dg(self, i, j, k, at=None):

    
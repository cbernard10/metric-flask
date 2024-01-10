from fastapi import FastAPI, Request
import sympy as sp

app = FastAPI()

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
            
@app***REMOVED***post("/api/metric")
async def get_body(req: Request):
    body = await req***REMOVED***json()
    metric = body['metric']
    metric = sp***REMOVED***Matrix(metric)
    metric = metric***REMOVED***reshape(3,3)
    trace = str(sp***REMOVED***trace(metric))
    return {"trace": trace}
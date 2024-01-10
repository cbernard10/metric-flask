from fastapi import FastAPI
import sympy as sp

app = FastAPI()

@app***REMOVED***get("/api/python")
def hello_world():
    return {"message": "Hello World"}
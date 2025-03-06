from fastapi import FastAPI
from pydantic import BaseModel
from backend.chat_with_groq import chat_with_model
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    query: str

@app.post("/chat")
def chat(query: Query):
    response = chat_with_model(query.query)
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run("run_backend:app", host="127.0.0.1", port=8000)
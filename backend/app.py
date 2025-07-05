from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the knowledge base
with open("backend/documents/knowledge_base.jsonl", "r", encoding="utf-8") as f:
    qa_data = [json.loads(line) for line in f]

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    query = data.get("message", "").lower()

    # Simple keyword-based search
    best_match = max(qa_data, key=lambda qa: sum(word in qa["question"].lower() for word in query.split()))
    return {"response": best_match["answer"]}

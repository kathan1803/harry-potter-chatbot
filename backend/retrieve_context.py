import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("data/book_embeddings.index")

with open("data/harry_potter.json", "r", encoding="utf-8") as f:
    book_data = json.load(f)

texts = book_data["content"]

def get_relevant_text(query):
    """Find the most relevant paragraph from the book using FAISS."""
    query_embedding = model.encode([query])
    
    # Search for the closest match
    _, indices = index.search(query_embedding, 1)
    
    # Fetch the corresponding paragraph
    retrieved_index = indices[0][0]  # Get the first retrieved index
    if retrieved_index < len(texts):
        return texts[retrieved_index]
    else:
        return "No relevant context found."
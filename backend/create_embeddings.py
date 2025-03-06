import json
import faiss
from sentence_transformers import SentenceTransformer

# Load pre-trained model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Wikipedia data
with open("data/harry_potter.json", "r", encoding="utf-8") as f:
    book_data = json.load(f)

print("File loaded successfully!")

texts = book_data["content"]

# Generate embeddings
embeddings = model.encode(texts, convert_to_numpy=True)

# FAISS index
d = embeddings.shape[1]  # Get embedding dimension
index = faiss.IndexFlatL2(d)

index.add(embeddings)

faiss.write_index(index, "data/book_embeddings.index")

print("FAISS index created and saved successfully!")
import groq
from backend.retrieve_context import get_relevant_text
from backend.config import GROQ_API_KEY  # Make sure this contains your Groq API key

client = groq.Client(api_key=GROQ_API_KEY)

def chat_with_model(query):
    if not GROQ_API_KEY:
        raise ValueError("API key is missing. Set GROQ_API_KEY in backend/config.py or as an environment variable.")

    context = get_relevant_text(query)

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {"role": "system", "content": "You are a Harry Potter expert and have equal knowledge of all books and must only answer using official book content."},
            {"role": "system", "content": f"Relevant book passage: {context}"},
            {"role": "user", "content": query}
        ]
    )

    return response.choices[0].message.content
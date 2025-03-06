import requests
from bs4 import BeautifulSoup
import json
import os

URL = "https://en.wikipedia.org/wiki/Harry_Potter"

OUTPUT_FILE = "data/harry_potter.json"

def fetch_harry_potter_data():
    """Fetch the full Wikipedia article and store ita in JSON format."""
    response = requests.get(URL)
    
    if response.status_code != 200:
        print(f"Failed to fetch the page. Status Code: {response.status_code}")
        return
    
    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.find("h1").text.strip()

    content = []
    for paragraph in soup.find_all("p"):
        text = paragraph.text.strip()
        if text:
            content.append(text)

    data = {
        "title": title,
        "url": URL,
        "content": content
    }

    os.makedirs("data", exist_ok=True)  # Ensure the data directory exists
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Content successfully saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    fetch_harry_potter_data()
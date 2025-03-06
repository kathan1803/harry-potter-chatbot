import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Oops! Something went wrong");
    }

    setLoading(false);
    setInput(""); // Clear input after sending
  };

  return (
    <div className="container">
      <h1>🧙‍♂️ Harry Potter Chatbot</h1>
      <div className="chat-box">
        {loading ? (
          <p className="loading">Thinking...</p>
        ) : (
          <p className="response">{response}</p>
        )}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Ask me anything about Harry Potter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

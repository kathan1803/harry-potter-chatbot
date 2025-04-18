import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      text: "Welcome to the Wizarding World! I'm your magical guide to all things Harry Potter. What would you like to know?", 
      sender: "bot" 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "By Merlin's beard! Something went wrong with the connection. Please try again.", sender: "bot" }]);
    }

    setLoading(false);
    setInput(""); // Clear input after sending
  };

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Random Harry Potter themed loading phrases
  const loadingPhrases = [
    "Consulting my Pensieve...",
    "Checking with the portraits...",
    "Asking the sorting hat...",
    "Brewing a response...",
    "Sending an owl...",
  ];
  
  const randomLoadingPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];

  return (
    <div className="app-background">
      <div className="container">
        <h1>
          <span className="wand">⚡</span> 
          Hogwarts Chat Assistant
          <span className="wand">⚡</span>
        </h1>
        
        <div className="chat-box">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}
            >
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message bot-message">
              <div className="message-bubble loading">
                <div className="loading-text">{randomLoadingPhrase}</div>
                <div className="loading-dots">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-box">
          <textarea
            placeholder="Ask me anything about Harry Potter..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button onClick={sendMessage} disabled={loading}>
            <span className="button-text">Cast</span>
          </button>
        </div>
        
        <div className="footer">
          Created with a bit of magic and React ✨
        </div>
      </div>
    </div>
  );
}

export default App;

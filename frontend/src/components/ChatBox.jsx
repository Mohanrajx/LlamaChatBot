import React, { useState } from 'react';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    const botMessage = { sender: "bot", text: data.response };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="w-full max-w-2xl p-4 bg-white text-black rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">🎓 Admission Chatbot</h1>
      <div className="h-96 overflow-y-auto border p-2 mb-4 rounded bg-gray-100">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p className={msg.sender === "user" ? "bg-blue-200 inline-block px-3 py-1 m-1 rounded-lg" : "bg-green-200 inline-block px-3 py-1 m-1 rounded-lg"}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          className="flex-grow border rounded px-3 py-2"
          placeholder="Ask your question..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}

export default ChatBox;

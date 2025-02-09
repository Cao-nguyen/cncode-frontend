import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

function Diendan() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="container" style={{ padding: "100px 0px 0px 0px" }}>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4>Chat Room</h4>
        </div>
        <div className="card-body">
          <div
            className="chat-box mb-3"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <div className="p-2 bg-light rounded">{msg}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="btn btn-success" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diendan;

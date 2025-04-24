import React, { useEffect, useRef } from "react";

const ChatMessages = ({ messages, userDetails, selectedUserId }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add debug logging
  useEffect(() => {
    console.log("Messages in ChatMessages:", messages);
    console.log("User details:", userDetails);
  }, [messages, userDetails]);

  // Return early if no messages or selected user
  if (!selectedUserId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No messages yet. Start the conversation!
      </div>
    );
  }

  try {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((message, index) => {
          if (!message || !message.text) {
            console.error("Invalid message:", message);
            return null;
          }
          return (
            <div
              key={message._id || message.id || index}
              className={`flex ${
                message.sender === userDetails?._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === userDetails?._id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="break-words">{message.text}</p>
                <div className="text-xs mt-1 opacity-70">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  } catch (error) {
    console.error("Error rendering messages:", error);
    return <div>Error displaying messages</div>;
  }
};

export default ChatMessages;

// ChatHome.jsx
import React, { useEffect, useState, useRef } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const wsRef = useRef(null); // Use a ref to maintain a stable reference to the WebSocket
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // STEP 1: Create WebSocket connection ONLY ONCE when component mounts
  useEffect(() => {
    console.log("MOUNTING: Creating WebSocket connection");

    // Clean up any existing connection
    if (wsRef.current) {
      console.log("Closing existing connection");
      wsRef.current.close();
    }

    // Create new connection
    const newWs = new WebSocket(socketUrl);
    setWs(newWs);
    wsRef.current = newWs;

    // Set up basic handlers
    newWs.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    newWs.addEventListener("error", (e) => {
      console.error("WebSocket error:", e);
    });

    // Clean up function
    return () => {
      console.log("UNMOUNTING: Closing WebSocket connection");
      if (wsRef.current) {
        // Remove all listeners to prevent memory leaks
        wsRef.current.onmessage = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        wsRef.current.onopen = null;

        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []); // Empty dependencies - ONLY run on mount and unmount

  // STEP 2: Handle auto-reconnection
  useEffect(() => {
    if (!ws) return;

    const handleClose = () => {
      console.log("WebSocket connection closed unexpectedly");

      // Wait a bit before reconnecting
      setTimeout(() => {
        console.log("Attempting to reconnect...");

        // Create new connection
        const newWs = new WebSocket(socketUrl);
        setWs(newWs);
        wsRef.current = newWs;
      }, 2000);
    };

    ws.addEventListener("close", handleClose);

    return () => {
      ws.removeEventListener("close", handleClose);
    };
  }, [ws]);

  // STEP 3: Set up the message handler - ONLY ONE handler for all message types
  useEffect(() => {
    if (!ws) return;

    console.log("Setting up message handler");

    const messageHandler = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket message:", data);

        if ("online" in data) {
          // Handle online users update
          showOnlinePeople(data.online);
        } else if ("text" in data) {
          // Handle chat message - only process if it's for current conversation
          const isRelevantMessage =
            selectedUserId &&
            (data.sender === selectedUserId ||
              (data.recipient === selectedUserId &&
                data.sender === userDetails?._id));

          if (isRelevantMessage) {
            console.log("Adding message to conversation");

            // Add message only if it doesn't already exist (prevent duplicates)
            setMessages((prev) => {
              // Check for duplicates using ID
              const messageExists = prev.some(
                (msg) =>
                  (msg._id && msg._id === data._id) ||
                  (msg.id && msg.id === data.id) ||
                  (msg.tempId && msg.tempId === data.tempId)
              );

              if (messageExists) {
                console.log("Duplicate message detected - skipping");
                return prev;
              }

              return [...prev, data];
            });
          }
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    // Add only ONE message handler
    ws.addEventListener("message", messageHandler);

    // Clean up function to remove the handler
    return () => {
      console.log("Removing message handler");
      ws.removeEventListener("message", messageHandler);
    };
  }, [ws, selectedUserId, userDetails]);

  // STEP 4: Safe message sending with tempId for duplicate detection
  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !ws || !selectedUserId) return;

    const tempId = Date.now().toString(); // Unique ID for this message instance

    const messageData = {
      text: newMessage,
      recipient: selectedUserId,
      sender: userDetails._id,
      tempId: tempId, // Use this to detect duplicates
    };

    console.log("Sending message:", messageData);

    // Send over WebSocket
    ws.send(JSON.stringify(messageData));

    // Add to local state (optimistic update)
    setMessages((prev) => [
      ...prev,
      {
        ...messageData,
        isOwnMessage: true,
        _id: tempId, // Temporary ID until server confirms
        createdAt: new Date().toISOString(),
      },
    ]);

    // Clear input
    setNewMessage("");
  };

  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUserId) {
        try {
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get("/api/user/people");
        const offlinePeopleArr = res.data
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);
        const offlinePeopleWithAvatars = offlinePeopleArr.map((p) => ({
          ...p,
          avatarLink: p.avatarLink,
        }));
        setOfflinePeople(
          offlinePeopleWithAvatars.reduce((acc, p) => {
            acc[p._id] = p;
            return acc;
          }, {})
        );
      } catch (err) {
        console.error("Error fetching people:", err);
      }
    };
    if (userDetails?._id) fetchPeople();
  }, [onlinePeople, userDetails]);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = { username, avatarLink };
      }
    });
    setOnlinePeople(people);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />

      <div className="flex flex-col flex-grow relative">
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        {/* Messages area - make sure it has flex-grow to take available space */}
        <div className="flex-grow overflow-hidden flex flex-col">
          <ChatMessages
            messages={messages}
            userDetails={userDetails}
            selectedUserId={selectedUserId}
          />
        </div>

        {/* Input area - fixed at bottom */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHome;

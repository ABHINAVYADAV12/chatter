const ws = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });
  console.log("WebSocket server created");

  // Track connected clients for debugging
  setInterval(() => {
    console.log(`WebSocket clients connected: ${wss.clients.size}`);
  }, 30000);

  wss.on("connection", (connection, req) => {
    console.log("New WebSocket connection");

    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        Array.from(wss.clients).map(async (client) => {
          const { userId, username } = client;
          if (!userId) return null;

          const user = await User.findById(userId);
          const avatarLink = user ? user.avatarLink : null;

          return {
            userId,
            username,
            avatarLink,
          };
        })
      );

      // Filter out null values (clients without userId)
      const filteredOnlineUsers = onlineUsers.filter(Boolean);

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: filteredOnlineUsers,
          })
        );
      });

      // Log online users to the console
      console.log("Online Users:", filteredOnlineUsers);
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlinePeople();
        console.log("Connection terminated due to inactivity");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    // Extract JWT from cookies
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenCookie = cookies
        .split(";")
        .find((str) => str.trim().startsWith("authToken="));

      if (tokenCookie) {
        const token = tokenCookie.split("=")[1];

        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) {
            console.error("JWT verification error:", err);
            return;
          }

          // Store user info on the connection
          connection.userId = userData._id;
          connection.username = `${userData.firstName} ${userData.lastName}`;

          console.log(`Authenticated user connected: ${connection.username}`);

          // Notify about online people
          notifyAboutOnlinePeople();
        });
      }
    }

    // Message handler - CAREFULLY track message processing
    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message.toString());
        console.log("Received message from client:", messageData.tempId);

        const { recipient, text, sender, tempId } = messageData;

        if (!recipient || !text) {
          console.log("Invalid message format - missing recipient or text");
          return;
        }

        if (sender !== connection.userId) {
          console.log(
            "Message sender ID doesn't match connection ID - rejecting"
          );
          return;
        }

        // Save message to database
        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        console.log(`Message saved to database, id: ${msgDoc._id}`);

        // Create response object with database ID
        const outgoingMessage = {
          _id: msgDoc._id.toString(),
          sender: connection.userId,
          recipient,
          text,
          createdAt: msgDoc.createdAt,
          tempId, // Include the tempId so client can match to its sent message
        };

        // Find recipients and send
        let recipientFound = false;
        let senderFound = false;

        // Send to recipient
        wss.clients.forEach((client) => {
          if (client.userId === recipient) {
            console.log(`Sending message to recipient: ${recipient}`);
            client.send(JSON.stringify(outgoingMessage));
            recipientFound = true;
          }

          // Confirm to sender
          if (client.userId === connection.userId && client !== connection) {
            console.log(
              `Confirming message to sender's other connections: ${connection.userId}`
            );
            client.send(
              JSON.stringify({
                ...outgoingMessage,
                isOwnMessage: true,
              })
            );
            senderFound = true;
          }
        });

        if (!recipientFound) {
          console.log(
            `Recipient ${recipient} not online, message saved to database only`
          );
        }

        // Send confirmation to the original connection that sent the message
        // Only if we haven't already sent to other connections of the same user
        if (!senderFound) {
          console.log(
            `Confirming message to original sender: ${connection.userId}`
          );
          connection.send(
            JSON.stringify({
              ...outgoingMessage,
              isOwnMessage: true,
            })
          );
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    // Handle disconnection
    connection.on("close", () => {
      console.log(
        `WebSocket connection closed for: ${
          connection.username || "Unknown user"
        }`
      );
      notifyAboutOnlinePeople();
    });
  });
};

module.exports = createWebSocketServer;

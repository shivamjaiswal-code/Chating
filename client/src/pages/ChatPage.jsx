import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatPage() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Receive Message
  useEffect(() => {

    socket.on("receive_message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    return () => {
      socket.off("receive_message");
    };

  }, []);

  // Send Message
  const sendMessage = () => {

    if (message.trim() === "") return;

    const messageData = {
      username: "Shivam",
      room: "general",
      message: message,
    };

    // Frontend me turant dikhao
    setMessages((prev) => [...prev, messageData]);

    // Backend ko bhejo
    socket.emit("send_message", messageData);

    setMessage("");

  };

  return (

    <div className="bg-zinc-900 h-screen flex flex-col">

      {/* Header */}

      <div className="bg-zinc-800 p-4 text-white text-2xl font-bold">
        Secret Room Chat 🚀
      </div>

      {/* Messages */}

      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="bg-pink-500 text-white p-3 rounded-2xl w-fit max-w-[300px]"
          >
            {msg.message}
          </div>

        ))}

      </div>

      {/* Input */}

      <div className="bg-zinc-800 p-4 flex gap-3">

        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-zinc-700 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 px-6 rounded-lg text-white font-bold"
        >
          Send
        </button>

      </div>

    </div>

  );

}

export default ChatPage;
// components/Home/ChatBotBubble.jsx
import { motion } from "framer-motion";
import { FiMessageSquare, FiX } from "react-icons/fi";
import { useState } from "react";

const ChatBotBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const replies = [
        "Need a quote? I got you.",
        "Check out our Brand Identity section!",
        "Want to see posters? Just say so.",
        "I can ping a designer if you need help.",
        "Slide into our contact form for something custom."
      ];
      setMessages((prev) => [
        ...prev,
        {
          text: replies[Math.floor(Math.random() * replies.length)],
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open ? (
        <motion.div
          className="glass bg-[var(--current-bg)] w-80 rounded-2xl shadow-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Design Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <FiX />
            </button>
          </div>
          <div className="h-64 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-sm opacity-70 text-center mt-20">Hey there 👋 Need help?</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                      msg.sender === "user" ? "bg-primary text-white" : "bg-white/10 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="text-xs opacity-50 mt-1">{msg.time}</div>
                </div>
              ))
            )}
          </div>
          <div className="p-3 border-t border-white/10">
            <div className="flex">
              <input
                type="text"
                className="flex-1 px-3 py-2 rounded-l bg-white/10 text-sm text-white outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && send()}
              />
              <button
                onClick={send}
                className="px-4 py-2 bg-primary text-white rounded-r hover:opacity-90"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          className="bg-primary w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition"
          onClick={() => setOpen(true)}
        >
          <FiMessageSquare size={22} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatBotBubble;

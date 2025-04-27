import React, { useState } from "react";
import getOrganizationIcon from "./organizationIcons"; // Import dynamic icon function
import SendMessageIcon from "../../../assets/icons/sendMessage.svg";
import AttachmentIcon from "../../../assets/icons/attachment.svg";

const ChatBox = ({ organization }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I need to ask a question", sender: "user" },
    { id: 2, text: "Hey, how can I assist you?", sender: "organization" },
    { id: 3, text: "I have a request to ask several people", sender: "user" },
    {
      id: 4,
      text: "Yes sure, you can request anything you want",
      sender: "organization",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  const orgIcon = getOrganizationIcon(organization.organization_key); // Get the correct icon

  return (
    <div className="w-full mx-auto rounded-lg  bg-white flex flex-col h-[600px]">
      {/* Title Section */}
      <div className="flex items-center px-4 py-4 rounded-lg mb-2 shadow-md bg-gray-100">
        <img
          src={orgIcon || "/placeholder.png"} // Use the correct organization icon
          alt={organization?.name || "Organization"}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="font-bold text-black text-xl">
            {organization?.name || "Lebanese Red Cross (LRC)"}
          </h2>
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-500 text-lg mr-1">●</span>
            Online
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto px-6 py-4 rounded-t-lg rounded-b-none shadow-md bg-gray-100 mb-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <p
              className={`max-w-sm p-4 text-md rounded-lg shadow ${
                message.sender === "user"
                  ? "bg-white text-black"
                  : "bg-[#BF0000] text-white "
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center bg-white px-6 py-3 rounded-b-2xl rounded-t-none shadow-md w-full">
        {/* Input Field */}
        <div className="flex items-center flex-1 bg-gray-100 px-4 py-3 rounded-full shadow-md relative">
          {/* Attachment Icon Inside Input */}
          <img
            src={AttachmentIcon}
            alt="Attachment"
            className="w-6 h-6 text-gray-400 absolute left-4"
          />

          <input
            type="text"
            className="flex-1 px-14 py-3 bg-transparent border-none text-md outline-none placeholder-gray-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          {/* Send Button inside Input Field */}
          <button
            onClick={handleSendMessage}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#BF0000] shadow-md hover:bg-[#A00000] absolute right-4"
          >
            <img
              src={SendMessageIcon}
              alt="Send"
              className="w-7 h-7 text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

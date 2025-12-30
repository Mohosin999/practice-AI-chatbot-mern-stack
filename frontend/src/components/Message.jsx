import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import Prism from "prismjs";
import TypingIndicator from "./ui/typing-indicator";

const Message = ({ msg }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [msg.content]);

  if (msg.isTyping) {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 dark:bg-[#2c2c2c] p-3 rounded-lg rounded-bl-none">
          <TypingIndicator />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg lg:max-w-[90%] ${
          msg.role === "user"
            ? "bg-gray-300 dark:bg-[#303030] text-gray-900 dark:text-gray-200 rounded-br-none px-3"
            : "p-3"
        }`}
      >
        <div className="text-base reset-tw">
          {msg.isTemp ? (
            <span className="italic text-gray-400 animate-pulse">
              {msg.content}
            </span>
          ) : (
            <Markdown>{msg.content}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.shape({
    role: PropTypes.oneOf(["user", "assistant"]).isRequired,
    content: PropTypes.string.isRequired,
    isImage: PropTypes.bool,
    isTemp: PropTypes.bool,
  }).isRequired,
};

export default Message;

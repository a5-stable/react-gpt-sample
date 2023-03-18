import MessageArea from "./MessageArea";
import React, { useState } from "react";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeStyle = {
    backgroundColor: "#1E2022",
    color: "white",
  };

  const lightModeStyle = {
    backgroundColor: "white",
    color: "black",
  };

  return (
    <div style={isDarkMode ? darkModeStyle : lightModeStyle} className="chat">
      <div className="chat-message-area">
        <MessageArea isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </div>
    </div>
  );
};

export default Chat;

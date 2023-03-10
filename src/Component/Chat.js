import MessageArea from "./MessageArea";
import React, { useState } from "react";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeStyle = {
    backgroundColor: "black",
    color: "white",
  }

  const lightModeStyle = {
    backgroundColor: "white",
    color: "black",
  }

  const bgStyle = isDarkMode ? darkModeStyle : lightModeStyle;

  return (
    <div
      style= {{ height: '100%', ...bgStyle}}
      className="chat">
      <div className="chat-message-area">
        <MessageArea 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      </div>
    </div>
  );
};

export default Chat;

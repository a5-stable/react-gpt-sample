import MessageArea from "./MessageArea";
import React, { useState } from "react";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const darkModeStyle = {
    backgroundColor: "#1E2022",
    color: "#FFF9EE",
  };

  const lightModeStyle = {
    backgroundColor: "#FFF9EE",
    color: "black",
  };

  return (
    <div style={isDarkMode ? darkModeStyle : lightModeStyle} className="chat">
      <MessageArea isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

export default Chat;

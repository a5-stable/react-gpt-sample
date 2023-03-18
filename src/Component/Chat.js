import MessageArea from "./MessageArea";
import React, { useState } from "react";

const Chat = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [systemValue, setSystemValue] = useState(
    "サポートアシスタントのように振る舞ってください。基本的に日本語で返答してください。"
  );

  const darkModeStyle = {
    backgroundColor: "#1E2022",
    color: "#FFF9EE",
  };

  const lightModeStyle = {
    backgroundColor: "#FFF9EE",
    color: "black",
  };

  return (
    <div
      style={Object.assign({}, isDarkMode ? darkModeStyle : lightModeStyle, {
        overflow: "scroll",
      })}
      className="chat"
    >
      <MessageArea
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        systemValue={systemValue}
      />
    </div>
  );
};

export default Chat;

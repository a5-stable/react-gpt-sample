import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Message from "./Message";
import SendText from "./SendText";

const MessageArea = (props) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "サポートアシスタントのように振る舞ってください。基本的に日本語で返答してください。",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const sendMessages = () => {
    if (inputValue !== "") {
      var tmpMessages = messages.slice();
      tmpMessages.push({ role: "user", content: inputValue });
      setMessages(tmpMessages);
      setInputValue("");
      (async () => {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: tmpMessages,
        });
        setMessages([...tmpMessages, completion.data.choices[0].message]);
      })();
    }
  };

  const clearMessages = () => {
    setInputValue("");
  };

  const resetMessages = () => {
    var defaultMessage = [
      {
        role: "system",
        content:
          "サポートアシスタントのように振る舞ってください。基本的に日本語で返答してください。",
      },
    ];
    setMessages(defaultMessage);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const switchMode = () => {
    const isDark = props.isDarkMode;
    props.setIsDarkMode(!isDark);
  };

  return (
    <div className="MessageArea">
      <label>
        <input
          type="checkbox"
          checked={props.isDarkMode}
          onChange={switchMode}
        />
        {"ダークモードON"}
      </label>
      <SendText
        messages={messages}
        inputValue={inputValue}
        onClickSend={() => {
          sendMessages();
        }}
        onClickClear={() => clearMessages()}
        onClickReset={() => resetMessages()}
        onChange={(e) => handleChange(e)}
      />
      <Message messages={messages} />
    </div>
  );
};

export default MessageArea;

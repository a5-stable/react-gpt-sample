import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { Configuration, OpenAIApi } from "openai";
import "./index.css";

const Message = (props) => {
  var messageText = [];

  props.messages
    .slice()
    .reverse()
    .forEach((message) => {
      if (message.role !== "system") {
        messageText.push(<li>{message.role + ": " + message.content}</li>);
      }
    });

  return <ul>{messageText}</ul>;
};

const SendText = (props) => {
  return (
    <div>
      <input
        type="text"
        value={props.inputValue}
        onChange={(e) => props.onChange(e)}
        size="50"
      ></input>
      <button className="send-btn" onClick={() => props.onClickSend()}>
        送信
      </button>
      <button className="reset-btn" onClick={() => props.onClickReset()}>
        リセット
      </button>
    </div>
  );
};

const MessageArea = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessages = () => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    if (inputValue !== "") {
      var tmpMessages = messages.slice();
      tmpMessages.push({ role: "user", content: inputValue });
      setMessages(tmpMessages);
      (async () => {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: tmpMessages,
        });
        setMessages([...tmpMessages, completion.data.choices[0].message]);
        setInputValue("");
      })();
    }
  };

  const resetMessages = () => {
    var defaultMessage = [
      { role: "system", content: "You are a helpful assistant." },
    ];
    setMessages(defaultMessage);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <SendText
        messages={messages}
        inputValue={inputValue}
        onClickSend={() => {
          sendMessages();
        }}
        onClickReset={() => resetMessages()}
        onChange={(e) => handleChange(e)}
      />
      <Message messages={messages} />
    </div>
  );
};

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-message-area">
        <MessageArea />
      </div>
    </div>
  );
};

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Chat />);

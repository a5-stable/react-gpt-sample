import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Message from "./Message";
import SendText from "./SendText";

const MessageArea = (props) => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const sendMessages = () => {
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

  const switchMode = () => {
    const isDark = props.isDarkMode;
    props.setIsDarkMode(!isDark);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={props.isDarkMode}
          onChange={switchMode}
        />
        {props.isDarkMode ? "ライトモードに切り替える" : "ダークモードに切り替える"}
      </label>
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

export default MessageArea;

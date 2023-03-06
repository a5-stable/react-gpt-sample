import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Message from "./Message";
import SendText from "./SendText";

const MessageArea = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
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

export default MessageArea;

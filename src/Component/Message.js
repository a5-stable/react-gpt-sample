import React from "react";
import ReactMarkdown from 'react-markdown';

const Message = (props) => {

  const messageList = [];
  props.messages
    .slice()
    .reverse()
    .forEach((message) => {
    if (message.role !== "system" && message.content) {
        const messageText = (
        <ReactMarkdown children={message.content} />
      );
      messageList.push(
        <li key={message.id}>{message.role}: {messageText}</li>
      );
    }
  });

  return <ul>{messageList}</ul>;
};

export default Message;

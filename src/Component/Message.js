import React from "react";
import ReactMarkdown from "react-markdown";

const Message = (props) => {
  const messageList = [];
  props.messages
    .slice()
    .reverse()
    .forEach((message) => {
      if (message.role !== "system" && message.content) {
        const messageText = <ReactMarkdown className="line-break">{message.content}</ReactMarkdown>;
        messageList.push(
          <li key={message.id}>
            {message.role}{messageText}
          </li>
        );
      }
    });

  return <div className="Message"><ul>{messageList}</ul></div>;
};

export default Message;

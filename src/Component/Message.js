import React from "react";
import ReactMarkdown from 'react-markdown';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';


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
        <li key={message.id} style={{display:"flex"}}>
          {
            message.role == "user" ? (
              <>
                    <CircularProgress />

                <Avatar sx={{ bgcolor: deepOrange[500] }}>{message.role}</Avatar>
                {messageText}
              </>
            ) : (
              <>
                {messageText}
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{message.role}</Avatar>
              </>
            )
          }
        </li>
      );
    }
  });

  return <ul>{messageList}</ul>;
};

export default Message;

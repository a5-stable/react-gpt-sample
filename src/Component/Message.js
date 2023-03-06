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

export default Message;

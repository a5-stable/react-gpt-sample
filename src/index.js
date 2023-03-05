import React from "react";
import ReactDOM from "react-dom/client";
import { Configuration, OpenAIApi } from "openai";
import "./index.css";

class Message extends React.Component {
  render() {
    var messageText = [];

    this.props.messages.slice().reverse().forEach((message) => {
      if (message.role !== "system") {
        messageText.push(<li>{message.role + ": " + message.content}</li>);
      }
    });

    return (
      <ul>
        {messageText}
      </ul>
    );
  }
}

class SendText extends React.Component {
  render() {
    return (
    <div>
      <input type="text" value={this.props.inputValue} onChange={(e) => this.props.onChange(e)} size="50"></input>
      <button className="send-btn" 
        onClick={() => this.props.onClickSend()}>送信</button>
      <button className="reset-btn" 
        onClick={() => this.props.onClickReset()}>リセット</button>
    </div>
    );
  }
}

class MessageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{"role": "system","content": "You are a helpful assistant."}],
      inputValue: "",
    }
  }

  setMessages() {
    var messages = this.state.messages.slice();
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    if (this.state.inputValue !== "") {
      messages.push({"role": "user", "content": this.state.inputValue});
      this.setState({messages: messages});
      (async () => {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: messages,
        });
        messages.push(completion.data.choices[0].message);
        this.setState({messages: messages, inputValue: ""});
      })();
    }
  }

  resetMessages() {
    var messages = [{"role": "system","content": "You are a helpful assistant."}];
    this.setState({messages: messages});
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return (
      <div>
        <SendText 
          messages={this.state.messages}
          inputValue={this.state.inputValue}
          onClickSend={() => {
              this.setMessages();
          }}
          onClickReset={() => this.resetMessages()}  
          onChange={(e) => this.handleChange(e)}
        />
        <Message messages={this.state.messages}/>
      </div>
    );
  }
}

class Chat extends React.Component {
  render() {
    return (
      <div className="chat">
        <div className="chat-message-area">
          <MessageArea />
        </div>
        <div className="chat-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Chat />);

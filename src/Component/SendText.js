import React, { useState } from "react";

const SendText = (props) => {
  const [textareaHeight, setTextareaHeight] = useState("30px");

  // テキストエリア変化
  const handleTextareaChange = (event) => {
    props.setInputValue(event.target.value);
    // textarea の行数を計算しサイズを自動調整
    event.target.style.height = "30px";
    setTextareaHeight(`${event.target.scrollHeight}px`);
  };

  // ボタンクリック時テキストエリアのサイズ初期化
  const handleButtonClick = () => {
    setTextareaHeight("30px");
  };

  return (
    <div className="SendText">
      <div className="msgText">※会話の履歴は10往復まで保存されます。</div>
      <textarea
        type="text"
        value={props.inputValue}
        onChange={(e) => {
          handleTextareaChange(e);
        }}
        style={{ height: textareaHeight }}
        className="txtarea-send"
        disabled={props.isCommunicating}
      ></textarea>
      <div>
        <button
          className="send-btn"
          onClick={() => {
            props.onClickSend();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          送信
        </button>
        <button
          className="clr-btn"
          onClick={() => {
            props.onClickClear();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          テキストクリア
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            props.onClickReset();
            handleButtonClick();
          }}
          disabled={props.isCommunicating}
        >
          会話リセット
        </button>
      </div>
      <div
        className="msgText"
        style={{ color: props.isCommunicating ? "#50D060" : "red" }}
      >
        {props.msgValue !== "" ? props.msgValue : "　"}
      </div>
    </div>
  );
};

export default SendText;

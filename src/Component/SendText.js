import React, { useState } from "react";

const SendText = (props) => {
  const [textareaHeight, setTextareaHeight] = useState("30px");

  // テキストエリアのサイズ調整
  const handleTextareaChange = (event) => {
    // textarea の行数を計算する
    event.target.style.height = "30px";
    setTextareaHeight(`${event.target.scrollHeight}px`);
  };

  // ボタンクリック時テキストエリアのサイズ初期化
  const handleButtonClick = () => {
    setTextareaHeight("30px");
  };

  return (
    <div className="SendText">
      <textarea
        type="text"
        value={props.inputValue}
        onChange={(e) => {
          props.onChange(e);
          handleTextareaChange(e);
        }}
        size="500"
        row="100"
        style={{ width: "500px", height: textareaHeight }}
      ></textarea>
      <div>
        <button
          className="send-btn"
          onClick={() => {
            props.onClickSend();
            handleButtonClick();
          }}
        >
          送信
        </button>
        <button
          className="clr-btn"
          onClick={() => {
            props.onClickClear();
            handleButtonClick();
          }}
        >
          テキストクリア
        </button>
        <button
          className="reset-btn"
          onClick={() => {
            props.onClickReset();
            handleButtonClick();
          }}
        >
          会話リセット
        </button>
      </div>
    </div>
  );
};

export default SendText;

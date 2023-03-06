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

export default SendText;

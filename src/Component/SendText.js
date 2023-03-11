const SendText = (props) => {
  return (
    <div>
      <textarea
        type="text"
        value={props.inputValue}
        onChange={(e) => props.onChange(e)}
        size="500"
        row="5"
        style={{ width: "500px", height: "100px" }}
      ></textarea>
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

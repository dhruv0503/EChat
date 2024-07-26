/* eslint-disable react/prop-types */
import "./Message.css";

function Message({ user, msg, side }) {
  return <div className={`messageBox ${side}`}>{`${user} : ${msg}`}</div>;
}

export default Message;

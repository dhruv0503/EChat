import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";
import send from "../../assets/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../assets/closeIcon.png";

const endpoint = "https://echat-1.onrender.com/";

function Chat() {
  const location = useLocation();
  const socketRef = useRef();

  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const sendText = () => {
    socketRef.current.emit("message", { text, id });
    setText("");
  };
  useEffect(() => {
    socketRef.current = io(endpoint, { transports: ["websocket"] });
    socketRef.current.on("connect", () => {
      setId(socketRef.current.id);
      socketRef.current.emit("joined", { name: location.state });
    });

    socketRef.current.on("welcome", (data) =>
      setMessages((prevMessages) => [...prevMessages, data])
    );
    socketRef.current.on("userJoined", (data) =>
      setMessages((prevMessages) => [...prevMessages, data])
    );
    socketRef.current.on("userLeft", (data) =>
      setMessages((prevMessages) => [...prevMessages, data])
    );

    socketRef.current.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off();
    };
  }, [location.state]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>ECHAT</h2>
          <a href="/">
            <img src={closeIcon} alt="closeIcon" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, idx) => {
            if (item.id === id)
              return (
                <Message key={idx} msg={item.msg} side={"right"} user={"You"} />
              );
            else {
              const options = item.id === "Admin";
              return (
                <Message
                  key={idx}
                  msg={item.msg}
                  side={options ? "center" : "left"}
                  user={options ? "Admin" : item.user}
                />
              );
            }
          })}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            id="chatInput"
            value={text}
            onKeyDown={(evt) => (evt.key === "Enter" ? sendText() : null)}
            onChange={(evt) => setText(evt.target.value)}
          />
          <button onClick={sendText} className="sendBtn">
            <img src={send} alt="sendLogo" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

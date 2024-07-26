import { useState } from "react";
import "./Join.css";
import logo from "../../assets/logo1-trans.png";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");

  const submitName = (evt) => {
    evt.preventDefault();
    if (name === "Admin") {
      setWarning("Admin is a reserved name, Please choose another");
    } else if (name) navigate("/chat", { state: name });
  };

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="" />
        <h1>EChat</h1>
        {warning && <div className={`warning-popup`}> {warning} </div>}
        <input
          type="text"
          name="name"
          id="joinInput"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setWarning("");
          }}
        />
        <button className="joinBtn" onClick={submitName}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Join;

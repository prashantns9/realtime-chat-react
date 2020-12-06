import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import io from "socket.io-client";

import "./Chat.css";

const SERVER_URI = "http://localhost:5000";
let socket;

function Chat() {
  const [messagesEnd, setMessagesEnd] = useState(null);
  const { userName, roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket = io(SERVER_URI);
    socket.emit("join", { userName, roomName }, (joined) => {
      if (!joined) {
        history.push("/");
      }
    });
    return () => {
      socket.disconnect();
      //socket.off();
    };
  }, [userName, roomName]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Received message" + JSON.stringify(message));
      console.log("Previos msgs " + JSON.stringify(messages));
      setMessages([...messages, message]);
    });
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    return () => {
      //setMessages([]);
    };
  }, [messages]);

  useEffect(() => {
    socket.on("error", (error) => {
      alert(error.message);
    });
  });

  function renderMessages() {
    let messageBoxes = [];
    for (let i = 0; i < messages.length; i++) {
      messageBoxes.push(
        <div className={`chat-bubble-container`} key={i}>
          <label
            className={`label ${
              messages[i].from === userName ? "text-right" : "text-left"
            }`}
          >
            {messages[i].from}
          </label>
          <div
            className={`chat-bubble ${
              messages[i].from === userName ? "sent" : "received"
            } `}
            key={i}
          >
            {messages[i].text}
          </div>
        </div>
      );
    }
    return <div> {messageBoxes} </div>;
  }

  function sendMessage() {
    console.log("sending");
    setMessages([...messages, { from: userName, text: userInput }]);
    socket.emit("sendMessage", {
      message: { from: userName, text: userInput },
      roomName,
    });
    setUserInput("");
  }

  function leaveRoom() {
    history.push("/");
  }

  return (
    <div id="chat">
      <div className="row header">
        <div className="col-10">
          <h4 id="room-name">{roomName}</h4>
        </div>
        <div className="col-2">
          <div
            id="leave-actn"
            className="action text-right"
            onClick={() => leaveRoom()}
          >
            leave
          </div>
        </div>
      </div>
      <div className="chat-box">
        {renderMessages()}
        <div
          ref={(el) => {
            setMessagesEnd(el);
          }}
        ></div>
      </div>
      <div className="user-input-container">
        <div className="row">
          <div className="col-10">
            <input
              id="user-input"
              name="user-input"
              value={userInput}
              placeholder="Enter your message"
              onChange={(e) => setUserInput(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="col-2 text-right">
            <button
              disabled={!userInput}
              className={userInput ? "primary" : "gray"}
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER_URI = 'http://localhost:5000';
let socket;

function Chat() {
  const { userName, roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const history = useHistory();

  useEffect(() => {
    socket = io(SERVER_URI);
    socket.emit('join', { userName, roomName }, (joined) => {
      if (!joined) {
        history.push("/");
      }
    });
    return () => {
      socket.disconnect();
      //socket.off();
    }
  }, [userName, roomName]);

  useEffect(() => {
    socket.on('message', message => {
      console.log("Received message" + JSON.stringify(message));
      console.log("Previos msgs " + JSON.stringify(messages));
      setMessages([...messages, message]);
    });
    return () => {
      //setMessages([]);
    }
  }, [messages]);

  useEffect(() => {
    socket.on('error', error => {
      alert(error.message);
    });
  });

  function renderMessages() {
    let messageBoxes = [];
    for (let i = 0; i < messages.length; i++) {
      messageBoxes.push(<li key={i}> {messages[i].from} - {messages[i].text} </li>)
    }
    return <ul> {messageBoxes} </ul>;
  }

  function sendMessage() {
    console.log("sending");
    setMessages([...messages, { from: userName, text: userInput }]);
    socket.emit('sendMessage', { message: { from: userName, text: userInput }, roomName });
    setUserInput('');
  }

  function leaveRoom() {
    history.push("/");
  }

  return (
    <div>
      <h1> {roomName}</h1>
      <button onClick={() => leaveRoom()}> Leave </button>
      {renderMessages()}
      <input value={userInput} placeholder="enter your message" onChange={(e) => setUserInput(e.target.value)} />

      <button onClick={() => sendMessage()}> Send</button>
    </div>
  );
}

export default Chat;

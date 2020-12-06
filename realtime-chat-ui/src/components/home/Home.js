import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
function Home() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  return (
    <div id="home">
      <h2 id="app-name"> Chat </h2>
      <input name="name" value={name} type="text" placeholder="Ënter your name" onChange={(e) => setName(e.target.value)} /> <br />
      <input name="roomName" value={roomName} type="text" placeholder="Ënter room name" onChange={(e) => setRoomName(e.target.value)} /> <br />
      <Link to={`/chat/${roomName}/${name}`}>
        <button className="primary" disabled={!roomName || !name}> Enter Rooom </button>
      </Link>
    </div>
  );
}

export default Home;

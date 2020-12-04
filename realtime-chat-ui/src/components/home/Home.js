import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  return (
    <div>
      <input value={name} type="text" placeholder="Ënter your name" onChange={(e) => setName(e.target.value)} /> <br />
      <input value={roomName} type="text" placeholder="Ënter room name" onChange={(e) => setRoomName(e.target.value)} /> <br />
      <Link to={`/chat/${roomName}/${name}`}>
        <button> Enter Rooom </button>
      </Link>
    </div>
  );
}

export default Home;

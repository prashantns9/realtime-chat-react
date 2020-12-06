import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
function Home() {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  return (
    <div id="home">
      <form>
        <h2 id="app-name" className="primary"> Realtime Chat</h2>
        <div className="row">
          <div className="col-3 offset"> </div>
          <div className="col-6 name-input-group" >
            <label htmlFor="name">Your Name</label>
            <input id="roomName" required name="name" value={name} type="text" placeholder="Ënter your name" onChange={(e) => setName(e.target.value)} /> <br />
          </div>
        </div>
        <div className="row">
          <div className="col-3 offset"> </div>
          <div className="col-6 room-name-input-group" >
            <label htmlFor="roomName">Room Name</label>
            <input id="roomName" required name="roomName" value={roomName} type="text" placeholder="Ënter room name" onChange={(e) => setRoomName(e.target.value)} /> <br />
          </div>
        </div>
        <div className="row">
          <div className="col-3 offset"> </div>
          <div className="col-6 text-center" >
            <Link to={`/chat/${roomName}/${name}`}>
              <button type="submit" className="primary" disabled={!roomName || !name}> Enter Rooom </button>
            </Link>
          </div>
        </div>
      </form>
      <footer><div className="footer-para"> Made with &#128151; by <a href="https://www.prashantshinde.in" target="_new"> Prashant </a> </div> </footer>
    </div>
  );
}

export default Home;

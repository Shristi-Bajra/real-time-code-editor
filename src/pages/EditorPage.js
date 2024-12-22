import React, { useState, useRef, useEffect } from "react";
import Client from "../components/client";
import Editor from "../components/editor";
import { useLocation } from "react-router-dom";
import { initSocket } from "../socket";
import ACTIONS from "../Actions.js";

const EditorPage = ({ roomId }) => {
  const socketRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
    init();
  }, []);
  const [clients, setClients] = useState([
    { socketId: 1, username: "Rakesh k" },
    { socketId: 2, username: "John Doe" },
    { socketId: 3, username: "bread Doe" },
  ]);
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logoImage">
            <img className="logo" src="/code-sync.png" alt="logo" />
            <h3 className="headerName">Cooders</h3>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;

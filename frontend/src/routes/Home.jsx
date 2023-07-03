import React, { useEffect, useState } from "react";
import AllChats from "../components/Home/AllChats";
import ChatBox from "../components/Home/ChatBox";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

const Home = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const socket = io(ENDPOINT);

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("chat-app-login-user-data")
    );

    socket.on("connect", () => {
      console.log("WebSocket client connected");
    });

    socket.emit("setup", userData);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  return (
    <div className="flex flex-wrap justify-between h-screen max-h-full">
      <div className="w-full h-full lg:w-1/4 bg-primary-400 hidden lg:block">
        {/* Content for the first item */}
        <AllChats/>
      </div>
      <div className="w-full h-full lg:w-3/4 bg-primary-400 p-4">
        {/* Content for the second item */}
        <ChatBox socket={socket} />
      </div>

    </div>
  );
};

export default Home;

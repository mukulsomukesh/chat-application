import React from "react";
import AllChats from "../components/Home/AllChats";
import ChatBox from "../components/Home/ChatBox";

const Home = () => {
  return (
    <div className="flex flex-wrap justify-between h-screen max-h-full">
      <div className="w-full h-full lg:w-1/4 bg-gray-200 p-4">
        {/* Content for the first item */}
        <AllChats />

      </div>
      <div className="w-full h-full lg:w-3/4 bg-gray-300 p-4">
        {/* Content for the second item */}
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;

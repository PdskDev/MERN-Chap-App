import React from "react";
import logo from "../assets/logoChat-clean1.png";

const AppLayout = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 h-20 shadow-md bg-white">
        <img
          src={logo}
          alt="Chat App Logo"
          width={100}
          height={20}
          className="p-2"
        />
      </header>
      {children}
    </>
  );
};

export default AppLayout;

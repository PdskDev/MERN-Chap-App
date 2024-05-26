import React from "react";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      HomePage
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default HomePage;

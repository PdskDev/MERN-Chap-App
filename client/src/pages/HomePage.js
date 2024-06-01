import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const getUserDetailsInfo = async () => {
    try {
      const url_api_user_info = `${process.env.REACT_APP_BACKEND_URL}/api/user-info`;
      const response = await axios({
        url: url_api_user_info,
        method: "get",
        withCredentials: true,
      });
      console.log("current user", response.data?.data);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserDetailsInfo();
  }, []);

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

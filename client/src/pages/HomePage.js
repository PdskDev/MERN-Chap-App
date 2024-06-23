import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/userSlicer";
import Slidebar from "../components/Slidebar";
import logo from "../assets/logoChat-clean1.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserDetailsInfo = async () => {
    try {
      const url_api_user_info = `${process.env.REACT_APP_BACKEND_URL}/api/user-info`;
      const response = await axios({
        url: url_api_user_info,
        method: "get",
        withCredentials: true,
      });

      dispatch(setUser(response.data?.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }

      console.log("current user details: ", response);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserDetailsInfo();
  }, [getUserDetailsInfo]);

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Slidebar />
      </section>
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>
      <div className="lg:flex justify-center items-center flex-col gap-2 hidden">
        <div>
          <img src={logo} width={200} alt="logo" />
          <p className="text-lg mt-2 text-slate-500">
            Select a friend to chat with
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

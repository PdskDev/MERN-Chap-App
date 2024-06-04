import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/userSlicer";
import Slidebar from "../components/Slidebar";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("redux user", user);

  const getUserDetailsInfo = async () => {
    try {
      const url_api_user_info = `${process.env.REACT_APP_BACKEND_URL}/api/user-info`;
      const response = await axios({
        url: url_api_user_info,
        method: "get",
        withCredentials: true,
      });
      console.log("current user", response.data?.data);

      dispatch(setUser(response.data?.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUserDetailsInfo();
  }, []);

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-slate-50">
        <Slidebar />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UserAvatar from "../components/UserAvatar";

const CheckPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [location?.state?.name, navigate]);

  const [data, setData] = useState({
    password: "",
  });

  const handleOnChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    setData((previousState) => {
      return {
        ...previousState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url_api_register = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        url: url_api_register,
        method: "post",
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      if (response.data.success) {
        setData({
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
          <UserAvatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="mt-2 font-semibold text-lg">
            {location?.state?.name}
          </h2>
        </div>

        <form className="grid gap-3 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Password :</label>
            <input
              className="bg-slate-100 px-2 py-1 border border-gray-200 focus:border-cyan-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide">
            Login
          </button>
        </form>
        <p className="mt-3 text-sm text-center">
          <Link
            to={"/forgot-password"}
            className="hover:text-secondary font-semibold"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;

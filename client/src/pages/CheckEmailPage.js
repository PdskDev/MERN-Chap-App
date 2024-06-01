import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CheckEmailPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
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

    const url_api_register = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(url_api_register, data);
      toast.success(response?.data?.message);
      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto">
        <h3 className="text-center font-bold text-primary text-xl mt-2">
          Welcome to Chat App !
        </h3>
        <form className="grid gap-3 mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              className="bg-slate-100 px-2 py-1 border border-gray-200 focus:border-cyan-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide">
            Let's Go!
          </button>
        </form>
        <p className="mt-3 text-sm text-center">
          Already have account?{" "}
          <Link to={"/email"} className="hover:text-secondary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;

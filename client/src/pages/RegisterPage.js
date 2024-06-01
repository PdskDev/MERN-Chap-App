import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadedPhoto, setUploadedPhoto] = useState("");

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

  const handleUplodPhoto = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    setUploadedPhoto(file);
    const uploadPhotoToCloud = await uploadFile(file);
    setData((previousState) => {
      return {
        ...previousState,
        profile_pic: uploadPhotoToCloud?.url,
      };
    });
  };

  const handleClearUploadedPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadedPhoto(null);
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
            <label htmlFor="name">Name :</label>
            <input
              className="bg-slate-100 px-2 py-1 border border-gray-200 focus:border-cyan-500"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadedPhoto?.name
                    ? uploadedPhoto?.name
                    : "Upload your profile photo"}
                </p>
                {uploadedPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadedPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              type="file"
              id="profile_pic"
              name="profile_pic"
              onChange={handleUplodPhoto}
            />
          </div>
          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-4 font-bold text-white leading-relaxed tracking-wide">
            Register
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

export default RegisterPage;

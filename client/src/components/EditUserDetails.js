import React, { useEffect, useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlicer";

const EditUserDetails = ({ onClose, userInfo }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: userInfo?.name,
    profile_pic: userInfo?.profile_pic,
  });

  useEffect(() => {
    setData((prevState) => {
      return {
        ...prevState,
        ...userInfo,
      };
    });
  }, [userInfo]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhotoToCloud = await uploadFile(file);
    setData((previousState) => {
      return {
        ...previousState,
        profile_pic: uploadPhotoToCloud?.url,
      };
    });
  };

  const uploadedPhotoRef = useRef();

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadedPhotoRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const url_api_update_user_info = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

    try {
      const response = await axios({
        method: "put",
        url: url_api_update_user_info,
        data: data,
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data?.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary border"
            />
          </div>
          <div className="sr-only">Photo:</div>
          <div>
            <div className="my-1 flex items-center gap-3">
              <UserAvatar
                width={70}
                height={70}
                name={data?.name}
                imageUrl={data?.profile_pic}
              />

              <label htmlFor="profile_pic">
                <button
                  className="font-semibold"
                  onClick={handleOpenUploadPhoto}
                >
                  Change Photo
                </button>
                <input
                  ref={uploadedPhotoRef}
                  type="file"
                  id="profile_pic"
                  className="hidden"
                  onChange={handleUploadPhoto}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className="flex gap-2 w-fit ml-auto">
            <button
              onClick={onClose}
              className="border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);

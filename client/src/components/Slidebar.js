import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";

const Slidebar = () => {
  const user = useSelector((state) => state?.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchUsers, setOpenSearchUsers] = useState(false);
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({
              isActive,
            }) => `w-12 h-12 flex justify-center items-center cursor-pointer
           hover:bg-slate-200 rounded ${isActive} && "bg-slate-200"`}
            title="Chats"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="Add Friend"
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEditUserOpen(true)}
          >
            <UserAvatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
            />
            <div></div>
          </button>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
            title="Logout"
          >
            <span className="-ml-2">
              <BiLogOutCircle size={20} />
            </span>
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-600">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUsers.length === 0 && (
            <div className="mt-10">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={40} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore friends to start chat with
              </p>
            </div>
          )}
        </div>
      </div>
      {/** edit user details */}
      {editUserOpen && (
        <EditUserDetails
          onClose={() => setEditUserOpen(false)}
          userInfo={user}
        />
      )}
      {/** search user */}
    </div>
  );
};

export default Slidebar;

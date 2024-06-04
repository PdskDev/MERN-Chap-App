import React from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";

const Slidebar = () => {
  const user = useSelector((state) => state?.user);
  return (
    <div className="w-full h-full">
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
          <button className="mx-auto" title={user?.name}>
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
    </div>
  );
};

export default Slidebar;

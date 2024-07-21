import React from "react";
import UserAvatar from "./UserAvatar";

const UserSearchCard = ({ user }) => {
  return (
    <div
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent
     border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
    >
      <div>
        <UserAvatar
          width={50}
          height={50}
          name={user?.name}
          imageUrl={user?.profile_pic}
        />
      </div>
      <div className="font-semibold">{user?.name}</div>
      <p className="text-sm">{user?.email}</p>
    </div>
  );
};

export default UserSearchCard;

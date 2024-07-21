import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";
import UserSearchCard from "./UserSearchCard";
import toast from "react-hot-toast";
import axios from "axios";

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchUser = async () => {
    const url_api_search_users = `${process.env.REACT_APP_BACKEND_URL}/api/search-users`;
    try {
      setLoading(true);
      const response = await axios.post(url_api_search_users, {
        search: search,
      });

      setLoading(false);

      setSearchUser(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  console.log("searchUser", searchUser);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-slate-500 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10 m-1">
        {/** input search user */}
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            placeholder="Search a friend by name, email..."
            className="w-full outline-none py-1 h-full px-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>
        {/**display search user */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/** no user found */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found</p>
          )}
          {loading && (
            <p>
              <LoadingSpinner />
            </p>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return <UserSearchCard key={user._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;

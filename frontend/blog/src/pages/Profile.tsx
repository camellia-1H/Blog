import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState, useTypedDispatch } from "../redux/store";

import { userLogout } from "../redux/userReducer";

import PostSearch from "../components/Search/PostSearch";

const Profile: FC = () => {
  const token = useSelector((state: RootState) => state.user.accessToken);

  const dispatch = useTypedDispatch();
  const handleLogout = async () => {
    await dispatch(userLogout(token));
  };
  return (
    <div className="flex justify-between">
      <div className="lg:w-4/12 md:w-4/12 sm:w-5/12">
        <img
          src="https://avatars.githubusercontent.com/u/88993589?v=4"
          alt=""
          width={226}
          height={226}
          className="rounded-full shadow-md shadow-gray-700/50"
        />

        <div>
          <h1 className="font-semibold text-xl">User name</h1>
          <button className="w-full mt-2 ring-2 bg-blue-300 font-medium ring-blue-900/10 px-4 py-2 rounded-lg hover:bg-blue-900/5">
            Edit profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full mt-2 ring-2 bg-blue-300 font-medium ring-blue-900/10 px-4 py-2 rounded-lg hover:bg-blue-900/5"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="lg:w-7/12 md:w-7/12 sm:w-7/12">
        <PostSearch />
        <PostSearch />
        <PostSearch />
        <PostSearch />
      </div>
    </div>
  );
};

export default Profile;

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";

import PostSearch from "../components/Search/PostSearch";
import { useGetPostByUserIdQuery } from "../redux/postApi";
import { useGetProfileUserQuery } from "../redux/userApi";
import { convertId } from "../utils/convertString";
import { useLogoutMutation } from "../redux/authApi";

const Profile: FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const params = useParams();
  const { userid } = params;
  const idQuery = convertId(userid as string);

  const navigate = useNavigate();

  const [logOutUser, { isLoading, isError, error, isSuccess }] =
    useLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
    if (isError) {
      console.log((error as any).data);
    }
  }, [isLoading]);

  const handleLogout = () => {
    logOutUser(user.accessToken);
  };

  const { data: posts } = useGetPostByUserIdQuery(idQuery);
  const { data: dataUser } = useGetProfileUserQuery(idQuery);

  const isAuthor = user.id == idQuery;
  return (
    <div className="flex justify-between">
      <div className="lg:w-4/12 md:w-4/12 sm:w-5/12">
        <img
          src={dataUser?.avatar}
          alt=""
          width={226}
          height={226}
          className="rounded-full shadow-md shadow-gray-700/50"
        />

        {isAuthor ? (
          <div>
            <h1 className="font-semibold text-xl">{dataUser?.name}</h1>
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
        ) : (
          <h1 className="font-semibold text-xl text-center mt-3">
            {dataUser?.name}
          </h1>
        )}
      </div>
      <div className="lg:w-7/12 md:w-7/12 sm:w-8/12 pl-2">
        {posts?.map((post, index) => {
          return <PostSearch post={post} key={index} isAuthor={isAuthor} />;
        })}
      </div>
    </div>
  );
};

export default Profile;

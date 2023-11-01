import { Link } from "react-router-dom";
import { config } from "../config";
import { Post } from "../models/Post";
import { useGetProfileUserQuery } from "../redux/userApi";

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  const authorId = post.authorId as string;
  const { data: userData } = useGetProfileUserQuery(authorId);
  return (
    // postLink
    <Link to={config.routes.postLink(authorId, post.id)}>
      <article className="flex-col lg:mb-10 md:mb-16 sm:mb-16 sm:w-12/12">
        <div className="rounded-3xl overflow-hidden">
          <img src={post.thumbnail} className="block w-full max-h-72" alt="" />
        </div>
        <div className="flex-col py-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500">
                {/* {post.updateAt.getDay().toString()} */}
                {post.id}
              </span>
            </div>
            <div>
              <button className="text-sm text-black font-medium bg-gray-300/10 hover:bg-gray-400/10 p-1 rounded-lg">
                Category
              </button>
            </div>
          </div>
          <h2 className="text-lg font-semibold">{post.title}</h2>

          <div className="max-h-max flex-col flex-1">
            <p className="truncate text-base font-light">{post.content}</p>
          </div>
          <div className="flex flex-1 items-center mt-6">
            <div className="mr-3">
              <img
                src={userData?.avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex-col">
              <h2 className=" font-semibold">{userData?.name}</h2>
              <p className="text-sm opacity-70">Director</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
export default PostItem;

import { Link } from "react-router-dom";
import { config } from "../../config";
import { Post } from "../../models/Post";

type Props = {
  post: Post;
  isAuthor: boolean;
};

const PostSearch = ({ post, isAuthor }: Props) => {
  return (
    <div className="py-5 border-t-2 lg:h-auto md:h-auto">
      <Link to={config.routes.postLink(post.authorId as string, post.id)}>
        <div className="flex items-start">
          <div className="w-3/12">
            <img src={post.thumbnail} alt="" className="w-full h-14 shrink-0" />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="lg:text-2xl md:sm:text-xl">{post.title}</h3>
          </div>
          {isAuthor ? (
            <div className="justify-items-end">
              <button className="hover:underline mr-3">edit</button>
              <button className="hover:underline">delete</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PostSearch;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import Wrapper from "./Core/Wrapper";
import PostItem from "./PostItem";
import { useGetAllPostQuery } from "../redux/postApi";

const PostList: React.FC = () => {
  const userid = "6513eb8ba64cabe396d7f0d4";
  const { data } = useGetAllPostQuery(userid);
  console.log(data);

  return (
    <Wrapper>
      <div className="flex-col">
        <div className="flex-col text-center mb-16">
          <h2 className="text-4xl font-bold">From the blog</h2>
          <p className="text-xl text-gray-700/40 my-5">
            Learn how to grow your best business with our expert advice
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-5">
          {data?.map((post, index) => (
            <PostItem post={post} key={index} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <button className="text-sm text-white font-medium bg-blue-500 hover:bg-blue-500/90 p-2 rounded-lg">
          More Post
          <FontAwesomeIcon
            icon={faArrowDown}
            fade
            className="text-white ml-2"
          />
        </button>
      </div>
    </Wrapper>
  );
};

export default PostList;

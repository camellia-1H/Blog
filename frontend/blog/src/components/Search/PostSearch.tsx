import { Link } from "react-router-dom";
import { config } from "../../config";

const PostSearch: React.FC = () => {
  return (
    <div className="py-5 border-t-2">
      <Link to={config.routes.post}>
        <div className="flex items-start">
          <div className="w-2/12">
            <img
              src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
              alt=""
              className="w-full h-full shrink-0"
            />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="lg:text-2xl md:sm:text-xl">Post Title</h3>
            <h2>Tom Cook</h2>
          </div>
          <div className="justify-items-end">
            <button className="hover:underline mr-3">edit</button>
            <button className="hover:underline">delete</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostSearch;

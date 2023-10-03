import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faSpinner,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "../config";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <header className="fixed lg:px-60 md:px-20 sm:px-20 py-4 top-0 right-0 left-0 bg-white border-b-2 border-blue-400/10">
      <nav className="flex justify-between items-center">
        <Link to={"/"} className="text-3xl align-text-top">
          Logo
        </Link>
        <div className="pt-1 w-80">
          <form action="" className="relative flex items-center">
            <input
              className="w-full outline-none outline-gray-950/10 rounded-md p-1 focus:outline-blue-300"
              type="text"
              name=""
              id=""
              placeholder="..."
            />
            <button className="absolute right-2">
              <FontAwesomeIcon icon={faXmark} color="red" />
            </button>
            <button className="absolute right-2">
              <FontAwesomeIcon icon={faSpinner} spin color="blue" />
            </button>
          </form>
        </div>
        {user.id ? (
          <div className="flex items-center">
            <Link
              to={config.routes.upload}
              className="flex-1 bg-transparent font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/5"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2" />
              Upload
            </Link>
            <Link to={config.routes.profile} className="ml-3">
              <img
                src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/305773309_1517947871982881_6840332658496567178_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=fe8171&_nc_ohc=RroxTTsRaYkAX9va3Y6&_nc_ht=scontent.fhan2-4.fna&_nc_e2o=f&oh=00_AfDyoo2gR6q1v_J_PKmTeQRaKSJv9_WtwAREjfQ3Uvhsvw&oe=65148B91"
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={config.routes.login}
              className="flex-1 bg-transparent font-medium rounded-md px-3 py-2 ring-1 ring-gray-900/5"
            >
              Login
            </Link>

            <Link
              to={config.routes.register}
              className="ml-4 flex-1 bg-blue-500 hover:bg-blue-500/90 font-medium text-white rounded-md px-3 py-2"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
export default Header;

import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { config } from "../config";

import Wrapper from "../components/Core/Wrapper";

const PostDetail: FC = () => {
  const [isAuthor, setIsAuthor] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-10/12 lg:pr-3 md:w-full sm:w-full">
          <div className="mb-5">
            <Link to={"/"} className="text-sm hover:underline">
              <FontAwesomeIcon icon={faAngleLeft} />
              <span className="ml-2 text-blue-500">Home</span> /{" "}
              <span>Post Title</span>
            </Link>
            <div className="flex items-center justify-between pt-3">
              <h1 className="text-3xl font-bold">Post Title</h1>
              <button className="text-sm text-black font-medium bg-gray-300/10 hover:bg-gray-400/10 p-1 rounded-lg">
                Category
              </button>
            </div>
            <div>
              <Link to={config.routes.profile}>
                <div className="flex flex-1 items-center mt-6">
                  <div className="mr-3 overflow-hidden">
                    <img
                      src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/305773309_1517947871982881_6840332658496567178_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=fe8171&_nc_ohc=RroxTTsRaYkAX9va3Y6&_nc_ht=scontent.fhan2-4.fna&_nc_e2o=f&oh=00_AfDyoo2gR6q1v_J_PKmTeQRaKSJv9_WtwAREjfQ3Uvhsvw&oe=65148B91"
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="font-semibold">Tom Cook</h2>
                  <span className="ml-1">on</span>
                  <span className="ml-1">Time</span>
                </div>
              </Link>
            </div>
          </div>
          <Wrapper>
            <div>
              <img
                src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                alt=""
              />
            </div>
            <div className="max-h-max flex-col flex-1">
              <p className="text-base font-light text-justify">
                Cupiditate maiores ullam eveniet adipisci in doloribus nulla
                minus. Voluptas iusto libero adipisci rem et corporis. Nostrud
                sint anim sunt aliqua. Nulla eu labore irure incididunt velit
                cillum quis magna dolore. Cupiditate maiores ullam eveniet
                adipisci in doloribus nulla minus. Voluptas iusto libero
                adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla
                eu labore irure incididunt velit cillum quis magna dolore.
                Cupiditate maiores ullam eveniet adipisci in doloribus nulla
                minus. Voluptas iusto libero adipisci rem et corporis. Nostrud
                sint anim sunt aliqua. Nulla eu labore irure incididunt velit
                cillum quis magna dolore. Cupiditate maiores ullam eveniet
                adipisci in doloribus nulla minus. Voluptas iusto libero
                adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla
                eu labore irure incididunt velit cillum quis magna dolore.
                Cupiditate maiores ullam eveniet adipisci in doloribus nulla
                minus. Voluptas iusto libero adipisci rem et corporis. Nostrud
                sint anim sunt aliqua. Nulla eu labore irure incididunt velit
                cillum quis magna dolore. Cupiditate maiores ullam eveniet
                adipisci in doloribus nulla minus. Voluptas iusto libero
                adipisci rem et corporis. Nostrud sint anim sunt aliqua. Nulla
                eu labore irure incididunt velit cillum quis magna dolore.
                Cupiditate maiores ullam eveniet adipisci in doloribus nulla
                minus. Voluptas iusto libero adipisci rem et corporis. Nostrud
                sint anim sunt aliqua. Nulla eu labore irure incididunt velit
                cillum quis magna dolore.
              </p>
            </div>
          </Wrapper>
        </div>
        <div className="lg:w-2/12 lg:pl-3 md:w-full sm:w-full border-l-2 h-fit">
          {isAuthor ? (
            <div>
              <button className="hover:underline mr-3">edit</button>
              <button className="hover:underline">delete</button>
              <p className="opacity-50">
                nếu là user chính đăng nhập thì có thể sửa, xóa
              </p>
            </div>
          ) : (
            <div>Table of contents</div>
          )}
        </div>
      </div>
      <div>
        <h2 className="pb-5 font-bold">More Posts</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 gap-5 ">
          {/* <Post />
          <Post />
          <Post />
          <Post /> */}
        </div>
      </div>
    </>
  );
};

export default PostDetail;

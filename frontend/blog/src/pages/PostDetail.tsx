import { FC, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";

import { config } from "../config";
import Wrapper from "../components/Core/Wrapper";
import { useDeletePostMutation, useGetPostByIdQuery } from "../redux/postApi";
import { useGetProfileUserQuery } from "../redux/userApi";
import { RootState } from "../redux/store";
import { convertId, convertPublicId } from "../utils/convertString";
import ModalEditPost from "../components/ModalEditPost";
import { Post } from "../models/Post";
import { convertTime } from "../utils/convertTime";
import { deleteImageFromCloudinary } from "../service/cloudinary/serviceCloudinary";

const PostDetail: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  // params.x , x phải đúng trong config router : userid, postid
  const { postid } = params;

  const userid = convertId(params.userid as string);
  const { data: postData } = useGetPostByIdQuery(postid as string);
  const { data: authorData } = useGetProfileUserQuery(userid);

  const date = convertTime(postData as Post);

  const [deletePostMutation, { isLoading, isError, error, isSuccess }] =
    useDeletePostMutation();

  const isAuthor = user.id == userid;
  /// modal edit post nếu đó là auth user

  const [modalIsOpen, setOpenModal] = useState<boolean>(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleShowModal = () => setOpenModal(true);

  useEffect(() => {
    if (isSuccess) {
      alert("Delete post successfully");
      navigate("/");
    }
    if (isError) {
      alert(`Delete post unsuccessfull. Error : ${(error as any).data}`);
    }
  }, [isLoading]);

  const handleDeletePost = () => {
    deleteImageFromCloudinary(convertPublicId(postData?.thumbnail as string));
    deletePostMutation({ userid, postid });
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="lg:w-10/12 lg:pr-3 md:w-full sm:w-full">
          <div className="mb-5">
            <Link to={"/"} className="text-sm hover:underline">
              <FontAwesomeIcon icon={faAngleLeft} />
              <span className="ml-2 text-blue-500">Home</span> /{" "}
              <span>{postData?.title}</span>
            </Link>
            <div className="flex items-center justify-between pt-3">
              <h1 className="text-3xl font-bold">{postData?.content}</h1>
              <button className="text-sm text-black font-medium bg-gray-300/10 hover:bg-gray-400/10 p-1 rounded-lg">
                Category
              </button>
            </div>
            <div>
              <Link
                to={config.routes.profileLink(
                  convertId(params.userid as string)
                )}
              >
                <div className="flex flex-1 items-center mt-6">
                  <div className="mr-3 overflow-hidden">
                    <img
                      src={authorData?.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <h2 className="font-semibold">{authorData?.name}</h2>
                  <span className="ml-1">
                    {postData?.createAt != postData?.updateAt
                      ? "create post at"
                      : "update post at"}
                  </span>
                  <span className="ml-1 font-semibold">{date}</span>
                </div>
              </Link>
            </div>
          </div>
          <Wrapper>
            <div className="h-[32rem]">
              <img
                src={postData?.thumbnail}
                className="block w-full h-full "
                alt=""
              />
            </div>
            <div className="max-h-max flex-col flex-1">
              <p className="text-base font-light text-justify">
                {postData?.content}
              </p>
            </div>
          </Wrapper>
        </div>
        <div className="lg:w-2/12 lg:pl-3 md:w-full sm:w-full border-l-2 h-fit">
          {isAuthor ? (
            <div>
              <button
                className="ml-4 flex-1 bg-blue-500 hover:bg-blue-500/90
              font-medium text-white rounded-md px-3 py-1 hover:underline mr-3"
                onClick={handleShowModal}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-transparent font-medium rounded-md px-3 py-1 ring-1 ring-gray-900/5 hover:bg-gray-400/10"
                onClick={handleDeletePost}
              >
                Delete
              </button>
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
      {postData && (
        <ModalEditPost
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
          post={postData}
        ></ModalEditPost>
      )}
    </>
  );
};

export default PostDetail;

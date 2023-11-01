import { FormEvent, useState } from "react";
import ReactModal from "react-modal";
import { Post } from "../models/Post";
import { useUpdatePostMutation } from "../redux/postApi";

const customStyles = {
  pointerEvents: "none",
  overlay: { zIndex: 100 },
  content: {
    inset: "50% auto auto 50%",
    minWidth: "700px",
    // innerHeight: "550",
    maxHeight: "min((100vh - 96px) - 40px, 600px)",
    // maxHeight: "630px",
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // marginRight: "-50%",
    transition: "all 1s",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    overFlowY: "hidden",
    // overFlow: "auto",
  },
};
type Props = {
  modalIsOpen: boolean;
  handleCloseModal: any;
  post: Post | any;
};

ReactModal.setAppElement("div");

const ModalEditPost = ({ modalIsOpen, handleCloseModal, post }: Props) => {
  console.log(post);

  const [title, setTitle] = useState<string>(post?.title);
  const [content, setContent] = useState<string>(post?.content);
  const [published, setPublished] = useState<boolean>(post?.published);
  // const [image, setImage] = useState<string>(post?.thumbnail);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [updatePostMutation] = useUpdatePostMutation();

  const setFileTobase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
  };
  const onFileChange = (e: any) => {
    const currentFile = e.target.files[0];
    setFileTobase(currentFile);
    console.log(currentFile);
  };

  const handleEditPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePostMutation({
        userid: post?.authorId,
        postid: post?.id,
        title,
        content,
        published,
        previewImage,
      });
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReactModal isOpen={modalIsOpen} style={customStyles}>
      <div className="">
        <div className="relative">
          <h2 className="text-3xl font-bold">Edit Profile</h2>
          <button
            className="absolute -right-2 -top-4 text-red-500"
            onClick={handleCloseModal}
          >
            esc
          </button>
        </div>
        <form
          className="mx-auto mt-12 max-w-xl sm:mt-8"
          onSubmit={handleEditPost}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-col">
              <div className="block text-md font-semibold leading-6 text-gray-900">
                Thumbnail
              </div>
              <div className="px-2 flex items-center ">
                <img
                  src={post?.thumbnail}
                  className="block w-full max-h-52"
                ></img>
                <label
                  htmlFor="file-upload2"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 hover:underline mx-2"
                >
                  <span>Change</span>
                  <input
                    type="file"
                    id="file-upload2"
                    name="file-upload2"
                    accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                    className="sr-only"
                    width={20}
                    height={20}
                    onChange={onFileChange}
                  />
                </label>

                {previewImage && (
                  <img
                    src={previewImage}
                    width={304}
                    className="block w-full max-h-52"
                  ></img>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="content"
                className="block text-md font-semibold leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2.5">
                <textarea
                  name="content"
                  id="content"
                  value={content}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center">
            <label
              htmlFor="check"
              className="block font-semibold leading-6 text-gray-900 text-md mr-3"
            >
              Published
            </label>
            <input
              type="checkbox"
              name=""
              id="check"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Postttt
            </button>
          </div>
        </form>
      </div>
    </ReactModal>
  );
};

export default ModalEditPost;

import { FC, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCreatePostMutation } from "../redux/postApi";
import { useNavigate } from "react-router-dom";

const Upload: FC = () => {
  const authEmail = useSelector((state: RootState) => state.user.user.email);

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");

  const [uploadPostMutation, {}] = useCreatePostMutation();

  const setFileTobase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };
  const onFileChange = (e: any) => {
    const currentFile = e.target.files[0];
    setFileTobase(currentFile);
    console.log(currentFile);
  };

  const handlePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await uploadPostMutation({
        title,
        content,
        authEmail,
        published,
        image,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="isolate bg-white px-6 py-16 sm:py-16 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Upload Post
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          One post hay cho moi nguoi
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handlePost}>
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
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold leading-6 text-gray-900 text-2xl">
              Chỗ này để xử lý úp ảnh thumbnail
            </label>
            {!image && (
              <div className="col-span-full">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".jpg,.jpeg,.png,.tiff,.heic,.webp"
                          className="sr-only"
                          onChange={onFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {image && (
              <div className="w-96 h-full">
                <div className="flex items-center">
                  <div className="justify-items-end">
                    <p className="font-medium text-md py-3">Preview image</p>
                    <div className="flex items-center ">
                      <img src={image} width={304} height={200}></img>
                      <label
                        htmlFor="file-upload2"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 hover:underline ml-4"
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
                    </div>
                  </div>
                </div>
              </div>
            )}
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
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Posttttt
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;

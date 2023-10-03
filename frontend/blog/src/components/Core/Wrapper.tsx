import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Wrapper: React.FC<Props> = (props) => {
  return (
    <div className="w-full rounded-lg shadow shadow-blue-700/60 hover:shadow-indigo-500/40">
      <div className="px-10 py-32 pt-20 my-10 overflow-x-hidden overflow-y-auto ">
        {props.children}
      </div>
    </div>
  );
};
export default Wrapper;

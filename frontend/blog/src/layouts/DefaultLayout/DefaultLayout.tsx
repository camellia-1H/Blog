import { FC, ReactNode } from "react";
import Header from "../../components/Header";

type Props = {
  children: ReactNode;
};

const DefaultLayout: FC<Props> = (props) => {
  return (
    <div className="w-full lg:px-60 md:px-20 sm:px-20 relative">
      <Header />
      <main className="mt-32">{props.children}</main>
    </div>
  );
};

export default DefaultLayout;

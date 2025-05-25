import { ReactNode } from "react";
import classnames from "classnames";

import "./style.less";

import Footer from "../Footer";

type PageProps = {
  children: ReactNode;
  className?: string;
};

function Page({ children, className }: PageProps) {
  return (
    <div className="Page">
      <div className={classnames("PageContent", className)}>{children}</div>

      <Footer />
    </div>
  );
}

export default Page;

import { ReactNode } from "react";

import "./style.less";

type HeadingProps = {
  one?: boolean;
  two?: boolean;
  three?: boolean;
  four?: boolean;
  five?: boolean;
  children: ReactNode;
};

function Heading({ one, two, three, four, five, children }: HeadingProps) {
  const conds = { h1: one, h2: two, h3: three, h4: four, h5: five },
    Tag = Object.keys(conds)[Object.values(conds).findIndex((e) => e)];

  return <Tag className="Heading">{children}</Tag>;
}

export default Heading;

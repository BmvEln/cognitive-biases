import { CSSProperties } from "react";
import classNames from "classnames";

import "./style.less";

const SIZES = {
    sm: 10,
    md: 17,
    big: 20,
  },
  DEFAULT_COLOR = "#75A5FF";

type ProgressProps = {
  className?: string;
  style?: CSSProperties;
  value: number;
  width?: number;
  size?: keyof typeof SIZES;
  color?: string;
};

export default function Progress({
  className,
  style = {},
  value,
  width,
  size = "md",
  color,
}: ProgressProps) {
  return (
    <div
      className={classNames("Progress", className)}
      style={{
        ...({ "--value": value * 100 + "%" } as CSSProperties),
        ...({ "--progressColor": color || DEFAULT_COLOR } as CSSProperties),
        width: `${width}px`,
        height: SIZES[size as keyof typeof SIZES],
        ...style,
      }}
    />
  );
}

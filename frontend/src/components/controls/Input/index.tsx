import React, { useRef } from "react";
import classNames from "classnames";

import "./style.less";

const SEARCH_IMG = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10.5"
      cy="10.5"
      r="6.5"
      stroke="#4e769eff"
      stroke-linejoin="round"
    ></circle>
    <path
      d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
      fill="#4e769eff"
    ></path>
  </svg>
);

type Props = {
  value: string;
  onChange: (e: string) => void;
  placeholder?: string;
  type?: string;
  width?: number;
  style?: object;
  className?: string;
};

function Input({
  placeholder,
  type,
  value,
  onChange,
  width,
  style,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={classNames("Input", className)}>
      {SEARCH_IMG}

      <input
        style={{
          width,
          ...style,
        }}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        disabled={false}
      />
    </div>
  );
}

export default Input;

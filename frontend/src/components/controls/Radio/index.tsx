import classnames from "classnames";

import "./style.less";

type Radio = {
  text: string;
  disabled: boolean;
  selected: boolean;
  onClick: () => void;
};
type RadioGroup = { texts: string[] };

export function Radio({ text, disabled, selected, onClick }: Radio) {
  return (
    <div
      className={classnames("Radio", { selected })}
      style={{ cursor: disabled ? "default" : "pointer" }}
      onClick={disabled ? {} : onClick}
    >
      <div className="RadioCicle">
        <div style={{ opacity: selected ? 1 : 0 }} />
      </div>
      <div className="RadioText">{text}</div>
    </div>
  );
}

export function RadioGroup({ texts }: RadioGroup) {
  return (
    <div className="RadioGroup">
      {texts.map((text: string, i: number) => (
        <Radio text={text} key={i} />
      ))}
    </div>
  );
}

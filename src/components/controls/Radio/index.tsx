import classnames from "classnames";

import "./style.less";

type Radio = {
  text: string;
  disabled: boolean;
  selected: boolean;
  onClick: () => void;
};

export function Radio({ text, disabled, selected, onClick }: Radio) {
  return (
    <div
      className={classnames("Radio", { selected })}
      style={{ cursor: disabled ? "default" : "pointer" }}
      onClick={disabled ? undefined : onClick}
    >
      <div className="RadioCicle">
        <div style={{ opacity: selected ? 1 : 0 }} />
      </div>
      <div className="RadioText">{text}</div>
    </div>
  );
}

// TODO: Пока не используется
// type RadioGroup = { texts: string[] };
// export function RadioGroup({ texts }: RadioGroup) {
//   return (
//     <div className="RadioGroup">
//       {texts.map((text: string, i: number) => (
//         <Radio text={text} key={i} disabled={} />
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import classnames from "classnames";

import "./style.less";

import { useAppSelector } from "../../../redux/store.tsx";

function AchieveNotice() {
  const [visible, setVisible] = useState(false);
  const [curNotice, setCurNotice] = useState(null);
  const { achievementsNotices } = useAppSelector(
    (state) => state.achievementsNotices,
  );

  useEffect(() => {
    if (achievementsNotices.length > 0 && !curNotice) {
      setCurNotice(achievementsNotices[0]);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);

        setTimeout(() => setCurNotice(null), 500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievementsNotices, curNotice]);

  console.log("AchieveNotice", achievementsNotices, curNotice);

  return (
    <div
      className={classnames("AchieveNotice", { show: visible, hide: !visible })}
    >
      <div>{curNotice?.name}</div>
    </div>
  );
}

export default AchieveNotice;

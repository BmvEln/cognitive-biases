import { useMemo } from "react";

import "./style.less";

import { ACHIEVEMENTS } from "../../static/achievements.ts";
import { ls } from "../../functions/functions.tsx";
import { IMG } from "../../static/img.ts";

import Page from "../../components/layout/Page";
import Heading from "../../components/blocks/Heading";
import Progress from "../../components/controls/Progress";

function AchievementsItems({ isAchieved }: { isAchieved?: boolean }) {
  const userData = {
      choicesCompleted: ls.get("choicesCompleted"),
    },
    hasLeastOneItem = Object.values(ACHIEVEMENTS).some((c) =>
      c.condition(userData),
    ),
    items = useMemo(
      () =>
        Object.values(ACHIEVEMENTS).map(
          ({ id, name, desc, progress, condition }) => {
            if (isAchieved && !condition(userData)) {
              return;
            }

            const progressItem = progress(userData),
              conditionItem = condition(userData);

            return (
              <div className="AchievementsItem" key={id}>
                <div>
                  <img
                    src={IMG[conditionItem ? "cup" : "lock"]}
                    width={26}
                    height={26}
                    alt=""
                  />

                  <div>
                    <div>{name}</div>
                    <div>{desc}</div>
                  </div>
                </div>
                <Progress
                  color={conditionItem ? "#2ecc71" : "#3498db"}
                  size="sm"
                  value={progressItem / 100}
                />
                <div>{Math.round(progressItem || 0)}%</div>
              </div>
            );
          },
        ),
      [],
    );

  return isAchieved && !hasLeastOneItem ? (
    <div>Достижения пока не получены</div>
  ) : (
    <div className="AchievementsItems">{items}</div>
  );
}

function Achievements() {
  return (
    <Page className="Achievements">
      <Heading two>Полученные достижения:</Heading>

      <div style={{ marginBottom: "40px" }}>
        <AchievementsItems isAchieved />
      </div>

      <Heading two>Все достижения:</Heading>

      <AchievementsItems />
    </Page>
  );
}

export default Achievements;

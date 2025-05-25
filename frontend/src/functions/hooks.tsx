import { useEffect } from "react";
import { useAppDispatch } from "../redux/store.tsx";
import { ls } from "./functions.tsx";
import { addAchievement } from "../redux/slices/achievementsSlice.tsx";
import { ACHIEVEMENTS } from "../static/achievements.ts";
import { addAchievementNotice } from "../redux/slices/achievementsNoticesSlice.tsx";

/**
 * @param eventType
 * @param cb
 * @param deps
 * @param {EventTarget} target
 * @param {boolean} [passive=false]
 */
export function useEvent(
  eventType,
  cb,
  deps = [],
  target = document,
  passive = false,
) {
  useEffect(
    () => {
      if (!target) return;
      const listener = cb;
      target.addEventListener(eventType, listener, { passive });
      return () => target.removeEventListener(eventType, listener, { passive });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
}

export function useAchievements() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function checkNewAchievements() {
      const userData = {
        choicesCompleted: ls.get("choicesCompleted"),
      };

      const curAchievs = ls.get("achievements") || [];
      const unlockedAchievs = Object.values(ACHIEVEMENTS)
        .filter((a) => a.condition(userData))
        .map((a) => ({ id: a.id, name: a.name }));

      const newAchievs = unlockedAchievs.filter(
        (ua) => !curAchievs.some((ca) => ca.id === ua.id),
      );

      if (newAchievs.length > 0) {
        const updatedAchievs = [...curAchievs, ...newAchievs];
        ls.set("achievements", updatedAchievs);

        newAchievs.forEach((a) => {
          dispatch(addAchievement(a));
          dispatch(
            addAchievementNotice({
              id: `achievement-${a.id}-${Date.now()}`,
              name: a.name,
            }),
          );
        });
      }
    }

    checkNewAchievements();
  }, [dispatch]);
}

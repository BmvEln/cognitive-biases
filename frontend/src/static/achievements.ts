export const ACHIEVEMENTS = {
  beginner: {
    id: 1,
    name: "Новичок критического мышления",
    desc: "Пройти 1 когнитивное искажение",
    condition: (userData) => userData.choicesCompleted?.length === 1,
    progress: (userData) =>
      Math.min((userData.choicesCompleted?.length / 1) * 100, 100),
  },
  threeBias: {
    id: 2,
    name: "Разрушитель иллюзий",
    desc: "Пройти 3 когнитивных искажения",
    condition: (userData) => userData.choicesCompleted?.length === 3,
    progress: (userData) =>
      Math.min((userData.choicesCompleted?.length / 3) * 100, 100),
  },
  expert: {
    id: 3,
    name: "Мастер когнитивных искажений",
    desc: "Пройти все искажения",
    condition: (userData) =>
      userData.choicesCompleted?.length === Object.keys(ACHIEVEMENTS).length,
    progress: (userData) =>
      Math.min(
        (userData.choicesCompleted?.length / Object.keys(ACHIEVEMENTS).length) *
          100,
        100,
      ),
  },
};

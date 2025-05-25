import { createSlice } from "@reduxjs/toolkit";

type AchievementsNoticesState = {
  achievementsNotices: [];
};

const initialState: AchievementsNoticesState = {
  achievementsNotices: [],
};

export const achievementsNoticesSlice = createSlice({
  name: "achievementsNotices",
  initialState,
  reducers: {
    addAchievementNotice: (state, action) => {
      state.achievementsNotices.push(action.payload);
    },
    removeAchievementNotice: (state, action) => {
      state.achievementsNotices = state.achievementsNotices.filter(
        (an) => an.id !== action.payload.id,
      );
    },
  },
});

export const { addAchievementNotice, removeAchievementNotice } =
  achievementsNoticesSlice.actions;

export default achievementsNoticesSlice.reducer;

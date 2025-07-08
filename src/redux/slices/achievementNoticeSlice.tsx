import { createSlice } from "@reduxjs/toolkit";

type AchievementNoticeState = {
  showNotice: boolean;
};

const initialState: AchievementNoticeState = {
  showNotice: false,
};

export const achievementNoticeSlice = createSlice({
  name: "achievementNotice",
  initialState,
  reducers: {
    setAchievementNotice: (state, action) => {
      state.showNotice = action.payload;
    },
  },
});

export const { setAchievementNotice } = achievementNoticeSlice.actions;

export default achievementNoticeSlice.reducer;

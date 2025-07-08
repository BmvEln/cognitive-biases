import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Achievement = {
  id: number;
  name: string;
};

type AchievementsState = {
  achievements: Achievement[];
};

const initialState: AchievementsState = {
  achievements: [],
};

export const achievementsSlice = createSlice({
  name: "achievements",
  initialState,
  reducers: {
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      if (!state.achievements.some((a) => a.id === action.payload.id)) {
        state.achievements.push(action.payload);
      }
    },
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
    },
  },
});

export const { addAchievement, setAchievements } = achievementsSlice.actions;
export default achievementsSlice.reducer;

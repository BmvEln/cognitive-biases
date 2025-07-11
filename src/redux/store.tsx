import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice.tsx";
import userReducer from "./slices/userSlice.tsx";
import achievementsReducer from "./slices/achievementsSlice.tsx";
import achievementNoticeReducer from "./slices/achievementNoticeSlice.tsx";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    achievements: achievementsReducer,
    achievementNotice: achievementNoticeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

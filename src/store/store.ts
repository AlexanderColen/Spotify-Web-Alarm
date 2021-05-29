import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authorizationReducer from "../components/authorization/authorizationSlice";
import playerReducer from "../components/spotify/player/playerSlice";
import playlistReducer from "../components/spotify/playlist/playlistSlice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    player: playerReducer,
    playlist: playlistReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

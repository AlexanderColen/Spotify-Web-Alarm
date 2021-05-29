import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

interface PlayerState {
  isPlaying: boolean;
}

const initialState: PlayerState = {
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setIsPlaying } = playerSlice.actions;

export const selectIsPlaying = (state: RootState) => state.player.isPlaying;

export default playerSlice.reducer;

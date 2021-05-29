import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../store/store";
import { setLoggedIn } from "../../authorization/authorizationSlice";

interface PlaylistState {
  currentPlaylist: ISpotifyPlaylist | null;
  displayName: string;
  playlists: ISpotifyPlaylist[];
}

const initialState: PlaylistState = {
  currentPlaylist: null,
  displayName: "",
  playlists: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<ISpotifyPlaylist>) => {
      state.currentPlaylist = action.payload;
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<ISpotifyPlaylist[]>) => {
      state.playlists = action.payload;
    },
  },
});

export const { setCurrentPlaylist, setDisplayName, setPlaylists } =
  playlistSlice.actions;

export const selectCurrentPlaylist = (state: RootState) =>
  state.playlist.currentPlaylist;
export const selectDisplayName = (state: RootState) =>
  state.playlist.displayName;
export const selectPlaylists = (state: RootState) => state.playlist.playlists;

export const setUserProfileAsync =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          setDisplayName(data.display_name ? data.display_name : data.id)
        );
      })
      .catch((error) => {
        if (error instanceof XMLHttpRequest) {
          if (error.status === 401) {
            dispatch(setLoggedIn(false));
          }
        }
      });
  };

export const setPlaylistsAsync =
  (accessToken: string): AppThunk =>
  (dispatch) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPlaylists(data.items));
        if (data.items.length > 0) {
          dispatch(setCurrentPlaylist(data.items[0]));
        }
      })
      .catch((error) => {
        if (error instanceof XMLHttpRequest) {
          if (error.status === 401) {
            dispatch(setLoggedIn(false));
          }
        }
      });
  };

export default playlistSlice.reducer;

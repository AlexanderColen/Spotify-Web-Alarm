import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsPlaying, setIsPlaying } from "../player/playerSlice";
import {
  selectCurrentPlaylist,
  selectPlaylists,
  setCurrentPlaylist,
} from "./playlistSlice";
import pauseIcon from "../../../resources/pause.svg";
import playIcon from "../../../resources/play.svg";
import "./Playlist.scss";

export function Playlist() {
  const currentPlaylist: ISpotifyPlaylist | null = useSelector(
    selectCurrentPlaylist
  );
  const isPlaying: boolean = useSelector(selectIsPlaying);
  const playlists: ISpotifyPlaylist[] = useSelector(selectPlaylists);

  const dispatch = useDispatch();

  return (
    <div className="playlist-container">
      <div className="playlists">
        {playlists.length > 0 &&
          playlists.map((playlist: ISpotifyPlaylist, key: number) => (
            <div
              className={
                "playlist " +
                (currentPlaylist !== null &&
                  currentPlaylist.id === playlist.id &&
                  "selected")
              }
              key={key}
              onClick={() => swapPlaylist(playlist)}
            >
              {playlist.images.length > 0 ? (
                <div className="playlist-cover">
                  <img
                    className="cover"
                    src={playlist.images[0].url}
                    alt="playlist cover"
                  />
                  {currentPlaylist !== null &&
                    currentPlaylist.id === playlist.id && (
                      <img
                        className="icon"
                        src={!isPlaying ? playIcon : pauseIcon}
                        alt="play"
                      />
                    )}
                </div>
              ) : null}
              <span>{playlist.name}</span>
            </div>
          ))}
      </div>
    </div>
  );

  function swapPlaylist(newPlaylist: ISpotifyPlaylist): void {
    if (newPlaylist.id !== currentPlaylist?.id) {
      dispatch(setCurrentPlaylist(newPlaylist));
    } else if (isPlaying) {
      dispatch(setIsPlaying(false));
    }
  }
}

import React from "react";
import { useSelector } from "react-redux";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { selectAccessToken } from "../../authorization/authorizationSlice";
import { selectCurrentPlaylist } from "../playlist/playlistSlice";
import { selectIsPlaying } from "./playerSlice";

export function Player() {
  const accessToken: string = useSelector(selectAccessToken);
  const currentPlaylist: ISpotifyPlaylist | null = useSelector(
    selectCurrentPlaylist
  );
  const isPlaying: boolean = useSelector(selectIsPlaying);

  return (
    <div className="player-container">
      {currentPlaylist != null && (
        <SpotifyWebPlayer
          autoPlay={false}
          callback={(state) => console.log(state)}
          magnifySliderOnHover={true}
          name={"Spotify Alarm Webapp Player"}
          persistDeviceSelection={false}
          play={isPlaying}
          styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
          }}
          syncExternalDevice={false}
          token={accessToken}
          uris={currentPlaylist.uri}
        />
      )}
    </div>
  );
}

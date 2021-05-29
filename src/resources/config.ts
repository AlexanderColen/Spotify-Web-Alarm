const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "d7486a160a824f449e71d981366066d0";
const redirectUri = "http://localhost:3000/";
const scopes = [
  "playlist-read-private",
  "streaming",
  "user-read-email",
  "user-read-playback-state",
  "user-read-private",
];

export const getSpotifyAuthorizeHref = (): string => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&`;
};

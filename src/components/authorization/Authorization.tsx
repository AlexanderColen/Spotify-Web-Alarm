import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoggedIn,
  setAccessToken,
  setTokenExpiryDate,
  selectIsLoggedIn,
  selectTokenExpiryDate,
} from "./authorizationSlice";
import {
  selectDisplayName,
  setPlaylistsAsync,
  setUserProfileAsync,
} from "../spotify/playlist/playlistSlice";
import { getSpotifyAuthorizeHref } from "../../resources/config";
import { getHashParams, removeHashParamsFromUrl } from "../../utils/hashUtils";
import "./Authorization.scss";
import { Dispatch } from "redux";

const hashParams = getHashParams();
const access_token = hashParams.access_token;
const expires_in = hashParams.expires_in;
removeHashParamsFromUrl();
console.log(access_token);

export function Authorization() {
  const displayName: string = useSelector(selectDisplayName);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const tokenExpiryDate: string = useSelector(selectTokenExpiryDate);

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    if (access_token) {
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(access_token));
      dispatch(setTokenExpiryDate(Number(expires_in)));
      dispatch(setUserProfileAsync(access_token));
      dispatch(setPlaylistsAsync(access_token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="authorization">
      <div>
        {!isLoggedIn && (
          <button
            aria-label="Log in using OAuth 2.0"
            onClick={() => window.open(getSpotifyAuthorizeHref(), "_self")}
          >
            Log in with Spotify
          </button>
        )}
        {isLoggedIn && (
          <div>
            <p>
              {displayName
                ? "Logged in as: " + displayName
                : "Successfully logged in!"}
            </p>
            <p className="expirationTime">
              Token expiry date: {new Date(tokenExpiryDate).toTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { MutableRefObject, useRef } from "react";
import {
  authEndpoint,
  clientId,
  redirectUri,
  scopes,
} from "../../resources/config";
import Button from "../inputs/button/button";
import NumberInput from "../inputs/numberInput/numberInput";
import "./alarm.scss";

interface IAlarmProps {}

const Alarm: React.FC<IAlarmProps> = (props: IAlarmProps) => {
  const _isMounted: MutableRefObject<boolean> = useRef(false);
  const [alarmTime, setAlarmTime] = React.useState<number>(0);
  const [musicTimeout, setMusicTimeout] = React.useState<number>(0);
  const [spotifyValidated, setSpotifyValidated] =
    React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(Date.now());

  React.useEffect(() => {
    _isMounted.current = true;

    // TODO: Authorize Spotify
    // https://github.com/JoeKarlsson/react-spotify-player#react-spotify-player

    return function cleanup(): void {
      _isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    window.setTimeout(updateUTCTime, 1000);
  }, [time]);

  return (
    <div className="alarm">
      {!spotifyValidated ? (
        <a
          className="btn"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      ) : (
        <div className="timeInputContainer">
          <p className="pAlarm">
            What time would you like the alarm to go off? (UTC)
          </p>
          <div className="timeInputRow">
            <NumberInput name="hour" label="HH" />
            <NumberInput name="minutes" label="MM" />
          </div>
          <Button
            text="Start Alarm"
            styleClass="btnStart"
            action={startAlarm}
          />
        </div>
      )}
      {time ? (
        <div className="divTimeDisplay">
          <p>Current time is:</p>
          <p className="currTime">{new Date(time).toTimeString()}</p>
        </div>
      ) : null}
      <div className="divAlarmDisplay">
        {alarmTime === 0 || alarmTime > time ? (
          <div>
            <p className="pNoAlarm" hidden={alarmTime !== 0}>
              No alarm set.
            </p>
            <p className="pAlarmTime" hidden={alarmTime === 0}>
              Alarm set for: {new Date(alarmTime).toTimeString()}
            </p>
          </div>
        ) : (
          <h1>Wakey wakey!</h1>
        )}
      </div>
    </div>
  );

  /**
   * Update the time variable.
   */
  function updateUTCTime(timeout: number): void {
    if (_isMounted.current) {
      setTime(Date.now());
    }
  }

  /**
   * Start the alarm for music playback.
   */
  function startAlarm(): void {
    clearTimeout(musicTimeout);
    stopMusic();

    // Calculate when to set the timeout.
    const millisecondsTillAlarm: number = 5000;
    const calculatedAlarmTime: number = Date.now() + millisecondsTillAlarm;

    // Set the actual alarm.
    if (_isMounted.current) {
      setMusicTimeout(window.setTimeout(playMusic, millisecondsTillAlarm));
      setAlarmTime(calculatedAlarmTime);
    }
  }

  /**
   * Play the music.
   */
  function playMusic(): void {
    console.log("Starting music playback.");
  }

  /**
   * Stop the music.
   */
  function stopMusic(): void {
    console.log("Stopping music playback.");
  }
};

export default Alarm;

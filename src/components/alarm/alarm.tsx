import React, { MutableRefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../authorization/authorizationSlice";
import Button from "../inputs/button/Button";
import NumberInput from "../inputs/numberInput/NumberInput";
import { Player } from "../spotify/player/Player";
import { setIsPlaying } from "../spotify/player/playerSlice";
import { Playlist } from "../spotify/playlist/Playlist";
import "./Alarm.scss";

export function Alarm() {
  const _isMounted: MutableRefObject<boolean> = useRef(false);
  const [alarmTime, setAlarmTime] = React.useState<number>(0);
  const [musicTimeout, setMusicTimeout] = React.useState<number>(0);
  const [time, setTime] = React.useState<number>(Date.now());

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  React.useEffect(() => {
    _isMounted.current = true;

    return function cleanup(): void {
      _isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    window.setTimeout(updateUTCTime, 1000);
  }, [time]);

  return (
    <div className="alarm">
      {time && (
        <div className="divTimeDisplay">
          <p>Current time is:</p>
          <p className="currTime">{new Date(time).toTimeString()}</p>
        </div>
      )}
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
      {isLoggedIn && (
        <div>
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
          <Playlist />
          <Player />
        </div>
      )}
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
    dispatch(setIsPlaying(true));
  }

  /**
   * Stop the music.
   */
  function stopMusic(): void {
    dispatch(setIsPlaying(false));
  }
}

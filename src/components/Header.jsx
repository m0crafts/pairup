/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Header({
  level,
  streaks,
  onTimeup,
  timerRef,
  progress,
  onResetProgress,
  onRestart,
  onSkipLevel,
  gameStarted,
}) {
  const [timeLeft, setTimeLeft] = useState(level.duration);
  const maxProgress = (level.rows * level.cols) / 2;
  // Restart timer when level changes
  useEffect(() => {
    setTimeLeft(level.duration);
    if (!gameStarted) return;
    const startTimer = () => {
      // Clear any existing timer first
      clearInterval(timerRef.current);

      // Start a new timer
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timerRef.current);

          // Trigger time-up safely AFTER rendering
          setTimeout(() => onTimeup(), 0);

          return 0;
        });
      }, 1000);
    };
    startTimer();

    // Cleanup on unmount or level change
    return () => clearInterval(timerRef.current);
  }, [level, onTimeup, timerRef, gameStarted]);

  return (
    <header>
      <img src={logo} alt="Logo" />

      <div className="stats">
        <div className="stat">
          <p className="label">Level</p>
          <div className="content">{level.id}</div>
        </div>
        <div className="stat timer">
          <p className="label">Time</p>
          <div className="content">{timeLeft}</div>
        </div>
        <div className="stat">
          <p className="label">Streak</p>
          <div className="content">
            <p>
              <span>
                <i className="fas fa-star" style={{ color: "#F5A92F" }}></i>
              </span>
              {streaks}
            </p>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="controls">
          <button title="Restart" className="restart" onClick={onRestart}>
            <i className="fas fa-sync-alt fa-2x"></i>
          </button>
          <button title="Reset Level" className="reset" disabled={progress === 0} onClick={onResetProgress}>
            <i className="fas fa-undo fa-2x"></i>
          </button>
          <button title="Skip Level" className="reset" onClick={onSkipLevel}>
            <i className="fas fa-forward fa-2x"></i>
          </button>
        </div>
        <progress min={0} max={maxProgress} value={progress}></progress>
        <h3 style={{ textWrap: "nowrap" }}>
          {progress} / {maxProgress}
        </h3>
      </div>
    </header>
  );
}

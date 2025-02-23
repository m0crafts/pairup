/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";

export default function Header({ level, streaks }) {
  return (
    <header>
      <img src={logo} alt="Logo" />

      <div className="stats">
        <div className="stat">
          <p className="label">Level</p>
          <div className="content">{level.id}</div>
        </div>
        {/* <div className="stat">
            <p className="label">Progress</p>
            <div className="content">{progress}</div>
          </div> */}
        <div className="stat timer">
          <p className="label">Time</p>
          <div className="content">01:24</div>
        </div>
        <div className="stat">
          <p className="label">Streak</p>
          <div className="content">
            <p>
              <span>⭐</span> {streaks}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

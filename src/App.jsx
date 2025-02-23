import { useState, useCallback } from "react";
import { LEVELS } from "./constants";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [matchedShapes, setMatchedShapes] = useState(new Set());
  const [streaks, setStreaks] = useState(0);

  const level = LEVELS[levelIndex];
  const shapesPerLevel = (level.rows * level.cols) / 2;

  const handleNextLevel = useCallback(() => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex((prev) => prev + 1);
      setMatchedShapes(new Set());
    }
  }, [levelIndex]);

  const handleMatch = (id) => {
    setMatchedShapes((prev) => new Set(prev).add(id));
    setStreaks((prev) => prev + 1);

    if (matchedShapes.size + 1 === shapesPerLevel) {
      // Show Modal
      setTimeout(() => {
        handleNextLevel();
      }, 2000);
    }
  };

  const handleMismatch = () => {
    setStreaks(0);
  };

  return (
    <>
      <button
        onClick={handleNextLevel}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#ff4d4d", color: "#fff", borderRadius: "8px" }}
      >
        Next Level
      </button>
      <Header level={level} streaks={streaks} />
      <Gameboard
        level={level}
        matchedShapes={matchedShapes}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
    </>
  );
}

export default App;

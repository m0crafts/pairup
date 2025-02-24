import { useState, useCallback, useRef } from "react";
import { LEVELS } from "./constants";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";
import Modal from "./components/Modal";

function App() {
  const [level, setLevel] = useState(LEVELS[0]);
  const [matchedShapes, setMatchedShapes] = useState(new Set());
  const [streaks, setStreaks] = useState(0);
  const [modalStatus, setModalStatus] = useState("start");
  const [didStart, setDidStart] = useState(false);
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const shapesPerLevel = (level.rows * level.cols) / 2;

  const handleNextLevel = () => {
    if (level.id < LEVELS.length) {
      setMatchedShapes(new Set());
      setModalStatus("");

      setLevel({ ...LEVELS[level.id] });
    } else {
      clearInterval(timerRef.current);
      setModalStatus("finished");
      modalRef.current.open();
    }
  };

  const handleMatch = useCallback(
    (id) => {
      setMatchedShapes((prev) => new Set(prev).add(id));
      setStreaks((prev) => prev + 1);

      if (matchedShapes.size + 1 === shapesPerLevel) {
        clearInterval(timerRef.current);
        setModalStatus("success");
        modalRef.current.open(); // No auto-close or auto-next
      }
    },
    [matchedShapes.size, shapesPerLevel]
  );

  const handleMismatch = useCallback(() => {
    setStreaks(0);
  }, []);

  const handleTimeup = useCallback(() => {
    setModalStatus("failure");
    modalRef.current.open();
  }, []);

  const handleRestart = useCallback(() => {
    modalRef.current.close();
    clearInterval(timerRef.current);
    setMatchedShapes(new Set());
    setStreaks(0);
    setLevel({ ...LEVELS[0] });
    setModalStatus("");
  }, []);

  const handleReset = useCallback(() => {
    clearInterval(timerRef.current);
    setMatchedShapes(new Set());
    setStreaks(0);
    setLevel({ ...level });
    setModalStatus("");
  }, [level]);

  return (
    <>
      <Header
        level={level}
        streaks={streaks}
        onTimeup={handleTimeup}
        timerRef={timerRef}
        progress={matchedShapes.size}
        onResetProgress={handleReset}
        onRestart={handleRestart}
        onSkipLevel={handleNextLevel}
        gameStarted={didStart}
      />
      <Gameboard
        level={level}
        matchedShapes={matchedShapes}
        onMatch={handleMatch}
        onMismatch={handleMismatch}
      />
      <Modal
        modalRef={modalRef}
        status={modalStatus}
        onSuccess={handleNextLevel}
        onFinished={handleRestart}
        onFailure={handleRestart}
        onStart={() => setDidStart(true)}
      />
    </>
  );
}

export default App;

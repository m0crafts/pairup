import { useRef, useImperativeHandle, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ modalRef, status, onSuccess, onFailure, onFinished, onStart }) {
  const internalRef = useRef(null);

  useImperativeHandle(modalRef, () => ({
    open: () => internalRef.current.showModal(),
    close: () => internalRef.current.close(),
  }));

  const handlePrimaryAction = () => {
    internalRef.current.close();
    if (status === "success") {
      onSuccess();
    } else if (status === "failure") {
      onFailure();
    } else if (status === "finished") {
      onFinished();
    } else {
      onStart();
    }
  };

  const getMessage = () => {
    switch (status) {
      case "success":
        return {
          title: "Level Completed!",
          message: "Get ready for the next level!",
          button: "Next Level",
          styles: "success",
        };
      case "failure":
        return { title: "Time's Up!", message: "Try again!", button: "Retry", styles: "error" };
      case "finished":
        return {
          title: "Game Over!",
          message: "You finished the game. Restart?",
          button: "Restart",
          styles: "success",
        };
      default:
        return {
          title: "Welcome to Pair Up!",
          message: "Click below to start the game!",
          button: "Start",
          styles: "success",
        };
    }
  };

  const { title, message, button, styles } = getMessage();

  useEffect(() => {
    if (status) {
      modalRef.current.open();
    }
  }, [status, modalRef]);

  return createPortal(
    <dialog ref={internalRef}>
      <h2>{title}</h2>
      <p>{message}</p>
      <button className={styles} onClick={handlePrimaryAction}>
        {button}
      </button>
    </dialog>,
    document.getElementById("modal")
  );
}

import { useRef, useImperativeHandle, useEffect } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";

export default function Modal({ modalRef, status, onSuccess, onFailure, onFinished, onStart }) {
  const internalRef = useRef(null);
  const portfolioLink = "https://linkedin.com/in/mo-edris";

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
          message: "You finished the game! Developed by Mohamed Aly.",
          button: "Restart",
          styles: "success",
          showQR: true,
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

  const { title, message, button, styles, showQR } = getMessage();

  useEffect(() => {
    if (status) {
      document.body.style.overflow = "hidden";
      modalRef.current.open();
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [status, modalRef]);

  return createPortal(
    <dialog ref={internalRef}>
      <h2>{title}</h2>
      <p>{message}</p>
      {showQR && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <QRCode value={portfolioLink} size={128} />
          <p style={{ margin: "1rem 0" }}>
            Check out more cool stuff:
            <a
              href={portfolioLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", margin: "0.5rem 0" }}
            >
              {portfolioLink}
            </a>
          </p>
        </div>
      )}
      <button className={styles} onClick={handlePrimaryAction}>
        {button}
      </button>
    </dialog>,
    document.getElementById("modal")
  );
}

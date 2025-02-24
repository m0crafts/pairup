/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { mystery, SHAPES } from "../constants";
import { shuffle } from "../utils/utils";

export default function Gameboard({ level, matchedShapes, onMatch, onMismatch }) {
  const [gameboard, setGameboard] = useState([]);
  const [selectedPair, setSelectedPair] = useState([null, null]);

  useEffect(() => {
    const generateGameboard = () => {
      const { rows, cols } = level;
      const totalPairs = (rows * cols) / 2;
      const selectedShapes = shuffle([
        ...SHAPES.map((shape) => {
          return { ...shape, isMystery: true };
        }),
      ]).slice(0, totalPairs);
      return shuffle([...selectedShapes, ...selectedShapes]);
    };

    setGameboard(generateGameboard());
  }, [level]);

  const handleSelect = (id, index) => {
    if (matchedShapes.has(id) || selectedPair[0]?.index === index || selectedPair.every(Boolean)) return;

    setGameboard((prev) => prev.map((card, i) => (i === index ? { ...card, isMystery: false } : card)));

    setSelectedPair((prev) => (prev[0] === null ? [{ id, index }, null] : [prev[0], { id, index }]));
  };

  useEffect(() => {
    if (selectedPair[0] && selectedPair[1]) {
      if (selectedPair[0].id === selectedPair[1].id) {
        onMatch(selectedPair[0].id);
        setSelectedPair([null, null]);
      } else {
        setTimeout(() => {
          setGameboard((prev) =>
            prev.map((card, i) =>
              i === selectedPair[0].index || i === selectedPair[1].index ? { ...card, isMystery: true } : card
            )
          );
          onMismatch();
          setSelectedPair([null, null]);
        }, 700);
      }
    }
  }, [selectedPair, onMatch, onMismatch]);

  return (
    <main>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${level.cols}, 1fr)`,
          gridTemplateRows: `repeat(${level.rows}, 1fr)`,
          gap: "0.5rem",
        }}
      >
        {gameboard.map((shape, index) => (
          <li
            key={`${index}-${shape.id}`}
            style={{
              backgroundColor: shape.isMystery ? mystery.bgColor : shape.bgColor,
            }}
            onClick={() => handleSelect(shape.id, index)}
          >
            <img
              src={shape.isMystery ? mystery.src : shape.src}
              alt={shape.name}
              style={{
                objectFit: "contain",
                transition: "opacity 0.2s ease-in-out",
              }}
              onLoad={(e) => (e.target.style.opacity = 1)}
              onError={(e) => (e.target.style.opacity = 0)}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

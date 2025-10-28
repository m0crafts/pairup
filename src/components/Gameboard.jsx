/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback, memo } from "react";
import { mystery, SHAPES } from "../constants";
import { shuffle } from "../utils/utils";

const Card = memo(({ shape, index, isMatched, isSelected, onSelect }) => {
  const isMystery = !isMatched && !isSelected;
  
  return (
    <li
      style={{
        backgroundColor: isMystery ? mystery.bgColor : shape.bgColor,
        cursor: isMatched ? 'default' : 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onClick={() => !isMatched && onSelect(shape.id, index)}
    >
      <img
        src={isMystery ? mystery.src : shape.src}
        alt={shape.name}
        style={{
          objectFit: "contain",
          transform: 'translateZ(0)', // GPU acceleration
          backfaceVisibility: 'hidden',
        }}
      />
    </li>
  );
});

Card.displayName = 'Card';

export default function Gameboard({ level, matchedShapes, onMatch, onMismatch }) {
  const [gameboard, setGameboard] = useState([]);
  const [selectedPair, setSelectedPair] = useState([null, null]);
  const [flippedIndices, setFlippedIndices] = useState(new Set());

  // Preload all images on mount
  useEffect(() => {
    const allImages = [
      mystery.src,
      ...SHAPES.map(shape => shape.src)
    ];
    
    allImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const generateGameboard = () => {
      const { rows, cols } = level;
      const totalPairs = (rows * cols) / 2;
      const selectedShapes = shuffle([...SHAPES]).slice(0, totalPairs);
      return shuffle([...selectedShapes, ...selectedShapes]);
    };
    setGameboard(generateGameboard());
    setSelectedPair([null, null]);
    setFlippedIndices(new Set());
  }, [level]);

  const handleSelect = useCallback((id, index) => {
    // Prevent clicking already matched cards, currently selected cards, or when two cards are already flipped
    if (matchedShapes.has(id) || 
        selectedPair[0]?.index === index || 
        selectedPair.every(Boolean)) {
      return;
    }

    // Update flipped indices instead of entire gameboard
    setFlippedIndices(prev => new Set([...prev, index]));
    
    setSelectedPair((prev) => 
      prev[0] === null 
        ? [{ id, index }, null] 
        : [prev[0], { id, index }]
    );
  }, [matchedShapes, selectedPair]);

  useEffect(() => {
    if (selectedPair[0] && selectedPair[1]) {
      if (selectedPair[0].id === selectedPair[1].id) {
        // Match found
        onMatch(selectedPair[0].id);
        setSelectedPair([null, null]);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedIndices(prev => {
            const newSet = new Set(prev);
            newSet.delete(selectedPair[0].index);
            newSet.delete(selectedPair[1].index);
            return newSet;
          });
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
          <Card
            key={`${index}-${shape.id}`}
            shape={shape}
            index={index}
            isMatched={matchedShapes.has(shape.id)}
            isSelected={flippedIndices.has(index)}
            onSelect={handleSelect}
          />
        ))}
      </ul>
    </main>
  );
}

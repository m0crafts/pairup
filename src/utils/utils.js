export function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const getRandomInt = (min = 0, max) => Math.floor(Math.random() * (max - min + 1)) + min;

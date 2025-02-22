import logo from "./assets/logo.png";
import.meta.glob("/src/assets/*.svg", { eager: true });

const SHAPES = [
  { id: 1, name: "triangle", src: "/src/assets/triangle.svg", bgColor: "#FF000410" },
  { id: 2, name: "star", src: "/src/assets/star.svg", bgColor: "#15FF0010" },
  { id: 3, name: "square", src: "/src/assets/square.svg", bgColor: "#008CFF10" },
  { id: 4, name: "glasses", src: "/src/assets/glasses.svg", bgColor: "#FF800010" },
  { id: 5, name: "rocket", src: "/src/assets/rocket.svg", bgColor: "#002BFF10" },
  { id: 6, name: "ice cream", src: "/src/assets/ice-cream.svg", bgColor: "#FFFA6B25" },
  { id: 7, name: "ball", src: "/src/assets/ball.svg", bgColor: "#00C8FF10" },
  { id: 8, name: "horse chess", src: "/src/assets/horse-chess.svg", bgColor: "#FFC30010" },
  { id: 9, name: "diamond", src: "/src/assets/diamond.svg", bgColor: "#FF00A112" },
  { id: 10, name: "doll", src: "/src/assets/doll.svg", bgColor: "#FFE10015" },
  { id: 11, name: "ghost", src: "/src/assets/ghost.svg", bgColor: "#9000FF10" },
  { id: 12, name: "puppy", src: "/src/assets/puppy.svg", bgColor: "#90540010" },
  { id: 13, name: "bird", src: "/src/assets/bird.svg", bgColor: "#008CFF10" },
  { id: 14, name: "squirrel", src: "/src/assets/squirrel.svg", bgColor: "#FFC30010" },
  { id: 15, name: "crescent", src: "/src/assets/crescent.svg", bgColor: "#FFFA6B10" },
  { id: 16, name: "shovel", src: "/src/assets/shovel.svg", bgColor: "#00C8FF10" },
  { id: 17, name: "heart", src: "/src/assets/heart.svg", bgColor: "#ff336610" },
  { id: 18, name: "leaf", src: "/src/assets/leaf.svg", bgColor: "#33cc3310" },
  { id: 19, name: "react", src: "/src/assets/react.svg", bgColor: "#008CFF10" },
  { id: 20, name: "mystery", src: "/src/assets/mystery.svg", bgColor: "#333333" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function App() {
  return (
    <>
      <header>
        <img src={logo} alt="Logo" />
      </header>
      <div className="stats">
        <div className="stat">
          <p className="label">Level</p>
          <div className="content">5</div>
        </div>
        <div className="stat timer">
          <p className="label">Time</p>
          <div className="content">01:24</div>
        </div>
        <div className="stat">
          <p className="label">Streak</p>
          <div className="content">
            <p>
              <span>⭐</span> 6
            </p>
          </div>
        </div>
      </div>
      <main>
        <ul>
          {shuffle([...SHAPES, ...SHAPES]).map((shape) => (
            <li key={shape.id} style={{ backgroundColor: shape.bgColor }}>
              <img src={shape.src} alt={shape.name} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;

import { useState } from "react";
import { getNextGridState, initializeGrid } from "./game-utils";
import { Grid } from "./components/grid";

export function App() {
  const [cells, setCells] = useState<boolean[][]>(initializeGrid(50, 50));
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const isRunning = intervalId !== null;

  const onCellClick = (x: number, y: number) => {
    const newCells = [...cells];
    newCells[y][x] = !newCells[y][x];
    setCells(newCells);
  };

  const onStart = () => {
    const id = setInterval(() => {
      setCells((prev) => getNextGridState(prev));
    }, 500);
    setIntervalId(id);
  };

  const onStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const onReset = () => {
    onStop();
    setCells(initializeGrid(50, 50));
  };

  return (
    <div>
      <Grid width={50} height={50} cells={cells} onCellClick={onCellClick} />
      <div className="flex gap-4">
        <button
          onClick={onStart}
          disabled={isRunning}
          className="disabled:opacity-50"
        >
          start
        </button>
        <button
          onClick={onStop}
          disabled={!isRunning}
          className="disabled:opacity-50"
        >
          stop
        </button>
        <button onClick={onReset}>reset</button>
      </div>
    </div>
  );
}

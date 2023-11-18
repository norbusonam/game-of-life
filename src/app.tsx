import { useEffect, useState } from "react";
import { getNextGridState, initializeGrid } from "./game-utils";
import { Grid } from "./components/grid";

const MIN_SPEED = 1;
const MAX_SPEED = 20;
const DEFAULT_SPEED = 2;

export function App() {
  const [cells, setCells] = useState<boolean[][]>(initializeGrid(50, 50));
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [iterations, setIterations] = useState(0);
  const [updatesPerSecond, setUpdatesPerSecond] =
    useState<number>(DEFAULT_SPEED);
  const isRunning = intervalId !== null;

  useEffect(() => {
    if (isRunning) {
      onStop();
      onStart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatesPerSecond]);

  const onCellClick = (x: number, y: number) => {
    const newCells = [...cells];
    newCells[y][x] = !newCells[y][x];
    setCells(newCells);
  };

  const onStart = () => {
    const id = setInterval(() => {
      setCells((prev) => getNextGridState(prev));
      setIterations((prev) => prev + 1);
    }, 1000 / updatesPerSecond);
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
    setUpdatesPerSecond(DEFAULT_SPEED);
    setCells(initializeGrid(50, 50));
    setIterations(0);
  };

  const onSpeedChange = (newSpeed: number) => {
    if (newSpeed < MIN_SPEED || newSpeed > MAX_SPEED) {
      return;
    }
    setUpdatesPerSecond(newSpeed);
  };

  return (
    <div>
      <Grid width={50} height={50} cells={cells} onCellClick={onCellClick} />
      <div className="flex justify-between">
        <div className="space-x-2">
          <button
            onClick={onStart}
            disabled={isRunning}
            className="disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            start
          </button>
          <button
            onClick={onStop}
            disabled={!isRunning}
            className="disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            stop
          </button>
          <span>{iterations} iterations</span>
        </div>
        <button onClick={onReset}>reset</button>
        <div className="space-x-2">
          <button
            disabled={updatesPerSecond === MIN_SPEED}
            onClick={() => onSpeedChange(updatesPerSecond - 1)}
            className="disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            slower
          </button>
          <span>{updatesPerSecond} updates per second</span>
          <button
            disabled={updatesPerSecond === MAX_SPEED}
            onClick={() => onSpeedChange(updatesPerSecond + 1)}
            className="disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            faster
          </button>
        </div>
      </div>
    </div>
  );
}

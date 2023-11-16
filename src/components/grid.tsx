type Props = {
  width: number;
  height: number;
  cells: boolean[][];
  onCellClick: (x: number, y: number) => void;
};

export function Grid(props: Props) {
  return (
    <div className="flex flex-col gap-[2px]">
      {props.cells.map((row, y) => (
        <div key={y} className="flex gap-[2px]">
          {row.map((isAlive, x) => (
            <button
              key={`${x}-${y}`}
              className={`w-4 h-4 transition-colors duration-75 ${
                isAlive ? "bg-green-500" : "bg-neutral-500"
              }`}
              onClick={() => props.onCellClick(x, y)}
              onMouseEnter={(e) => {
                if (e.buttons === 1) {
                  props.onCellClick(x, y);
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

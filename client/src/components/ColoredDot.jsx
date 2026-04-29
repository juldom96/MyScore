export default function ColoredDot({ color, selectedColor, setSelectedColor }) {
  return (
    <input
      type="radio"
      name="playerColor"
      className="colored-dot"
      value={color}
      key={color}
      style={{ background: color, accentColor: color }}
      checked={selectedColor === color}
      onChange={(e) => {
        setSelectedColor(e.target.value);
      }}
    ></input>
  );
}

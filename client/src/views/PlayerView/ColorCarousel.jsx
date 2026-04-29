import ColoredDot from '../../components/ColoredDot';

export default function ColorCarousel({ selectedColor, setSelectedColor }) {
  const colorValues = [
    '#0dcaf0',
    '#0d6efd',
    '#198754',
    '#ffc107',
    '#ff7a00',
    '#dc3545',
    '#c917ff',
    '#8f17ff',
  ];

  return (
    <div id="color-carousel">
      {colorValues.map((color) => (
        <ColoredDot
          key={color}
          color={color}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      ))}
    </div>
  );
}

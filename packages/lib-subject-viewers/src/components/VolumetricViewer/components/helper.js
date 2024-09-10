// Generate a cache of all the colors used during render
// This improves draw performance by avoiding re-calculating the same color every render

import { Color } from "three";

export const ColorHues = [
  205, 90, 60, 30, 0, 330, 300, 270, 240, 210, 180, 150, 120,
];
export const CanvasColors = [];
export const ThreeColors = [];

export const pixelToPercent = (value) => {
  // 255 => 100%
  // 0 => 0%
  // 127.5 => 50%
  return `${Math.round((value / 255) * 100)}%`; // normalize is some way
};

export const pointColor = ({
  annotationIndex = -1,
  isThree = false,
  pointValue,
}) => {
  const ref = isThree ? ThreeColors : CanvasColors;
  return ref[annotationIndex + 1][pointValue];
};

// Generate the cached colors
for (let i = 0; i < ColorHues.length; i++) {
  const hue = ColorHues[i];

  if (!CanvasColors[i]) CanvasColors[i] = [];
  if (!ThreeColors[i]) ThreeColors[i] = [];

  for (let ii = 0; ii < 256; ii++) {
    const pointNormed = Math.floor(ii / 2) + 64;
    const hslColor = `hsl(${hue}, ${i === 0 ? 0 : 75}%, ${pixelToPercent(pointNormed)})`;

    CanvasColors[i][ii] = hslColor;
    ThreeColors[i][ii] = new Color(hslColor);
  }
}

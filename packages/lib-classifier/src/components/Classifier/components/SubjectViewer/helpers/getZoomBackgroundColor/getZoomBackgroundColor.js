export default function getZoomBackgroundColor (dark = false, zooming = false, colors = {}) {
  let background
  if (dark) {
    background = (zooming) ? colors['dark-5'] : colors['dark-1']
  } else {
    background = (zooming) ? colors['neutral-6'] : colors['light-1']
  }

  return background
}
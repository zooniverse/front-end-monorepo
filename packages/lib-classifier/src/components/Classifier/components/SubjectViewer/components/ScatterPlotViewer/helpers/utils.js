export function left (tickDirection, margin) {
  const left = {
    inner: 0,
    outer: margin.left
  }

  return left[tickDirection]
}

export function top (tickDirection, margin) {
  const top = {
    inner: 0,
    outer: margin.top
  }

  return top[tickDirection]
}

export function xMin (tickDirection, padding) {
  const xMin = {
    inner: padding.left,
    outer: 0
  }

  return xMin[tickDirection]
}

export function xMax (tickDirection, parentWidth, margin) {
  const xMax = {
    inner: parentWidth - margin.left,
    outer: parentWidth - margin.left - margin.right
  }

  return xMax[tickDirection]
}

export function yMin (tickDirection, padding) {
  const yMin = {
    inner: padding.bottom,
    outer: 0
  }

  return yMin[tickDirection]
}

export function yMax (tickDirection, parentHeight, margin, padding) {
 const yMax = {
   inner: parentHeight - padding.bottom,
   outer: parentHeight - margin.top - margin.bottom
 }

 return yMax[tickDirection]
}
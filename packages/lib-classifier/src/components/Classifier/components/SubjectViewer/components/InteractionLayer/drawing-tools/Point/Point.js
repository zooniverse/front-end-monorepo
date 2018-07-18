import React from 'react'

function Point ({ x, y }) {
  const size = 10
  const horizontal = { x1: x, y1: y - size, x2: x, y2: y + size }
  const vertical = { x1: x - size, y1: y, x2: x + size, y2: y }

  return (
    <g>
      <line {...horizontal} strokeWidth='2' stroke='red' />
      <line {...vertical} strokeWidth='2' stroke='red' />
    </g>
  )
}

export default Point

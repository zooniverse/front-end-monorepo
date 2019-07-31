import React from 'react'

const FullHeightLine = () => {
  return (
    <>
      <rect x='0' y='0' width='100%' height='100%' strokeDasharray={[10, 10]} />
      <line x1='50' y1='0' x2='50' y2='100' />
    </>
  )
}

export default FullHeightLine

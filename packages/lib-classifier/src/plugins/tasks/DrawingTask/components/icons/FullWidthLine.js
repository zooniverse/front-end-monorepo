import React from 'react'

const FullWidthLine = () => {
  return (
    <>
      <rect x='0' y='0' width='100%' height='100%' strokeDasharray={[10, 10]} />
      <line x1='0' y1='50' x2='100' y2='50' />
    </>
  )
}

export default FullWidthLine

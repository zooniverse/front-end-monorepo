import React from 'react'

const Bezier = () => {
  return (
    <>
      <path d='M90 90 Q 10 50 90 10' fill='none' />
      <path d='M90 90 L 10 50 L 90 10' strokeDasharray={[10, 10]} fill='none' />
    </>
  )
}

export default Bezier

import React, { createContext, useContext } from 'react'

const ZoomContext = createContext()

export const ZoomProvider = ({ children }) => {
  let onZoom = () => {
    console.log('ZoomProvider onZoom')
  }

  function setOnZoom (zoomFn) {
    onZoom = zoomFn
  }

  function zoomIn () {
    console.log('zooming in')
    onZoom('zoomin')
  }

  function zoomOut () {
    console.log('zooming out')
    onZoom('zoomout')
  }

  return (
    <ZoomContext.Provider value={{ onZoom, setOnZoom, zoomIn, zoomOut }}>
      {children}
    </ZoomContext.Provider>
  )
}

export const useZoom = () => useContext(ZoomContext)

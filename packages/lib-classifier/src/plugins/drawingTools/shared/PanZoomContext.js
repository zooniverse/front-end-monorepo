import React, { createContext, useContext } from 'react'

const PanZoomContext = createContext()

export const PanZoomProvider = ({ children }) => {
  let onPan = () => {
    console.log('PanZoomProvider onPan')
  }
  
  let onZoom = () => {
    console.log('PanZoomProvider onZoom')
  }

  function panLeft () {
    onPan(-1, 0)
  }

  function panRight () {
    onPan(1, 0)
  }

  function panUp () {
    onPan(0, -1)
  }

  function panDown () {
    onPan(0, 1)
  }

  function setOnPan (panFn) {
    onPan = panFn
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
    <PanZoomContext.Provider
      value={{
        onPan,
        onZoom,
        panLeft,
        panRight,
        panUp,
        panDown,
        setOnPan,
        setOnZoom,
        zoomIn,
        zoomOut
      }}
    >
      {children}
    </PanZoomContext.Provider>
  )
}

export const usePanZoom = () => useContext(PanZoomContext)

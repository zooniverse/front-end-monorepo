import React from 'react'
import { Blank } from 'grommet-icons'

const BlankWithViewBox = ({ children }) => (
  <Blank viewBox='0 0 100 100'>
    {children}
  </Blank>
)

const icons = {
  anchoredEllipse () {
    return (
      <BlankWithViewBox>
        <ellipse rx='45' ry='25' cx='50' cy='50' transform='rotate(-30, 50, 50)' />
        <circle r='5' cy='50' cx='50' />
      </BlankWithViewBox>
    )
  },

  point () {
    return (
      <BlankWithViewBox>
        <circle r='30' cx='50' cy='50' />
        <line x1='50' y1='5' x2='50' y2='40' />
        <line x1='95' y1='50' x2='60' y2='50' />
        <line x1='50' y1='95' x2='50' y2='60' />
        <line x1='5' y1='50' x2='40' y2='50' />
      </BlankWithViewBox>
    )
  },

  pointGrid () {
    return (
      <BlankWithViewBox>
        <line x1='20' y1='0' x2='20' y2='80' />
        <line x1='40' y1='0' x2='40' y2='80' />
        <line x1='60' y1='0' x2='60' y2='80' />

        <line x1='0' y1='20' x2='80' y2='20' />
        <line x1='0' y1='40' x2='80' y2='40' />
        <line x1='0' y1='60' x2='80' y2='60' />
      </BlankWithViewBox>
    )
  },

  line () {
    return (
      <BlankWithViewBox>
        <line x1='25' y1='90' x2='75' y2='10' />
      </BlankWithViewBox>
    )
  },

  rectangle () {
    return (
      <BlankWithViewBox>
        <rect x='10' y='30' width='80' height='40' />
      </BlankWithViewBox>
    )
  },

  rotateRectangle () {
    return (
      <BlankWithViewBox>
        <rect x='10' y='30' width='80' height='40' />
      </BlankWithViewBox>
    )
  },

  polygon () {
    return (
      <BlankWithViewBox>
        <polyline points='50, 5 90, 90 50, 70 5, 90 50, 5' />
      </BlankWithViewBox>
    )
  },

  circle () {
    return (
      <BlankWithViewBox>
        <ellipse rx='33' ry='33' cx='50' cy='50' />
      </BlankWithViewBox>
    )
  },

  ellipse () {
    return (
      <BlankWithViewBox>
        <ellipse rx='45' ry='25' cx='50' cy='50' transform='rotate(-30, 50, 50)' />
      </BlankWithViewBox>
    )
  },

  bezier () {
    return (
      <BlankWithViewBox>
        <path d='M90 90 Q 10 50 90 10' fill={'none'} />
        <path d='M90 90 L 10 50 L 90 10' strokeDasharray={[10, 10]} fill={'none'} />
      </BlankWithViewBox>
    )
  },

  column () {
    return (
      <BlankWithViewBox>
        <rect x='10' y='0' width='25' height='100%' />
      </BlankWithViewBox>
    )
  },

  grid () {
    return (
      <BlankWithViewBox>
        <polyline points='0, 25 50, 25 50, 75 0, 75 0, 25 50, 25 100, 25 100, 75 50, 75 50, 25' />
      </BlankWithViewBox>
    )
  },

  triangle () {
    return (
      <BlankWithViewBox>
        <polygon points='50, 12 95, 90 5,90 ' />
        <ellipse cx='50' cy='64' rx='17' ry='9' />
      </BlankWithViewBox>
    )
  },

  freehandLine () {
    return (
      <BlankWithViewBox>
        <path d='M10,50 Q25,10,50,50,75,90,90,50' fill={'none'} />
      </BlankWithViewBox>
    )
  },

  freehandShape () {
    return (
      <BlankWithViewBox>
        <path d='M20,60 C10,10,80,10,50,50 C20,90 90,90 80,40 z' />
      </BlankWithViewBox>
    )
  },

  freehandSegmentLine () {
    return (
      <BlankWithViewBox>
        <path d='M10,50 Q25,10,50,50,75,90,90,50' fill={'none'} />
      </BlankWithViewBox>
    )
  },

  freehandSegmentShape () {
    return (
      <BlankWithViewBox>
        <path d='M20,60 C10,10,80,10,50,50 C20,90 90,90 80,40 z' />
      </BlankWithViewBox>
    )
  },

  fullWidthLine () {
    return (
      <BlankWithViewBox>
        <rect x='0' y='0' width='100%' height='100%' strokeDasharray={[10, 10]} />
        <line x1='0' y1='50' x2='100' y2='50' />
      </BlankWithViewBox>
    )
  },

  fullHeightLine () {
    return (
      <BlankWithViewBox>
        <rect x='0' y='0' width='100%' height='100%' strokeDasharray={[10, 10]} />
        <line x1='50' y1='0' x2='50' y2='100' />
      </BlankWithViewBox>
    )
  },

  fan () {
    return (
      <BlankWithViewBox>
        <path d='M 50 95 L 80 33 A 20 20 0 1 0 20 33 Z' />
      </BlankWithViewBox>
    )
  }
}

export default icons

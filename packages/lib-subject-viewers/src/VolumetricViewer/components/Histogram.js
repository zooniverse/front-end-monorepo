import { Box } from 'grommet'
import { InputRangeDual } from './InputRangeDual'
import { object } from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const StyledBox = styled(Box)`
  max-width: 195px;
`
const HISTOGRAM_MIN = 5
const HISTOGRAM_MAX = 255
const MAX_HEIGHT = 30

export const Histogram = ({ viewer }) => {
  const [pathData, setPathData] = useState('')

  useEffect(() => {
    setupHistogram()
    viewer.on('change:threshold', setupHistogram)

    return () => {
      viewer.off('change:threshold', setupHistogram)
    }
  }, [])

  function setupHistogram () {
    const histogram = [0]
    histogram[viewer.threshold.min] = 0
    histogram[viewer.threshold.max] = 0
    histogram[255] = 0
    let _maxCount = 0

    // Generate data while skipping points that are outside of threshold
    viewer.data.forEach((point) => {
      if (point < viewer.threshold.min || point > viewer.threshold.max) return

      histogram[point] = (histogram[point] ?? 0) + 1
      if (histogram[point] > _maxCount) {
        _maxCount = histogram[point]
      }
    })

    const scaleFactor = MAX_HEIGHT / _maxCount

    // SVG starts at top left, so we need to invert Y
    function calculateY (x) {
      return (_maxCount - (histogram[x] ?? 0)) * scaleFactor
    }

    // Generate the SVG path data
    let path = `M 0, ${calculateY(0)}`

    for (let x = 1; x < histogram.length; x++) {
      if (histogram[x] !== undefined) {
        const y = calculateY(x)
        path += ` L ${x},${y}`
      }
    }

    setPathData(path)
  }

  return (
    <StyledBox flex direction='column' justify='between'>
      <svg viewBox={`0 0 260 ${MAX_HEIGHT + 5}`} width='195px' height='30px'>
        <path
          d={pathData}
          stroke='white'
          strokeWidth='3'
          fill='none'
        />
      </svg>
      <InputRangeDual
        onChange={(min, max) => viewer.setThreshold({ min, max })}
        valueMax={HISTOGRAM_MAX}
        valueMaxCurrent={viewer.threshold.max}
        valueMin={HISTOGRAM_MIN}
        valueMinCurrent={viewer.threshold.min}
      />
    </StyledBox>
  )
}

Histogram.propTypes = {
  viewer: object
}

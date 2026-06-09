import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import GeoDrawingTask from './GeoDrawingTask'
import GeoDrawingTaskModel from '../models/GeoDrawingTask'

function buildLineStringTask(toolOverrides = {}) {
  return GeoDrawingTaskModel.create({
    activeToolIndex: 0,
    strings: {
      instruction: 'Draw',
      'tools.0.label': 'Segmented Line'
    },
    taskKey: 'T0',
    tools: [
      { color: '#E65252', label: 'Segmented Line', type: 'SegmentedLine', ...toolOverrides }
    ],
    type: 'geoDrawing'
  })
}

function renderTask(task) {
  return render(
    <Grommet theme={zooTheme}>
      <GeoDrawingTask task={task} />
    </Grommet>
  )
}

describe('Component > GeoDrawingTask', function () {
  describe('tool input status (shared InputStatus)', function () {
    it('no min + no max → "0 drawn"', function () {
      renderTask(buildLineStringTask())
      expect(screen.getByText('0 drawn')).to.exist
    })

    it('max only → "0 of N maximum drawn"', function () {
      renderTask(buildLineStringTask({ max: 4 }))
      expect(screen.getByText('0 of 4 maximum drawn')).to.exist
    })

    it('min only → "0 of N required drawn"', function () {
      renderTask(buildLineStringTask({ min: 2 }))
      expect(screen.getByText('0 of 2 required drawn')).to.exist
    })

    it('min + max → "0 of N required, M maximum drawn"', function () {
      renderTask(buildLineStringTask({ min: 1, max: 3 }))
      expect(screen.getByText('0 of 1 required, 3 maximum drawn')).to.exist
    })

    it('coerces Panoptes string snapshots (min/max) through MST', function () {
      renderTask(buildLineStringTask({ min: '1', max: '3' }))
      expect(screen.getByText('0 of 1 required, 3 maximum drawn')).to.exist
    })

    it('renders one status per tool (multi-tool: Tool 0 bounded, Tool 1 unbounded)', function () {
      const task = GeoDrawingTaskModel.create({
        activeToolIndex: 0,
        strings: {
          'tools.0.label': 'Segmented Line',
          'tools.1.label': 'Segmented Line 2'
        },
        taskKey: 'T0',
        tools: [
          { color: '#E65252', label: 'Segmented Line', type: 'SegmentedLine', min: 1, max: 3 },
          { color: '#F1AE45', label: 'Segmented Line 2', type: 'SegmentedLine' }
        ],
        type: 'geoDrawing'
      })
      renderTask(task)
      expect(screen.getByText('0 of 1 required, 3 maximum drawn')).to.exist
      expect(screen.getByText('0 drawn')).to.exist
      expect(screen.getByText('Segmented Line 2')).to.exist
    })
  })
})

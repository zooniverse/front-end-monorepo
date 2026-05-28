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
      { color: '#E65252', label: 'Segmented Line', type: 'LineString', ...toolOverrides }
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
  describe('LineString bounds subtitle — line-count permutations', function () {
    it('no min + no max → subtitle suppressed', function () {
      renderTask(buildLineStringTask())
      expect(screen.queryByText(/points per line/)).to.not.exist
    })

    it('no min + max → "0-N lines"', function () {
      renderTask(buildLineStringTask({ max: 4 }))
      expect(screen.getByText('0-4 lines, 2+ points per line')).to.exist
    })

    it('min + no max → "N+ lines"', function () {
      renderTask(buildLineStringTask({ min: 2 }))
      expect(screen.getByText('2+ lines, 2+ points per line')).to.exist
    })

    it('min + max → "N-M lines"', function () {
      renderTask(buildLineStringTask({ min: 1, max: 3 }))
      expect(screen.getByText('1-3 lines, 2+ points per line')).to.exist
    })
  })

  describe('LineString bounds subtitle — vertex permutations', function () {
    it('no min_vertices + no max_vertices → subtitle suppressed', function () {
      renderTask(buildLineStringTask())
      expect(screen.queryByText(/points per line/)).to.not.exist
    })

    it('no min_vertices + max_vertices → "2-N points per line"', function () {
      renderTask(buildLineStringTask({ max_vertices: 10 }))
      expect(screen.getByText('0+ lines, 2-10 points per line')).to.exist
    })

    it('min_vertices (>2) + no max_vertices → "N+ points per line"', function () {
      renderTask(buildLineStringTask({ min_vertices: 4 }))
      expect(screen.getByText('0+ lines, 4+ points per line')).to.exist
    })

    it('min_vertices + max_vertices → "N-M points per line"', function () {
      renderTask(buildLineStringTask({ min_vertices: 3, max_vertices: 10 }))
      expect(screen.getByText('0+ lines, 3-10 points per line')).to.exist
    })
  })

  describe('LineString bounds subtitle — edge cases', function () {
    it('collapses "N-N lines" to "N lines" when min === max', function () {
      renderTask(buildLineStringTask({ min: 3, max: 3 }))
      expect(screen.getByText('3 lines, 2+ points per line')).to.exist
    })

    it('collapses "N-N points per line" to "N points per line" when min_vertices === max_vertices', function () {
      renderTask(buildLineStringTask({ min_vertices: 5, max_vertices: 5 }))
      expect(screen.getByText('0+ lines, 5 points per line')).to.exist
    })

    it('does NOT render the subtitle for explicit min_vertices: 2 (equals default)', function () {
      renderTask(buildLineStringTask({ min_vertices: 2 }))
      expect(screen.queryByText(/points per line/)).to.not.exist
    })

    it('coerces Panoptes string snapshots through MST and renders the numeric subtitle', function () {
      renderTask(buildLineStringTask({ min: '1', max: '3', min_vertices: '3', max_vertices: '10' }))
      expect(screen.getByText('1-3 lines, 3-10 points per line')).to.exist
    })

    it('suppresses the subtitle on non-LineString tools', function () {
      const task = GeoDrawingTaskModel.create({
        activeToolIndex: 0,
        strings: { 'tools.0.label': 'Map Point' },
        taskKey: 'T0',
        tools: [{ color: '#ff0000', label: 'Map Point', type: 'Point' }],
        type: 'geoDrawing'
      })
      renderTask(task)
      expect(screen.getByText('Map Point')).to.exist
      expect(screen.queryByText(/points per line/)).to.not.exist
    })

    it('renders one subtitle per LineString tool (multi-tool: Tool 0 bounded, Tool 1 unbounded)', function () {
      const task = GeoDrawingTaskModel.create({
        activeToolIndex: 0,
        strings: {
          'tools.0.label': 'Segmented Line',
          'tools.1.label': 'Segmented Line 2'
        },
        taskKey: 'T0',
        tools: [
          { color: '#E65252', label: 'Segmented Line', type: 'LineString', min: 1, max: 3, min_vertices: 3, max_vertices: 10 },
          { color: '#F1AE45', label: 'Segmented Line 2', type: 'LineString' }
        ],
        type: 'geoDrawing'
      })
      renderTask(task)
      expect(screen.getByText('1-3 lines, 3-10 points per line')).to.exist
      expect(screen.getByText('Segmented Line 2')).to.exist
      expect(screen.getAllByText(/lines,/)).to.have.lengthOf(1)
    })
  })
})

import { act, render, waitFor } from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import sinon from 'sinon'
import { vi } from 'vitest'

import GeoDrawingTaskModel from '@plugins/tasks/experimental/geoDrawing/task/models/GeoDrawingTask'
import GeoMapViewer from './GeoMapViewer'

const createLineStringInteractionSpy = sinon.stub()
const setActiveOnLineStringDraw = sinon.stub()
const setActiveOnLineStringModify = sinon.stub()

vi.mock('./helpers/createGeoLineStringInteraction', async () => {
  const actual = await vi.importActual('./helpers/createGeoLineStringInteraction')
  return {
    ...actual,
    default: (args) => {
      createLineStringInteractionSpy(args)
      return {
        setActive: setActiveOnLineStringDraw,
        destroy: sinon.stub(),
        isDrawing: () => false,
        isCapped: () => false,
        abortDrawing: sinon.stub()
      }
    }
  }
})

vi.mock('./helpers/createGeoLineStringModifyInteraction', () => ({
  default: () => ({
    setActive: setActiveOnLineStringModify,
    destroy: sinon.stub(),
    isModifying: () => false
  })
}))

describe('Component > GeoMapViewer — activeToolIndex sync (observer wrap + per-tool Draw)', function () {
  let task

  beforeEach(function () {
    createLineStringInteractionSpy.resetHistory()
    setActiveOnLineStringDraw.resetHistory()
    setActiveOnLineStringModify.resetHistory()
    task = GeoDrawingTaskModel.create({
      activeToolIndex: 0,
      strings: {
        'tools.0.label': 'Segmented Line',
        'tools.1.label': 'Segmented Line 2'
      },
      taskKey: 'T0',
      tools: [
        { color: '#E65252', label: 'Segmented Line', type: 'SegmentedLine', min: 1, max: 3, min_vertices: 3 },
        { color: '#F1AE45', label: 'Segmented Line 2', type: 'SegmentedLine' }
      ],
      type: 'geoDrawing'
    })
  })

  function renderViewer() {
    return render(
      <Grommet theme={zooTheme}>
        <GeoMapViewer geoDrawingTask={task} />
      </Grommet>
    )
  }

  it('constructs the LineString Draw once on initial mount and activates it', async function () {
    renderViewer()
    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.greaterThan(0)
      expect(setActiveOnLineStringDraw.callCount).to.be.greaterThan(0)
    })
    expect(setActiveOnLineStringDraw.lastCall.args[0]).to.equal(true)
  })

  it('constructs a NEW LineString Draw when activeToolIndex changes so vertex bounds follow the new tool', async function () {
    renderViewer()
    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.greaterThan(0)
    })
    const baseline = createLineStringInteractionSpy.callCount

    act(() => {
      task.setActiveTool(1)
    })

    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.greaterThan(baseline)
    })
    expect(createLineStringInteractionSpy.lastCall.args[0].geoDrawingTask).to.equal(task)
    expect(task.activeToolIndex).to.equal(1)
  })

  it('reconstructs the Draw on switch back to the original tool too', async function () {
    renderViewer()
    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.greaterThan(0)
    })

    act(() => { task.setActiveTool(1) })
    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.at.least(2)
    })
    const afterFirstSwitch = createLineStringInteractionSpy.callCount

    act(() => { task.setActiveTool(0) })
    await waitFor(() => {
      expect(createLineStringInteractionSpy.callCount).to.be.greaterThan(afterFirstSwitch)
    })
  })
})

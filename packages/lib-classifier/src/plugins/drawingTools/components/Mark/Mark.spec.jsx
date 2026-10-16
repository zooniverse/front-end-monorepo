import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { when } from 'mobx'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { EllipseTool, PointTool, RectangleTool } from '@plugins/drawingTools/models/tools'
import { Ellipse, Mark, Point, Rectangle } from '@plugins/drawingTools/components'

describe('Drawing tools > Mark', function () {
  function withGrommetWrapper() {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          {children}
        </Grommet>
      )
    }
  }

  const pointTool = PointTool.create({
    type: 'point',
    tasks: [{
      taskKey: 'T0.0.0',
      type: 'text',
      instruction: 'dummy task'
    }]
  })
  let point
  const onDelete = sinon.stub()
  const onFinish = sinon.stub()
  const onSelect = sinon.stub()
  let svgPoint

  describe('default behaviour', function () {
    before(function () {
      point = pointTool.createMark({
        id: 'point1'
      })
      point.finish()
      render(
        <svg>
          <Mark
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper()}
      )
      // svgPoint = screen.getByLabelText('Point 1')
      svgPoint = document.querySelector('g.drawingMark')
    })

    after(function () {
      onFinish.resetHistory()
      onSelect.resetHistory()
    })

    it('should render a child drawing tool', function () {
      expect(svgPoint).to.exist
    })

    it('should render a child with an id including the frame', function () {
      expect(svgPoint.id).to.equal('mark-point1-0')
    })
  })

  describe('on focus', function () {
    before(async function () {
      const user = userEvent.setup({ delay: 'none' })
      point = pointTool.createMark({
        id: 'point1'
      })
      point.finish()
      render(
        <svg>
          <Mark
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      await user.tab()
    })

    it('should be selected', function () {
      expect(onSelect).to.have.been.calledOnce
    })
  })

  describe('on keydown', function () {
    describe('with backspace', function () {

      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        point = pointTool.createMark({
          id: 'point1'
        })
        point.finish()
        render(
          <svg>
            <Mark
              label='Point 1'
              mark={point}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={point} />
            </Mark>
          </svg>, { wrapper: withGrommetWrapper() }
        )
        await user.tab()
        await user.keyboard('{Backspace}')
      })

      after(function () {
        onDelete.resetHistory()
      })

      it('should be deleted', function () {
        expect(onDelete).to.have.been.calledOnce
      })
    })

    describe('with enter', function () {

      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        point = pointTool.createMark({
          id: 'point1'
        })
        point.finish()
        render(
          <svg>
            <Mark
              label='Point 1'
              mark={point}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={point} />
            </Mark>
          </svg>, { wrapper: withGrommetWrapper() }
        )
        point.setSubTaskVisibility(false)
        await user.tab()
        await user.keyboard('{Enter}')
        await when(() => point.subTaskVisibility)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.equal(true)
      })

      it('should call onFinish', async function () {
        expect(onFinish).to.have.been.calledOnce
      })
    })

    describe('with space', function () {

      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        point = pointTool.createMark({
          id: 'point1'
        })
        point.finish()
        render(
          <svg>
            <Mark
              label='Point 1'
              mark={point}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={point} />
            </Mark>
          </svg>, { wrapper: withGrommetWrapper() }
        )
        point.setSubTaskVisibility(false)
        await user.tab()
        await user.keyboard('{ }')
        await when(() => point.subTaskVisibility)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.equal(true)
      })

      it('should call onFinish', async function () {
        expect(onFinish).to.have.been.calledOnce
      })
    })

    describe('with other keys', function () {

      before(async function () {
        const user = userEvent.setup({ delay: 'none' })
        point = pointTool.createMark({
          id: 'point1'
        })
        point.finish()
        render(
          <svg>
            <Mark
              label='Point 1'
              mark={point}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={point} />
            </Mark>
          </svg>, { wrapper: withGrommetWrapper() }
        )
        point.setSubTaskVisibility(false)
        await user.tab()
        await user.keyboard('{Tab}')
      })

      it('should not be deleted', function () {
        expect(onDelete).to.not.have.been.called
      })

      it('should not call onFinish', function () {
        expect(onFinish).to.not.have.been.called
      })
    })
  })

  describe('on click', function () {
    let point, svgPoint

    before(function () {
      point = pointTool.createMark({
        id: 'point1'
      })
      point.finish()
      render(
        <svg>
          <Mark
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      svgPoint = screen.getByLabelText('Point 1')
    })

    it('should open the subtask popup', async function () {
      const user = userEvent.setup({ delay: 'none' })
      point.setSubTaskVisibility(false)
      expect(point.subTaskVisibility).to.equal(false)
      await user.click(svgPoint)
      expect(point.subTaskVisibility).to.equal(true)
    })
  })

  describe('with an x,y position', function () {
    let svgPoint

    before(function () {
      const pointTool = PointTool.create({
        type: 'point'
      })
      const point = pointTool.createMark({
        id: 'point1',
        x: 50,
        y: 120
      })
      render(
        <svg>
          <Mark
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      svgPoint = screen.getByLabelText('Point 1')
    })

    it('should be positioned at {mark.x, mark.y}', function () {
      const transform = svgPoint.getAttribute('transform')
      expect(transform).to.have.string('translate(50, 120)')
    })
  })

  describe('without an x,y position', function () {
    let svgRectangle

    before(function () {
      const rectangleTool = RectangleTool.create({
        type: 'rectangle'
      })
      const rectangle = rectangleTool.createMark({
        id: 'rectangle1'
      })
      rectangle.setCoordinates({ x_left: 85, x_right: 115, y_top: 180, y_bottom: 220 })
      render(
        <svg>
          <Mark
            label='Rectangle 1'
            mark={rectangle}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Rectangle mark={rectangle} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      svgRectangle = screen.getByLabelText('Rectangle 1')
    })

    it('should not be translated', function () {
      const transform = svgRectangle.getAttribute('transform')
      expect(transform).to.not.have.string('translate')
    })
  })

  describe('with a rotation angle', function () {
    let svgEllipse

    before(function () {
      const ellipseTool = EllipseTool.create({
        type: 'ellipse'
      })
      const ellipse = ellipseTool.createMark({
        id: 'ellipse1',
        x: 50,
        y: 120,
        angle: -45
      })
      render(
        <svg>
          <Mark
            label='Ellipse 1'
            mark={ellipse}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Ellipse mark={ellipse} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      svgEllipse = screen.getByLabelText('Ellipse 1')
    })

    it('should be rotated by mark.angle', function () {
      const transform = svgEllipse.getAttribute('transform')
      expect(transform).to.have.string('rotate(-45)')
    })
  })

  describe('disabled marks', function () {
    beforeEach(function () {
      point = pointTool.createMark({
        id: 'point1'
      })
      point.finish()
      render(
        <svg>
          <Mark
            disabled
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
    })

    it('should not be focusable', function () {
      const mark = document.querySelector('g.drawingMark')
      expect(mark.getAttribute('tabindex')).to.equal('-1')
    })

    it('should be announced as disabled', function () {
      const mark = document.querySelector('g.drawingMark')
      expect(mark.getAttribute('aria-disabled')).to.equal('true')
    })
  })
})

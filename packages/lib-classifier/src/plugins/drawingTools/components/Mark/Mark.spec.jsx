import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { when } from 'mobx'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { EllipseTool, PointTool } from '@plugins/drawingTools/models/tools'
import { Ellipse, Mark, Point } from '@plugins/drawingTools/components'

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
  const onSelect = sinon.stub()
  let svgPoint

  describe('default behaviour', function () {
    before(function () {
      point = pointTool.createMark({
        id: 'point1',
        x: 10,
        y: 5
      })
      point.finish()
      render(
        <svg>
          <Mark
            label='Point 1'
            mark={point}
            onDelete={onDelete}
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
      onSelect.resetHistory()
    })

    it('should render a child drawing tool', function () {
      expect(svgPoint).to.exist
    })

    it('should render a child with an id including the frame', function () {
      expect(svgPoint.id).to.equal('mark-point1-0')
    })

    it('should render child with a translate transform', function () {
      expect(svgPoint.getAttribute('transform')).to.equal('translate(10, 5)')
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

    it('should not open subtask popup', function () {
      expect(onSelect).to.have.been.calledOnce
    })

    it('should not open subtask popup', function () {
      expect(point.subTaskVisibility).to.equal(false)
    })
  })

  describe('on deselect', function () {
    it('should blur the mark', async function() {
      const user = userEvent.setup({ delay: 'none' })
      point = pointTool.createMark({
        id: 'point1'
      })
      point.finish()
      const { rerender } = render(
        <svg>
          <Mark
            isActive={true}
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      
      await user.tab() // set focus on mark
      svgPoint = document.querySelector('g.drawingMark')
      expect(document.activeElement).to.equal(svgPoint)

      // rerender with isActive = false to trigger onDeselectMark effect
      rerender(
        <svg>
          <Mark
            isActive={false}
            label='Point 1'
            mark={point}
            onDelete={onDelete}
            onSelect={onSelect}
          >
            <Point mark={point} />
          </Mark>
        </svg>, { wrapper: withGrommetWrapper() }
      )
      
      expect(document.activeElement).not.to.equal(svgPoint)
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
              isActive={true} // key events only handled when active
              label='Point 1'
              mark={point}
              onDelete={onDelete}
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
              isActive={true} // key events only handled when active
              label='Point 1'
              mark={point}
              onDelete={onDelete}
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

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.equal(true)
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
              isActive={true} // key events only handled when active
              label='Point 1'
              mark={point}
              onDelete={onDelete}
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

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.equal(true)
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
              isActive={true} // key events only handled when active
              label='Point 1'
              mark={point}
              onDelete={onDelete}
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

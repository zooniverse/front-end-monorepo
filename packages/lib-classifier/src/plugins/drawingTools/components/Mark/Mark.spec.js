import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
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
  const onFinish = sinon.stub()
  const onSelect = sinon.stub()
  let svgPoint

  describe('default behaviour', function () {
    before(function () {
      sinon.stub(window, 'scrollTo')
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
      svgPoint = screen.getByLabelText('Point 1')
    })

    after(function () {
      onFinish.resetHistory()
      onSelect.resetHistory()
      window.scrollTo.restore()
    })

    it('should render a child drawing tool', function () {
      expect(svgPoint).to.exist()
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
      expect(onSelect).to.have.been.calledOnce()
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
        expect(onDelete).to.have.been.calledOnce()
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
        await user.keyboard('{Enter}')
        await when(() => point.subTaskVisibility)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', async function () {
        expect(onFinish).to.have.been.calledOnce()
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
        await user.keyboard('{ }')
        await when(() => point.subTaskVisibility)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', async function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', async function () {
        expect(onFinish).to.have.been.calledOnce()
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
        expect(onDelete).to.not.have.been.called()
      })

      it('should not call onFinish', function () {
        expect(onFinish).to.not.have.been.called()
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
      expect(point.subTaskVisibility).to.be.false()
      await user.click(svgPoint)
      expect(point.subTaskVisibility).to.be.true()
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

  describe('when the active mark is finished', function () {
    function markWrapper(mark) {
      return (
        <Grommet theme={zooTheme}>
          <svg>
            <Mark
              isActive
              label='Point 1'
              mark={mark}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={mark} />
            </Mark>
          </svg>
        </Grommet>
      )
    }

    describe('when subtasks are closed', function () {
      let newMark

      before(function () {
        newMark = pointTool.createMark()
        newMark.setSubTaskVisibility(false)
        newMark.finish()
        render(markWrapper(newMark))
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtask popup', async function () {
        expect(newMark.subTaskVisibility).to.be.true()
      })
    })
  })

  describe('when subtasks are closed', function () {
    function markWrapper(mark) {
      return (
        <Grommet theme={zooTheme}>
          <svg>
            <Mark
              isActive
              label='Point 1'
              mark={mark}
              onDelete={onDelete}
              onFinish={onFinish}
              onSelect={onSelect}
            >
              <Point mark={mark} />
            </Mark>
          </svg>
        </Grommet>
      )
    }

    let newMark, svgPoint

    before(function () {
      sinon.stub(window, 'scrollTo')
      newMark = pointTool.createMark()
      newMark.setSubTaskVisibility(true)
      newMark.finish()
      render(markWrapper(newMark))
      newMark.setSubTaskVisibility(false)
      svgPoint = screen.getByLabelText('Point 1')
    })

    after(function () {
      onFinish.resetHistory()
      window.scrollTo.resetHistory()
    })

    it('should focus the active mark', function () {
      expect(document.activeElement).to.equal(svgPoint)
    })

    it('should preserve the window scroll position', function () {
      expect(window.scrollTo).to.have.been.calledOnce()
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

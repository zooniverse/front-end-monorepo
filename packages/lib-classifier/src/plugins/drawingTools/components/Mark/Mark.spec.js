import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'chai'
import sinon from 'sinon'
import { EllipseTool, PointTool } from '@plugins/drawingTools/models/tools'
import { Ellipse, Mark, Point } from '@plugins/drawingTools/components'

describe('Drawing tools > Mark', function () {
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
  let wrapper
  let svgPoint

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
      </svg>
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
        </svg>
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
          </svg>
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
          </svg>
        )
        point.setSubTaskVisibility(false)
        await user.tab()
        await user.keyboard('{Enter}')
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', function () {
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
          </svg>
        )
        point.setSubTaskVisibility(false)
        await user.tab()
        await user.keyboard('{ }')
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should open the subtasks popup', function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', function () {
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
          </svg>
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
        </svg>
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
        </svg>
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
        </svg>
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
      )
    }

    describe('when subtasks are closed', function () {
      let newMark

      before(function () {
        window.scrollTo.resetHistory()
        newMark = pointTool.createMark()
        newMark.setSubTaskVisibility(false)
        newMark.finish()
        render(markWrapper(newMark))
      })

      after(function () {
        onFinish.resetHistory()
        window.scrollTo.resetHistory()
      })

      it('should open the subtask popup', function () {
        expect(newMark.subTaskVisibility).to.be.true()
      })
    })
  })

  describe('when subtasks are closed', function () {
    function markWrapper(mark) {
      return (
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
      )
    }

    let newMark, svgPoint

    before(function () {
      window.scrollTo.resetHistory()
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
})

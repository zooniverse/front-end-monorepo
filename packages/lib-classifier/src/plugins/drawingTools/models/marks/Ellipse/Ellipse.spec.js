import { EllipseTool } from '@plugins/drawingTools/models/tools'

const ellipse = {
  color: '#ff0000',
  label: 'An Ellipse',
  type: 'ellipse'
}

const ANGLE_FRICTION_RADIUS = 40

describe('Model > DrawingTools > Marks > Ellipse', function () {
  function markAt({ rx, ry, angle }) {
    const tool = EllipseTool.create(ellipse)
    const mark = tool.createMark({ id: 'ellipse1' })
    mark.initialPosition({ x: 100, y: 100 })
    mark.setCoordinates({ x: 100, y: 100, rx, ry, angle })
    return mark
  }

  describe('resizeByAxis', function () {
    it('should ignore a drag that has not moved', function () {
      const mark = markAt({ rx: 100, ry: 10, angle: 30 })
      mark.resizeByAxis({ dx: 0, dy: 0, axis: 'major' })
      expect(mark.rx).to.equal(100)
      expect(mark.angle).to.equal(30)
    })

    it('should ignore an unknown axis', function () {
      const mark = markAt({ rx: 100, ry: 10, angle: 30 })
      mark.resizeByAxis({ dx: 10, dy: 10, axis: 'diagonal' })
      expect(mark.rx).to.equal(100)
      expect(mark.ry).to.equal(10)
      expect(mark.angle).to.equal(30)
    })

    it('should turn the shorter way round', function () {
      const mark = markAt({ rx: 100, ry: 10, angle: 179 })
      const dy = -2 * 100 * Math.sin((179 * Math.PI) / 180)
      mark.resizeByAxis({ dx: 0, dy, axis: 'major' })
      expect(mark.angle).to.be.closeTo(-179, 1e-9)
    })

    it('should grant more of the same turn the further out the handle is', function () {
      const near = markAt({ rx: 100, ry: 10, angle: 0 })
      const far = markAt({ rx: 100, ry: 100, angle: 0 })
      near.resizeByAxis({ dx: 10, dy: 0, axis: 'minor' })
      far.resizeByAxis({ dx: 100, dy: 0, axis: 'minor' })
      expect(far.angle).to.be.closeTo(45, 1e-9)
      expect(near.angle).to.be.below(far.angle)
    })

    it('should grant more of the same turn the further in it is zoomed', function () {
      const unzoomed = markAt({ rx: 100, ry: 10, angle: 0 })
      const zoomed = markAt({ rx: 100, ry: 10, angle: 0 })
      unzoomed.resizeByAxis({ dx: 10, dy: 0, axis: 'minor', scale: 1 })
      zoomed.resizeByAxis({ dx: 10, dy: 0, axis: 'minor', scale: 4 })
      expect(zoomed.angle).to.be.above(unzoomed.angle)
    })

    describe('the major axis handle', function () {
      it('should grow rx by the drag, not by the distance to the pointer', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 10, dy: 0, axis: 'major' })
        expect(mark.rx).to.equal(110)
      })

      it('should accumulate successive drags', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 5, dy: 0, axis: 'major' })
        mark.resizeByAxis({ dx: 5, dy: 0, axis: 'major' })
        expect(mark.rx).to.equal(110)
      })

      it('should leave ry alone', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 10, dy: 0, axis: 'major' })
        expect(mark.ry).to.equal(10)
      })

      it('should take the whole turn, being beyond the friction radius', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 0, dy: 100, axis: 'major' })
        expect(mark.angle).to.be.closeTo(45, 1e-9)
        expect(mark.rx).to.be.closeTo(Math.sqrt(2) * 100, 1e-9)
      })
    })

    describe('the minor axis handle', function () {
      it('should grow ry by the drag, not by the distance to the pointer', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 0, dy: -10, axis: 'minor' })
        expect(mark.ry).to.equal(20)
      })

      it('should leave rx alone', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        mark.resizeByAxis({ dx: 0, dy: -10, axis: 'minor' })
        expect(mark.rx).to.equal(100)
      })

      it('should take part of the turn, being inside the friction radius', function () {
        const mark = markAt({ rx: 100, ry: 10, angle: 0 })
        const radius = Math.sqrt(200)
        mark.resizeByAxis({ dx: 10, dy: 0, axis: 'minor' })
        expect(mark.ry).to.be.closeTo(radius, 1e-9)
        expect(mark.angle).to.be.closeTo(45 * (radius / ANGLE_FRICTION_RADIUS), 1e-9)
        expect(mark.angle).to.be.below(45)
      })
    })
  })
})

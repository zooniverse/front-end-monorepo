import getInteractionStates from './getInteractionStates'

describe('helpers > getInteractionStates', function () {
  describe('when the LineString tool is active and measure mode is off', function () {
    it('activates Draw and Modify and Select; disables Translate, ModifyUncertainty, MoveToClick, Measure', function () {
      expect(getInteractionStates({ activeToolType: 'LineString', isMeasureModeActive: false })).to.deep.equal({
        measure: false,
        lineStringDraw: true,
        lineStringModify: true,
        select: true,
        translate: false,
        modifyUncertainty: false,
        moveToClick: false
      })
    })
  })

  describe('when measure mode is on (any active tool)', function () {
    it('activates Measure and disables every feature interaction', function () {
      expect(getInteractionStates({ activeToolType: 'LineString', isMeasureModeActive: true })).to.deep.equal({
        measure: true,
        lineStringDraw: false,
        lineStringModify: false,
        select: false,
        translate: false,
        modifyUncertainty: false,
        moveToClick: false
      })
    })

    it('disables every feature interaction even when the tool is not LineString', function () {
      expect(getInteractionStates({ activeToolType: 'Point', isMeasureModeActive: true })).to.deep.equal({
        measure: true,
        lineStringDraw: false,
        lineStringModify: false,
        select: false,
        translate: false,
        modifyUncertainty: false,
        moveToClick: false
      })
    })
  })

  describe('when the active tool is not LineString and measure mode is off', function () {
    it('enables Select and the point-feature interactions; disables Draw, Modify, Measure', function () {
      expect(getInteractionStates({ activeToolType: 'Point', isMeasureModeActive: false })).to.deep.equal({
        measure: false,
        lineStringDraw: false,
        lineStringModify: false,
        select: true,
        translate: true,
        modifyUncertainty: true,
        moveToClick: true
      })
    })

    it('handles an undefined active tool type the same as a non-LineString tool', function () {
      expect(getInteractionStates({ activeToolType: undefined, isMeasureModeActive: false })).to.deep.equal({
        measure: false,
        lineStringDraw: false,
        lineStringModify: false,
        select: true,
        translate: true,
        modifyUncertainty: true,
        moveToClick: true
      })
    })
  })
})

import getDrawingModeUpdates from './getDrawingModeUpdates'

describe('helpers > getDrawingModeUpdates', function () {
  describe('when the active tool is LineString and measure mode is off', function () {
    it('activates Draw, disables feature interactions, and clears selection', function () {
      expect(getDrawingModeUpdates('LineString', false)).to.deep.equal({
        lineStringDraw: true,
        featureInteractions: 'disable',
        clearSelection: true
      })
    })
  })

  describe('when the active tool is LineString and measure mode is on', function () {
    it('deactivates Draw and lets syncMeasureMode retain ownership of feature interactions (measure wins)', function () {
      expect(getDrawingModeUpdates('LineString', true)).to.deep.equal({
        lineStringDraw: false,
        featureInteractions: 'skip',
        clearSelection: false
      })
    })
  })

  describe('when the active tool is not LineString', function () {
    it('deactivates Draw, enables feature interactions, and does not clear selection (measure off)', function () {
      expect(getDrawingModeUpdates('Point', false)).to.deep.equal({
        lineStringDraw: false,
        featureInteractions: 'enable',
        clearSelection: false
      })
    })

    it('deactivates Draw but skips feature interactions so syncMeasureMode retains ownership (measure on)', function () {
      expect(getDrawingModeUpdates('Point', true)).to.deep.equal({
        lineStringDraw: false,
        featureInteractions: 'skip',
        clearSelection: false
      })
    })

    it('handles an undefined active tool type the same way as a non-LineString tool', function () {
      expect(getDrawingModeUpdates(undefined, false)).to.deep.equal({
        lineStringDraw: false,
        featureInteractions: 'enable',
        clearSelection: false
      })
    })
  })
})

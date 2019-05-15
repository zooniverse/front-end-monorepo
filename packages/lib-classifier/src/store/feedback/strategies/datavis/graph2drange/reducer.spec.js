import { expect } from 'chai'
import graph2dRangeReducer from './reducer'

describe('feedback drawing graph2dRange reducer', function () {
  const ruleWithStrings = {
    hideSubjectViewer: false,
    id: '1234',
    strategy: 'graph2dRange',
    successEnabled: true,
    successMessage: 'Success!',
    tolerance: '0.25',
    width: '0.1',
    x: '15'
  }

  const ruleWithNums = {
    hideSubjectViewer: false,
    id: '1234',
    strategy: 'graph2dRange',
    successEnabled: true,
    successMessage: 'Success!',
    tolerance: 0.25,
    width: 0.1,
    x: 15
  }

  const annotationSuccess = {
    width: 0.1,
    x: 15
  }

  const annotationTolerance = {
    width: 0.2,
    x: 14.9
  }

  const annotationFailure = {
    width: 0.6,
    x: 15.1
  }

  describe('with rule data as strings', function () {
    it('should return result with failure', function () {
      expect(graph2dRangeReducer(ruleWithStrings, [annotationFailure])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: false,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [],
        tolerance: '0.25',
        width: '0.1',
        x: '15'
      })
    })

    it('should return result with success', function () {
      expect(graph2dRangeReducer(ruleWithStrings, [annotationSuccess])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationSuccess],
        tolerance: '0.25',
        width: '0.1',
        x: '15'
      })
    })

    it('should return result within tolerance', function () {
      expect(graph2dRangeReducer(ruleWithStrings, [annotationTolerance])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationTolerance],
        tolerance: '0.25',
        width: '0.1',
        x: '15'
      })
    })

    it('should return result with success with successful and failed annotation', function () {
      expect(graph2dRangeReducer(ruleWithStrings, [annotationSuccess, annotationTolerance, annotationFailure])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationSuccess, annotationTolerance],
        tolerance: '0.25',
        width: '0.1',
        x: '15'
      })
    })
  })

  describe('with rule data as numbers', function () {
    it('should return result with failure', function () {
      expect(graph2dRangeReducer(ruleWithNums, [annotationFailure])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: false,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [],
        tolerance: 0.25,
        width: 0.1,
        x: 15
      })
    })

    it('should return result with success', function () {
      expect(graph2dRangeReducer(ruleWithNums, [annotationSuccess])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationSuccess],
        tolerance: 0.25,
        width: 0.1,
        x: 15
      })
    })

    it('should return result within tolerance', function () {
      expect(graph2dRangeReducer(ruleWithNums, [annotationTolerance])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationTolerance],
        tolerance: 0.25,
        width: 0.1,
        x: 15
      })
    })
 
    it('should return result with success with successful and failed annotation', function () {
      expect(graph2dRangeReducer(ruleWithNums, [annotationSuccess, annotationTolerance, annotationFailure])).to.deep.equal({
        hideSubjectViewer: false,
        id: '1234',
        strategy: 'graph2dRange',
        success: true,
        successEnabled: true,
        successMessage: 'Success!',
        successfulClassifications: [annotationSuccess, annotationTolerance],
        tolerance: 0.25,
        width: 0.1,
        x: 15
      })
    })
  })
})

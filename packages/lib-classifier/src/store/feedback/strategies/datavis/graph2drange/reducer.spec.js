import { expect } from 'chai'
import graph2dRangeReducer from './reducer'

describe('feedback drawing graph2dRange reducer', function () {
  const rule = {
    hideSubjectViewer: false,
    id: '1234',
    strategy: 'graph2dRange',
    successEnabled: true,
    successMessage: 'Success!',
    tolerance: '1',
    width: '2',
    x: '15'
  }

  const annotationSuccess = {
    width: 2,
    x: 15
  }

  const annotationTolerance = {
    width: 1.2,
    x: 14.8
  }

  const annotationFailure = {
    width: 2.2,
    x: 16
  }

  it('should return result with failure', function () {
    expect(graph2dRangeReducer(rule, [annotationFailure])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2dRange',
      success: false,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [],
      tolerance: '1',
      width: '2',
      x: '15'
    })
  })

  it('should return result with success', function () {
    expect(graph2dRangeReducer(rule, [annotationSuccess])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2dRange',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationSuccess],
      tolerance: '1',
      width: '2',
      x: '15'
    })
  })

  it('should return result within tolerance', function () {
    expect(graph2dRangeReducer(rule, [annotationTolerance])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2dRange',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationTolerance],
      tolerance: '1',
      width: '2',
      x: '15'
    })
  })

  it('should return result with success with successful and failed annotation', function () {
    expect(graph2dRangeReducer(rule, [annotationSuccess, annotationTolerance, annotationFailure])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'graph2dRange',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationSuccess, annotationTolerance],
      tolerance: '1',
      width: '2',
      x: '15'
    })
  })
})

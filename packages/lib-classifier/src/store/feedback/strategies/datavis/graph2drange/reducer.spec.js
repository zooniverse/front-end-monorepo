import graph2dRangeReducer from './reducer'

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

function feedbackGenerator (newProps) {
  return Object.assign({}, ruleWithStrings, newProps)
}

const ruleWithNumbers = feedbackGenerator({
  tolerance: 0.25,
  width: 0.1,
  x: 15
})

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

function testFeedbackRule (rule) {
  it('should return result with failure', function () {
    expect(graph2dRangeReducer(rule, [annotationFailure])).to.deep.equal(feedbackGenerator({
      success: false,
      successfulClassifications: [],
      ...rule
    }))
  })

  it('should return result with success', function () {
    expect(graph2dRangeReducer(rule, [annotationSuccess])).to.deep.equal(feedbackGenerator({
      success: true,
      successfulClassifications: [annotationSuccess],
      ...rule
    }))
  })

  it('should return result within tolerance', function () {
    expect(graph2dRangeReducer(rule, [annotationTolerance])).to.deep.equal(feedbackGenerator({
      success: true,
      successfulClassifications: [annotationTolerance],
      ...rule
    }))
  })

  it('should return result with success with successful and failed annotation', function () {
    expect(graph2dRangeReducer(rule, [annotationSuccess, annotationTolerance, annotationFailure])).to.deep.equal(feedbackGenerator({
      success: true,
      successfulClassifications: [annotationSuccess, annotationTolerance],
      ...rule
    }))
  })
}

describe('feedback drawing graph2dRange reducer', function () {
  describe('with rule data as strings', function () {
    testFeedbackRule(ruleWithStrings)
  })

  describe('with rule data as numbers', function () {
    testFeedbackRule(ruleWithNumbers)
  })
})

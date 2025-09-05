import columnReducer from './reducer'

describe('feedback drawing column reducer', function () {
  const rule = {
    hideSubjectViewer: false,
    id: '1234',
    strategy: 'column',
    successEnabled: true,
    successMessage: 'Success!',
    tolerance: '50',
    width: '100',
    x: '300'
  }

  const annotationSuccess = {
    width: 50,
    x: 325
  }

  const annotationTolerance = {
    width: 50,
    x: 375
  }

  const annotationFailure = {
    width: 100,
    x: 600
  }

  it('should return result with failure', function () {
    expect(columnReducer(rule, [annotationFailure])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      success: false,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [],
      tolerance: '50',
      width: '100',
      x: '300'
    })
  })

  it('should return result with success', function () {
    expect(columnReducer(rule, [annotationSuccess])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationSuccess],
      tolerance: '50',
      width: '100',
      x: '300'
    })
  })

  it('should return result within tolerance', function () {
    expect(columnReducer(rule, [annotationTolerance])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationTolerance],
      tolerance: '50',
      width: '100',
      x: '300'
    })
  })

  it('should return result with success with successful and failed annotation', function () {
    expect(columnReducer(rule, [annotationSuccess, annotationTolerance, annotationFailure])).to.deep.equal({
      hideSubjectViewer: false,
      id: '1234',
      strategy: 'column',
      success: true,
      successEnabled: true,
      successMessage: 'Success!',
      successfulClassifications: [annotationSuccess, annotationTolerance],
      tolerance: '50',
      width: '100',
      x: '300'
    })
  })
})

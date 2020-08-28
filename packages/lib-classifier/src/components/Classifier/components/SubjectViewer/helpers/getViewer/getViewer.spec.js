import getViewer from './getViewer'

import DataImageViewer from '../../components/DataImageViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import LightCurveViewer from '../../components/LightCurveViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import VariableStarViewer from '../../components/VariableStarViewer'

describe('Helpers > getViewer', function () {
  it('should return the `SingleImageViewer` component if passed `singleImage`', function () {
    expect(getViewer('singleImage')).to.equal(SingleImageViewer)
  })

  it('should return the `MultiFrameViewer` component if passed `multiFrame`', function () {
    expect(getViewer('multiFrame')).to.equal(MultiFrameViewer)
  })

  it('should return the `DataImageViewer` component if passed `dataImage`', function () {
    expect(getViewer('dataImage')).to.equal(DataImageViewer)
  })

  it('should return the `SubjectGroupViewer` component if passed `subjectGroup`', function () {
    expect(getViewer('subjectGroup')).to.equal(SubjectGroupViewer)
  })

  it('should return the `LightCurveViewer` component if passed `lightCurve`', function () {
    expect(getViewer('lightCurve')).to.equal(LightCurveViewer)
  })

  it('should return the `VariableStarViewer` component if passed `variableStar`', function () {
    expect(getViewer('variableStar')).to.equal(VariableStarViewer)
  })

  it('should return null if it can\'t match a viewer', function () {
    expect(getViewer('foobar')).to.equal(null)
  })
})

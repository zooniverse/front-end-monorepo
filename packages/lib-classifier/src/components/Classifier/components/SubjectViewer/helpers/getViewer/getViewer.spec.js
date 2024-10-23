import getViewer from './getViewer'

import DataImageViewer from '../../components/DataImageViewer'
import JSONDataViewer from '../../components/JSONDataViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'
import SingleImageViewer from '../../components/SingleImageViewer'
import SingleTextViewer from '../../components/SingleTextViewer'
import SubjectGroupViewer from '../../components/SubjectGroupViewer'

describe('Helpers > getViewer', () => {
  it('should return the `SingleImageViewer` component if passed `singleImage`', async () => {
    const viewer = await getViewer('singleImage')
    expect(viewer.type.render).to.equal(SingleImageViewer.type.render)
  })

  it('should return the `SingleTextViewer` component if passed `singleText`', async () => {
    const viewer = await getViewer('singleText')
    expect(viewer.type.render).to.equal(SingleTextViewer.type.render)
  })

  it('should return the `MultiFrameViewer` component if passed `multiFrame`', async () => {
    const viewer = await getViewer('multiFrame')
    expect(viewer.type.render).to.equal(MultiFrameViewer.type.render)
  })

  it('should return the `DataImageViewer` component if passed `dataImage`', async () => {
    const viewer = await getViewer('dataImage')
    expect(viewer.type.render).to.equal(DataImageViewer.type.render)
  })

  it('should return the `SubjectGroupViewer` component if passed `subjectGroup`', async () => {
    const viewer = await getViewer('subjectGroup')
    expect(viewer.type.render).to.equal(SubjectGroupViewer.type.render)
  })

  it('should return the `JSONDataViewer` component if passed `lightCurve`', async () => {
    const viewer = await getViewer('lightCurve')
    expect(viewer.type.render).to.equal(JSONDataViewer.type.render)
  })

  it('should return the `JSONDataViewer` component if passed `variableStar`', async () => {
    const viewer = await getViewer('variableStar')
    expect(viewer.type.render).to.equal(JSONDataViewer.type.render)
  })

  it('should return null if it can\'t match a viewer', async () => {
    const content = await getViewer('foobar')
    expect(content).to.equal(null)
  })
})

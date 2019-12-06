import getViewer from './getViewer'

import SingleImageViewer from '../../components/SingleImageViewer'
import MultiFrameViewer from '../../components/MultiFrameViewer'

describe('Helpers > getViewer', function () {
  it('should return the `SingleImageViewer` component if passed `singleImage`', function () {
    expect(getViewer('singleImage')).to.equal(SingleImageViewer)
  })

  it('should return the `MultiFrameViewer` component if passed `multiFrame`', function () {
    expect(getViewer('multiFrame')).to.equal(MultiFrameViewer)
  })

  it('should return null if it can\'t match a viewer', function () {
    expect(getViewer('foobar')).to.equal(null)
  })
})

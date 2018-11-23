import getViewer from './getViewer'

import SingleImageViewer from '../../components/SingleImageViewer'

describe('Helpers > getViewer', function () {
  it('should return the `SingleImageViewer` component if passed `singleImage`', function () {
    expect(getViewer('singleImage')).to.equal(SingleImageViewer)
  })

  it('should return null if it can\'t match a viewer', function () {
    expect(getViewer('foobar')).to.equal(null)
  })
})

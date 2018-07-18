import getViewer from './getViewer'

import SingleImageViewer from '../../components/SingleImageViewer'

describe('Helpers > getViewer', function () {
  it('should return the `SingleImageViewer` component if passed `singleImage`', function () {
    const single = getViewer('singleImage')
    expect(single).to.equal(SingleImageViewer)
  })
})

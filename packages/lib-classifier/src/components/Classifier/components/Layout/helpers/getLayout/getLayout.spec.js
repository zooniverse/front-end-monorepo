import getLayout from './getLayout'

import DefaultLayout from '../../components/DefaultLayout'

describe('Helpers > getLayout', function () {
  it('should return the `DefaultLayout` component if passed `default`', function () {
    expect(getLayout('default')).to.equal(DefaultLayout)
  })

  it('should return null if it can\'t match a layout', function () {
    expect(getLayout('foobar')).to.equal(null)
  })
})

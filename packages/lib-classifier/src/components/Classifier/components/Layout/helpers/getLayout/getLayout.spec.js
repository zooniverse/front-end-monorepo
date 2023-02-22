import getLayout from './getLayout'

import { DefaultLayout, MaxWidth } from '../../components'

describe('Helpers > getLayout', function () {
  it('should return the `MaxWidth` component if passed `default`', function () {
    expect(getLayout('default')).to.equal(MaxWidth)
  })

  it('should return the old `DefaultLayout` component if passed `noMaxWidth`', function () {
    expect(getLayout('noMaxWidth')).to.equal(DefaultLayout)
  })

  it('should return the default layout if it can\'t match a layout', function () {
    expect(getLayout('foobar')).to.equal(MaxWidth)
  })
})

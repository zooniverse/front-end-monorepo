import getLayout from './getLayout'

import defaultLayout, * as layouts from '../../components'

describe('Helpers > getLayout', function () {
  it('should return the `MaxWidth` component if passed `maxWidth`', function () {
    expect(getLayout('maxWidth')).to.equal(layouts.maxWidth)
  })

  it('should return the `NoMaxWidth` component if passed `noMaxWidth`', function () {
    expect(getLayout('noMaxWidth')).to.equal(layouts.noMaxWidth)
  })

  it('should return the `MaxWidth` layout if it can\'t match a layout', function () {
    expect(getLayout('foobar')).to.equal(defaultLayout)
  })
})

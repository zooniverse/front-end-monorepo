import getLayout from './getLayout'

import { NoMaxWidth, MaxWidth } from '../../components'

describe('Helpers > getLayout', function () {
  it('should return the `MaxWidth` component if passed `maxWidth`', function () {
    expect(getLayout('maxWidth')).to.equal(MaxWidth)
  })

  it('should return the `NoMaxWidth` component if passed `noMaxWidth`', function () {
    expect(getLayout('noMaxWidth')).to.equal(NoMaxWidth)
  })

  it('should return the `MaxWidth` layout if it can\'t match a layout', function () {
    expect(getLayout('foobar')).to.equal(MaxWidth)
  })
})

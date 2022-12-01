import { shallow } from 'enzyme'

import withThemeContext from './withThemeContext'

describe('withThemeContext', function () {
  function StubComponent () {
    return <p>Hello</p>
  }

  let wrapper
  const THEME = {}
  const WithThemeContext = withThemeContext(StubComponent, THEME)

  before(function () {
    wrapper = shallow(<WithThemeContext />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })

  it('should render the component passed as the first argument', function () {
    expect(wrapper.find(StubComponent)).to.have.lengthOf(1)
  })

  it('should pass the theme argument as the `value` prop to a Grommet `ThemeContext`', function () {
    // Note that as `ThemeContext` returns a `ContextConsumer`, we can't assert
    // that we're actually getting a `ThemeContext` component rendered
    expect(wrapper.prop('value')).to.equal(THEME)
  })
})

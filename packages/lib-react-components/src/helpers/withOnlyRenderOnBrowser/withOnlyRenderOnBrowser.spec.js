import { shallow } from 'enzyme'
import { Layer } from 'grommet'
import withOnlyRenderOnBrowser from './withOnlyRenderOnBrowser';

describe('Helper > withOnlyRenderOnBrowser', function () {
  let wrapper, wrappedComponent
  function StubComponent () {
    return (
      <Layer>
        <div>
          Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
        </div>
      </Layer>
    )
  }

  const OnlyRenderOnBrowser = withOnlyRenderOnBrowser(StubComponent)

  describe('when rendering server side', function () {
    before(function () {
      // componentDidMount is only run client side
      wrapper = shallow(<OnlyRenderOnBrowser />, { disableLifecycleMethods: true })
      wrappedComponent = wrapper.find(StubComponent)
    })

    it('should render null', function () {
      expect(wrapper.type()).to.be.null()
    })
  })

  describe('when rendering client side', function () {
    before(function () {
      wrapper = shallow(<OnlyRenderOnBrowser />)
      wrappedComponent = wrapper.find(StubComponent)
    })

    it('should render the wrapped component', function () {
      expect(wrappedComponent).to.have.lengthOf(1)
    })
  })
})

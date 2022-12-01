import { shallow } from 'enzyme'
import sinon from 'sinon'
import MetaToolsButton from '../MetaToolsButton'

import { FavouritesButton } from './FavouritesButton'
import HeartIcon from './HeartIcon'

describe('Component > FavouritesButton', function () {
  let wrapper
  const mockTheme = {
    global: {
      colors: {
        statusColors: {
          error: 'status-error'
        }
      }
    }
  }
  before(function () {
    wrapper = shallow(<FavouritesButton theme={mockTheme} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display an empty icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<HeartIcon color='dark-5' fill='none' size='15px' />)
  })

  it('should not be checked', function () {
    const checked = wrapper.prop('aria-checked')
    expect(checked).to.be.false()
  })

  describe('on click', function () {
    let onClickStub

    before(function () {
      onClickStub = sinon.stub()
      wrapper = shallow(<FavouritesButton theme={mockTheme} checked={false} onClick={onClickStub} />)
    })

    afterEach(function () {
      onClickStub.resetHistory()
    })

    it('should toggle favourites on', function () {
      wrapper.simulate('click')
      const icon = wrapper.prop('icon')
      expect(icon.props.fill).to.equal(mockTheme.global.colors.statusColors.error)
    })

    it('should toggle favourites off', function () {
      wrapper.simulate('click')
      const icon = wrapper.prop('icon')
      expect(icon.props.fill).to.equal('none')
    })

    it('should call props.onClick', function () {
      wrapper.simulate('click')
      expect(onClickStub).to.have.been.calledOnce()
    })
  })

  describe('when checked', function () {
    before(function () {
      wrapper = shallow(<FavouritesButton theme={mockTheme} checked />)
    })

    it('should display a filled icon', function () {
      const button = wrapper.find(MetaToolsButton)
      const { icon } = button.props()
      const fill = mockTheme.global.colors.statusColors.error
      expect(icon).to.deep.equal(<HeartIcon color='dark-5' fill={fill} size='15px' />)
    })

    it('should be checked', function () {
      const checked = wrapper.find(MetaToolsButton).prop('aria-checked')
      expect(checked).to.be.true()
    })
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <FavouritesButton
        disabled
        onClick={onClick}
      />
    )

    it('should not be clickable', function () {
      wrapper.find(MetaToolsButton).simulate('click')
      expect(onClick).to.not.have.been.called()
    })
  })
})

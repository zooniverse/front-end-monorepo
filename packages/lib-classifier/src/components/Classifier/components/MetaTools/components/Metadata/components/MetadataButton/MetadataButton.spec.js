import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { MetaToolsButton } from '@zooniverse/react-components'
import MetadataButton from './MetadataButton'
import InfoIcon from './InfoIcon'

describe('MetadataButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetadataButton />)
    expect(wrapper).to.be.ok()
  })

  it('should display an info icon', function () {
    const wrapper = shallow(<MetadataButton />)
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<InfoIcon color='dark-5' size='15px' />)
  })

  it('should call props.onClick when button is clicked', function () {
    const onClickSpy = sinon.spy()
    const wrapper = shallow(<MetadataButton onClick={onClickSpy} />)
    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClickSpy).to.have.been.calledOnce()
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const onClickSpy = sinon.spy()
      const wrapper = mount(
        <MetadataButton
          disabled
          onClick={onClickSpy}
        />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
      wrapper.find('button').simulate('click')
      expect(onClickSpy).to.not.have.been.called()
    })
  })
})

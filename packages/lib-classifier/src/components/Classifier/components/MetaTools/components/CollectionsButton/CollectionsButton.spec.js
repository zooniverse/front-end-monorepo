import { shallow } from 'enzyme'
import sinon from 'sinon'
import { MetaToolsButton } from '@zooniverse/react-components'

import CollectionsButton from './CollectionsButton'
import CollectionsIcon from './CollectionsIcon'

let wrapper

describe('Component > CollectionsButton', function () {
  before(function () {
    wrapper = shallow(<CollectionsButton />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should display a Collect icon', function () {
    const button = wrapper.find(MetaToolsButton)
    const { icon } = button.props()
    expect(icon).to.deep.equal(<CollectionsIcon color='dark-5' size='15px' />)
  })

  it('should call props.onClick on click', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <CollectionsButton
        onClick={onClick}
      />
    )

    wrapper.find(MetaToolsButton).simulate('click')
    expect(onClick).to.have.been.calledOnce()
  })

  describe('when disabled', function () {
    const onClick = sinon.stub()
    wrapper = shallow(
      <CollectionsButton
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

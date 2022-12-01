import { shallow } from 'enzyme'
import { expect } from 'chai'
import TaskNavButtons from './TaskNavButtons'
import NextButton from './components/NextButton'
import DoneButton from './components/DoneButton'
import BackButton from './components/BackButton'
import DoneAndTalkButton from './components/DoneAndTalkButton'
import ExpertOptions from './components/ExpertOptions'

const classification = { gold_standard: false }

describe('TaskNavButtons', function () {
  let wrapper

  it('should render without crashing', function () {
    wrapper = shallow(<TaskNavButtons classification={classification} />)
    expect(wrapper).to.be.ok()
  })

  it('should render ExpertOptions', function () {
    wrapper = shallow(<TaskNavButtons classification={classification} />)
    expect(wrapper.find(ExpertOptions)).to.have.lengthOf(1)
  })

  it('should render a NextButton component', function () {
    expect(wrapper.find(NextButton)).to.have.lengthOf(1)
  })

  it('should render a BackButton', function () {
    expect(wrapper.find(BackButton)).to.have.lengthOf(1)
  })

  it('should disable the Next button when disabled.', function () {
    wrapper.setProps({ disabled: true })
    expect(wrapper.find(NextButton).prop('disabled')).to.be.true()
  })

  it('should render a DoneButton component', function () {
    expect(wrapper.find(DoneButton)).to.have.lengthOf(1)
  })

  it('should render a DoneAndTalkButton component', function () {
    expect(wrapper.find(DoneAndTalkButton)).to.have.lengthOf(1)
  })

  it('should disable the Done button when disabled.', function () {
    wrapper.setProps({ disabled: true })
    expect(wrapper.find(DoneButton).prop('disabled')).to.be.true()
  })

  it('should disable the Done & Talk button when disabled.', function () {
    wrapper.setProps({ disabled: true })
    expect(wrapper.find(DoneAndTalkButton).prop('disabled')).to.be.true()
  })
})

import { shallow } from 'enzyme'
import sinon from 'sinon'
import SubTaskPopupContainer from './SubTaskPopupContainer'
import SubTaskPopup from './SubTaskPopup'

describe('Component > SubTaskPopupContainer', function () {
  let wrapper

  it('should render without crashing', function () {
    wrapper = shallow(<SubTaskPopupContainer />)
    expect(wrapper).to.be.ok()
  })

  it('should render nothing when there is no active mark', function () {
    wrapper = shallow(<SubTaskPopupContainer />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render nothing when an active mark subTaskVisibility is false', function () {
    const activeMark = { id: 'mark1', subTaskVisibility: false }
    wrapper = shallow(<SubTaskPopupContainer activeMark={activeMark} />)
    expect(wrapper.html()).to.be.null()
  })

  it('should render a SubTaskPopup', function () {
    const activeMark = { id: 'mark1', subTaskVisibility: true }
    wrapper = shallow(<SubTaskPopupContainer activeMark={activeMark} />)
    expect(wrapper.find(SubTaskPopup)).to.have.lengthOf(1)
  })

  it('should pass the activeMark to the SubTaskPopup', function () {
    expect(wrapper.find(SubTaskPopup).props().activeMark).to.deep.equal({ id: 'mark1', subTaskVisibility: true })
  })
})
import { shallow } from 'enzyme'

import ClassifyPageContainer from './ClassifyPageContainer'
import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'

let wrapper
let componentWrapper

describe('Component > ClassifyPageContainer', function () {
  before(function () {
    wrapper = shallow(<ClassifyPageContainer />)
    componentWrapper = wrapper.find(ClassifyPage)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ClassifyPage` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should render the `CollectionsModal` component', function () {
    expect(wrapper.find(CollectionsModal)).to.have.lengthOf(1)
  })

  describe('on subject reset', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<ClassifyPageContainer subjectID="12345" />)
    })

    it('should clear the active subject', function () {
      const { onSubjectReset, subjectID } = wrapper.find(ClassifyPage).props()
      expect(subjectID).to.equal('12345')
      onSubjectReset()
      const newSubjectID = wrapper.find(ClassifyPage).prop('subjectID')
      expect(newSubjectID).to.be.undefined()
    })
  })
})

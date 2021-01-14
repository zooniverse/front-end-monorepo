import { shallow } from 'enzyme'
import sinon from 'sinon'
import WorkflowSelector from '@shared/components/WorkflowSelector'
import SubjectSetPicker from '@shared/components/SubjectSetPicker'

import WorkflowMenu from './WorkflowMenu'

describe('Component > Hero > WorkflowMenu', function () {
  let wrapper

  const WORKFLOWS = [
    {
      completeness: 0.65,
      default: false,
      displayName: 'The Family and the Fishing Net',
      grouped: true,
      id: '12345'
    },
    {
      completeness: 0,
      default: false,
      displayName: 'Games Without Frontiers',
      id: '7890'
    },
    {
      completeness: 0.99,
      default: false,
      displayName: 'Shock The Monkey',
      id: '5678'
    }
  ]

  beforeEach(function () {
    wrapper = shallow(<WorkflowMenu workflows={WORKFLOWS} />)
  })

  it('should show a workflow selector', function () {
    expect(wrapper.find(WorkflowSelector)).to.have.lengthOf(1)
  })

  describe('on selecting', function () {
    let onSelect

    beforeEach(function () {
      onSelect = wrapper.find(WorkflowSelector).prop('onSelect')
    })

    describe('a grouped workflow', function () {
      it('should show a subject set picker', function () {
        onSelect( { preventDefault: sinon.stub() }, WORKFLOWS[0])
        expect(wrapper.find(SubjectSetPicker)).to.have.lengthOf(1)
      })
    })

    describe('an ordinary workflow', function () {
      it('should not show a subject set picker', function () {
        onSelect( { preventDefault: sinon.stub() }, WORKFLOWS[1])
        expect(wrapper.find(SubjectSetPicker)).to.have.lengthOf(0)
      })
    })
  })
})
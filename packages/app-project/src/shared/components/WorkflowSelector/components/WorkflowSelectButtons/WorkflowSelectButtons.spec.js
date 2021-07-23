// import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import { SpacedText } from '@zooniverse/react-components'
import WorkflowSelectButtons from './WorkflowSelectButtons'
import WorkflowSelectButton from '../WorkflowSelectButton'

xdescribe('Component > WorkflowSelector > WorkflowSelectorButtons', function () {
  it('should render without crashing', function () {
    // const { container } = render(<WorkflowSelectButtons onSelect={() => {}} />)
    // console.log('container', container)
    // expect(wrapper).to.be.ok()
  })

  describe('when there isn\'t an assigned workflow', function () {
    const workflows = [
      {
        id: '1'
      }, {
        id: '2'
      }
    ]
    it('should render a workflow select button for each workflow', function () {
      const wrapper = shallow(<WorkflowSelectButtons onSelect={() => { }} workflows={workflows} />)
      expect(wrapper.find(WorkflowSelectButton)).to.have.lengthOf(workflows.length)
    })
  })

  describe('when there is an assigned workflow', function () {
    const workflows = [
      {
        configuration: {
          level: 1
        },
        id: '1'
      }, {
        configuration: {
          level: 2
        },
        id: '2'
      }, {
        configuration: {
          level: 3
        },
        id: '3'
      }
    ]
    it('should render buttons unlocked workflows', function () {
      const wrapper = shallow(<WorkflowSelectButtons assignedWorkflowID='1' onSelect={() => { }} workflows={workflows} />)
      const parentContainer = wrapper.find(SpacedText).first().parent()
      console.log('parentContainer', parentContainer.children().length)
      expect(parentContainer.find(WorkflowSelectButton)).to.have.lengthOf(1)
    })

    it('should render buttons locked workflows', function () {
      const wrapper = shallow(<WorkflowSelectButtons assignedWorkflowID='1' onSelect={() => { }} workflows={workflows} />)
      const parentContainer = wrapper.find(SpacedText).last().parent()
      expect(parentContainer.find(WorkflowSelectButton)).to.have.lengthOf(2)
    })
  })
})
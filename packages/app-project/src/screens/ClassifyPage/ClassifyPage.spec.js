import { shallow } from 'enzyme'

import { ClassifyPage, ClassifierWrapper } from './ClassifyPage'
import FinishedForTheDay from './components/FinishedForTheDay'
import WorkflowMenuModal from './components/WorkflowMenuModal'
import ThemeModeToggle from '@components/ThemeModeToggle'
import ProjectName from '@components/ProjectName'
import YourStats from './components/YourStats'
import ConnectWithProject from '@shared/components/ConnectWithProject'
import ProjectStatistics from '@shared/components/ProjectStatistics'
import WorkflowAssignmentModal from './components/WorkflowAssignmentModal'
import asyncStates from '@zooniverse/async-states'
import { expect } from 'chai'

describe('Component > ClassifyPage', function () {
  describe('default render', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<ClassifyPage workflowFromUrl={{ id: '2345' }} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `FinishedForTheDay` component', function () {
      expect(wrapper.find(FinishedForTheDay)).to.have.lengthOf(1)
    })

    it('should render the `ProjectStatistics` component', function () {
      expect(wrapper.find(ProjectStatistics)).to.have.lengthOf(1)
    })

    it('should render the `ThemeModeToggle` component', function () {
      expect(wrapper.find(ThemeModeToggle)).to.have.lengthOf(1)
    })

    it('should render the `ProjectName` component', function () {
      expect(wrapper.find(ProjectName)).to.have.lengthOf(1)
    })

    it('should render the `YourStats` component', function () {
      expect(wrapper.find(YourStats)).to.have.lengthOf(1)
    })

    it('should render the `ConnectWithProject` component', function () {
      expect(wrapper.find(ConnectWithProject)).to.have.lengthOf(1)
    })

    it('should render the `WorkflowAssignmentModal` component', function () {
      expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(1)
    })
  })

  describe('when the app loading state is not successful', function () {
    it('should not render a WorkflowMenuModal', function () {
      const wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.loading} />)
      expect(wrapper.find(WorkflowMenuModal)).to.not.have.lengthOf(1)
    })
  })

  describe('without a selected workflow', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} />)
    })

    it('should show a workflow selector', function () {
      expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(1)
    })

    it('should not render a workflow assignment modal', function () {
      expect(wrapper.find(WorkflowAssignmentModal)).to.have.lengthOf(0)
    })
  })

  describe('with a selected workflow', function () {
    let wrapper

    before(function () {
      wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} workflowID='1234' />)
    })

    it('should not show a workflow selector', function () {
      expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(0)
    })
  })

  describe('with a grouped workflow', function () {
    describe('without a subject set', function () {
      let wrapper
      let workflows = [{
        id: '1234',
        grouped: true
      }]

      before(function () {
        wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} workflowFromUrl={workflows[0]} workflows={workflows} />)
      })

      it('should show a workflow menu', function () {
        expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(1)
      })

      it('should not pass the workflow ID to the classifier', function () {
        const classifier = wrapper.find(ClassifierWrapper)
        expect(classifier.prop('workflowID')).to.be.undefined()
      })
    })

    describe('with a subject set', function () {
      let wrapper
      let workflows = [{
        id: '1234',
        grouped: true
      }]

      before(function () {
        wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} subjectSetID='3456' workflowID='1234' workflowFromUrl={workflows[0]} workflows={workflows} />)
      })

      it('should not show a workflow menu', function () {
        expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(0)
      })

      it('should pass the workflow ID to the classifier', function () {
        const classifier = wrapper.find(ClassifierWrapper)
        expect(classifier.prop('workflowID')).to.equal('1234')
      })

      it('should pass the subject set ID to the classifier', function () {
        const classifier = wrapper.find(ClassifierWrapper)
        expect(classifier.prop('subjectSetID')).to.equal('3456')
      })
    })

    describe('with an indexed subject set', function () {
      let workflows = [{
        id: '1234',
        grouped: true,
        subjectSets: [{
          id: '3456',
          displayName: 'indexed set',
          metadata: {
            indexFields: 'title,author,date'
          }
        }]
      }]

      describe('without a subject', function () {
        let wrapper

        before(function () {
          wrapper = shallow(
            <ClassifyPage
              appLoadingState={asyncStates.success}
              subjectSetID='3456'
              workflowID='1234'
              workflowFromUrl={workflows[0]}
              workflows={workflows}
            />
          )
        })

        it('should show a workflow menu', function () {
          expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(1)
        })

        it('should not pass the workflow ID to the classifier', function () {
          const classifier = wrapper.find(ClassifierWrapper)
          expect(classifier.prop('workflowID')).to.be.undefined()
        })

        it('should not pass the subject set ID to the classifier', function () {
          const classifier = wrapper.find(ClassifierWrapper)
          expect(classifier.prop('subjectSetID')).to.be.undefined()
        })
      })

      describe('with a subject', function () {
        let wrapper

        before(function () {
          wrapper = shallow(
            <ClassifyPage
              appLoadingState={asyncStates.success}
              subjectID='5678'
              subjectSetID='3456'
              workflowID='1234'
              workflowFromUrl={workflows[0]}
              workflows={workflows}
            />
          )
        })

        it('should not show a workflow menu', function () {
          expect(wrapper.find(WorkflowMenuModal)).to.have.lengthOf(0)
        })

        it('should pass the workflow ID to the classifier', function () {
          const classifier = wrapper.find(ClassifierWrapper)
          expect(classifier.prop('workflowID')).to.equal('1234')
        })

        it('should pass the subject set ID to the classifier', function () {
          const classifier = wrapper.find(ClassifierWrapper)
          expect(classifier.prop('subjectSetID')).to.equal('3456')
        })

        it('should pass the subject ID to the classifier', function () {
          const classifier = wrapper.find(ClassifierWrapper)
          expect(classifier.prop('subjectID')).to.equal('5678')
        })
      })
    })
  })

  describe('classifier session storage', function () {
    it('should be disabled by default', function () {
      const workflows = [{
        id: '1234',
        grouped: true
      }]
      const wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} workflows={workflows} />)
      const classifier = wrapper.find(ClassifierWrapper)
      expect(classifier.prop('cachePanoptesData')).to.be.false()
    })
    it('should be enabled for prioritised workflows', function () {
      let workflows = [{
        id: '1234',
        grouped: true
      },{
        id: '3456',
        prioritized: true
      }]
      const wrapper = shallow(<ClassifyPage appLoadingState={asyncStates.success} workflows={workflows} />)
      const classifier = wrapper.find(ClassifierWrapper)
      expect(classifier.prop('cachePanoptesData')).to.be.true()
    })
  })
})

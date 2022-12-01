import { shallow } from 'enzyme'
import sinon from 'sinon'

import { SubjectFactory, SubjectSetFactory, WorkflowFactory } from '@test/factories'
import RootStore from '@store'
import stubPanoptesJs from '@test/stubPanoptesJs'

import Banners from './Banners'
import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'
import SubjectSetProgressBanner from './components/SubjectSetProgressBanner'
import UserHasFinishedWorkflowBanner from './components/UserHasFinishedWorkflowBanner'
import WorkflowIsFinishedBanner from './components/WorkflowIsFinishedBanner'

describe('Component > Banners', function () {
  let wrapper

  function buildMocks(subjectData, subjectSetData, workflowData) {
    const subjectSnapshot = SubjectFactory.build(subjectData)
    const subjectSetSnapshot = SubjectSetFactory.build(subjectSetData)
    const workflowSnapshot = WorkflowFactory.build(workflowData)
    const { panoptes } = stubPanoptesJs({
      field_guides: [],
      projects: [],
      subjects: [subjectSnapshot],
      subject_sets: [subjectSetSnapshot],
      tutorials: [],
      workflows: [workflowSnapshot]
    })
    const client = {
      panoptes,
      tutorials: {
        get: sinon.stub().callsFake(() =>
          Promise.resolve({
            body: {
              tutorials: []
            }
          })
        )
      }
    }
    const store = RootStore.create({
      subjects: {
        active: subjectSnapshot.id,
        resources: {
          [subjectSnapshot.id]: subjectSnapshot
        }
      },
      subjectSets: {
        resources: {
          [subjectSetSnapshot.id]: subjectSetSnapshot
        }
      },
      workflows: {
        active: workflowSnapshot.id,
        resources: {
          [workflowSnapshot.id]: workflowSnapshot
        }
      }
    }, {
      authClient: {
        checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null)),
        checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
      },
      client
    })
    /*
      Loading a workflow overwrites the subjects store.
      This is a workaround.
    */
    store.subjects.setResources([subjectSnapshot])
    store.subjects.setActive(subjectSnapshot.id)
    return { classifierStore: store }
  }

  describe('while the subject is loading', function () {
    before(function () {
      const mockStores = buildMocks({})
      mockStores.classifierStore.subjects.reset()
      wrapper = shallow(<Banners mockStores={mockStores} />)
    })

    it('should not render', function () {
      expect(wrapper.html()).to.be.empty()
    })
  })

  describe('default banners', function () {
    before(function () {
      const mockStores = buildMocks({})
      wrapper = shallow(<Banners mockStores={mockStores} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `AlreadySeenBanner` component', function () {
      expect(wrapper.find(AlreadySeenBanner)).to.have.lengthOf(1)
    })

    it('should render the `RetiredBanner` component', function () {
      expect(wrapper.find(RetiredBanner)).to.have.lengthOf(1)
    })

    it('should render the `UserHasFinishedWorkflowBanner` component', function () {
      expect(wrapper.find(UserHasFinishedWorkflowBanner)).to.have.lengthOf(1)
    })

    it('should render the `WorkflowIsFinishedBanner` component', function () {
      expect(wrapper.find(WorkflowIsFinishedBanner)).to.have.lengthOf(1)
    })
  })

  describe('with #priority metadata', function () {
    before(function () {
      const mockStores = buildMocks({
        metadata: {
          ['#priority']: 37
        }
      }, {
        id: '1'
      }, {
        grouped: true,
        prioritized: true,
        subjectSet: '1'
      })
      wrapper = shallow(<Banners mockStores={mockStores} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `SubjectSetProgressBanner` component', function () {
      expect(wrapper.find(SubjectSetProgressBanner)).to.have.lengthOf(1)
    })
  })

  describe('with priority metadata', function () {
    before(function () {
      const mockStores = buildMocks({
        metadata: {
          priority: 37
        }
      }, {
        id: '1'
      }, {
        grouped: true,
        prioritized: true,
        subjectSet: '1'
      })
      wrapper = shallow(<Banners mockStores={mockStores} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render the `SubjectSetProgressBanner` component', function () {
      expect(wrapper.find(SubjectSetProgressBanner)).to.have.lengthOf(1)
    })
  })
})

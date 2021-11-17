import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import ClassifyPageContainer from './ClassifyPageContainer'
import ClassifyPage from './ClassifyPage'
import CollectionsModal from '../../shared/components/CollectionsModal'
import { Provider } from 'mobx-react'
import * as Router from 'next/router'
import sinon from 'sinon'
import { expect } from 'chai'

describe('Component > ClassifyPageContainer', function () {
  let wrapper
  let componentWrapper
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

  describe('when there is not a workflow selected from the URL', function () {
    let routerStub
    let workflows = [{
      id: '1234',
      configuration: {
        level: '1'
      }
    }, {
      id: '5678',
      configuration: {
        level: '2'
      }
    }]

    const mockStore = {
      project: {
        avatar: {
          src: ''
        },
        background: {
          src: ''
        },
        configuration: {
          announcement: '',
        },
        experimental_tools: ['workflow assignment'],
        inBeta: false,
        toJSON: () => { }, // is this being used in the code somewhere? toJS() should be used instead
        urls: []
      },
      ui: {
        dismissProjectAnnouncementBanner: () => { },
        showAnnouncement: false
      },
      user: {
        id: '1',
        personalization: {
          projectPreferences: {
            promptAssignment: () => { },
            settings: {}
          },
          sessionCount: 0,
          stats: {
            thisWeek: []
          }
        },
        recents: {
          recents: []
        },
      }
    }

    before(function () {
      routerStub = sinon.stub(Router, 'useRouter').callsFake((component) => {
        return {
          asPath: '',
          locale: 'en',
          query: {
            owner: 'zootester1',
            project: 'my-project'
          },
          prefetch: () => Promise.resolve()
        }
      })
    })

    after(function () {
      routerStub.restore()
    })

    it('should be able to load the classify page without crashing', function () {
      const wrapper = mount(
        <Provider store={mockStore}>
          <ClassifyPageContainer
            workflows={workflows}
          />
        </Provider>, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      }
      )
      expect(wrapper).to.be.ok()
    })
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

  describe('when the project is workflow assignment enabled', function () {
    let routerStub
    let workflows = [{
      id: '1234',
      configuration: {
        level: '1'
      }
    }, {
      id: '5678',
      configuration: {
        level: '2'
      }
    }]

    const mockStore = {
        project: {
          avatar: {
            src: ''
          },
          background: {
            src: ''
          },
          configuration: {
            announcement: '',
          },
          experimental_tools: ['workflow assignment'],
          inBeta: false,
          toJSON: () => {}, // is this being used in the code somewhere? toJS() should be used instead
          urls: []
        },
        ui: {
          dismissProjectAnnouncementBanner: () => { },
          showAnnouncement: false
        },
        user: {
          id: '1',
          personalization: {
            projectPreferences: {
              promptAssignment: () => { },
              settings: {}
            },
            sessionCount: 0,
            stats: {
              thisWeek: []
            }
          },
          recents: {
            recents: []
          }
        }
      }

    before(function () {
      routerStub = sinon.stub(Router, 'useRouter').callsFake((component) => {
        return {
          asPath: '',
          locale: 'en',
          query: {
            owner: 'zootester1',
            project: 'my-project'
          },
          prefetch: () => Promise.resolve()
        }
      })
    })

    after(function () {
      routerStub.restore()
    })
  
    describe('when there is a user and thus an assigned workflow', function () {
      describe('when the assigned workflow level is greater than or equal to the workflow from URL level', function () {
        it('should be able to load the workflow from the url', function () {
          const mockStoreWithAssignment = Object.assign({}, mockStore, { 
            user: { 
              personalization: { 
                projectPreferences: { 
                  settings: { 
                    workflow_id: '5678' 
                  }
                },
                sessionCount: 0,
                stats: {
                  thisWeek: []
                }
              },
              recents: {
                recents: []
              }
            }
          })
          const wrapper = mount(
            <Provider store={mockStoreWithAssignment}>
              <ClassifyPageContainer
                assignedWorkflowID='5678'
                workflowAssignmentEnabled
                workflowID='1234'
                workflows={workflows}
              />
            </Provider>, {
              wrappingComponent: Grommet,
              wrappingComponentProps: { theme: zooTheme }
            }
          )
          expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[0])
        })
      })

      describe('when the assigned workflow level is less than the workflow from URL level', function () {
        it('should not be able to load the workflow from the url', function () {
          const mockStoreWithAssignment = Object.assign({}, mockStore, { 
            user: { 
              personalization: { 
                projectPreferences: { 
                  settings: { 
                    workflow_id: '1234'
                  } 
                },
                sessionCount: 0,
                stats: {
                  thisWeek: []
                }
              },
              recents: {
                recents: []
              }
            } 
          })

          const wrapper = mount(
            <Provider store={mockStoreWithAssignment}>
              <ClassifyPageContainer
                assignedWorkflowID='1234'
                workflowAssignmentEnabled
                workflowID='5678'
                workflows={workflows}
              />
            </Provider>, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          })

          expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.be.null()
        })
      })
    })

    describe('when there is not a user and thus not an assigned workflow', function () {
      it('should be able to load the first level workflow', function () {
        const mockStoreWithoutUser = Object.assign({}, mockStore, {
          user: {
            personalization: {
              projectPreferences: {
                promptAssignment: () => { },
                settings: {}
              },
              sessionCount: 0,
              stats: {
                thisWeek: []
              }
            },
            recents: {
              recents: []
            }
          }})
        const wrapper = mount(
          <Provider store={mockStoreWithoutUser}>
            <ClassifyPageContainer
              workflowAssignmentEnabled
              workflowID='1234'
              workflows={workflows}
            />
          </Provider>, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[0])
      })

      it('should not be able to load other workflow levels', function () {
        const mockStoreWithoutUser = Object.assign({}, mockStore, {
          user: {
            personalization: {
              projectPreferences: {
                promptAssignment: () => { },
                settings: {}
              },
              sessionCount: 0,
              stats: {
                thisWeek: []
              }
            },
            recents: {
              recents: []
            }
          }
        })
        const wrapper = mount(
          <Provider store={mockStoreWithoutUser}>
            <ClassifyPageContainer
              workflowAssignmentEnabled
              workflowID='5678'
              workflows={workflows}
            />
          </Provider>, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })
        expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.be.null()
      })
    })
  })

  describe('when the project is not workflow assignment enabled', function () {
    it('should be able to load the workflow from the url', function () {
      const routerStub = sinon.stub(Router, 'useRouter').callsFake((component) => {
        return {
          asPath: '',
          locale: 'en',
          query: {
            owner: 'zootester1',
            project: 'my-project'
          },
          prefetch: () => Promise.resolve()
        }
      })

      const mockStore = {
        project: {
          avatar: {
            src: ''
          },
          background: {
            src: ''
          },
          configuration: {
            announcement: '',
          },
          experimental_tools: [],
          inBeta: false,
          toJSON: () => { }, // is this being used in the code somewhere? toJS() should be used instead
          urls: []
        },
        ui: {
          dismissProjectAnnouncementBanner: () => { },
          showAnnouncement: false
        },
        user: {
          id: '1',
          personalization: {
            projectPreferences: {
              promptAssignment: () => { },
              settings: {}
            },
            sessionCount: 0,
            stats: {
              thisWeek: []
            }
          },
          recents: {
            recents: []
          }
        }
      }
      let workflows = [{
        id: '1234',
        configuration: {}
      }, {
        id: '5678',
        configuration: {}
      }]
      const wrapper = mount(
        <Provider store={mockStore}>
          <ClassifyPageContainer
            workflowID='5678'
            workflows={workflows}
          />
        </Provider>, {
        wrappingComponent: Grommet,
        wrappingComponentProps: { theme: zooTheme }
      })

      expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[1])
      routerStub.restore()
    })
  })
})

import { mount, shallow } from 'enzyme'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import ClassifyPageContainer from './ClassifyPageContainer'
import ClassifyPage from './ClassifyPage'

import { Provider } from 'mobx-react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import * as Router from 'next/router'
import sinon from 'sinon'
import { expect } from 'chai'

describe('Component > ClassifyPageContainer', function () {
  const mockRouter = {
    asPath: '/zooniverse/snapshot-serengeti/about/team',
    basePath: '/projects',
    locale: 'en',
    push() {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  let wrapper
  let componentWrapper

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
      organization: {},
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
        collections: {
          collections: []
        },
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
        <RouterContext.Provider value={mockRouter}>
        <Provider store={mockStore}>
          <ClassifyPageContainer
            workflows={workflows}
          />
        </Provider>
        </RouterContext.Provider>, {
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
      wrapper = shallow(<ClassifyPageContainer subjectID='12345' />)
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
      organization: {},
      project: {
        avatar: {
          src: ''
        },
        background: {
          src: ''
        },
        configuration: {
          announcement: ''
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
        collections: {
          collections: []
        },
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
              collections: {
                collections: []
              },
              personalization: {
                projectPreferences: {
                  promptAssignment: () => false,
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
            <RouterContext.Provider value={mockRouter}>
              <Provider store={mockStoreWithAssignment}>
                <ClassifyPageContainer
                  assignedWorkflowLevel={2}
                  workflowAssignmentEnabled
                  workflowID='1234'
                  workflows={workflows}
                />
              </Provider>
            </RouterContext.Provider>, {
              wrappingComponent: Grommet,
              wrappingComponentProps: { theme: zooTheme }
            }
          )
          expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[0])
          expect(wrapper.find(ClassifyPage).props().workflowID).to.equal(workflows[0].id)
        })
      })

      describe('when the assigned workflow level is less than the workflow from URL level', function () {
        it('should not be able to load the workflow from the url', function () {
          const mockStoreWithAssignment = Object.assign({}, mockStore, {
            user: {
              collections: {
                collections: []
              },
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
            <RouterContext.Provider value={mockRouter}>
              <Provider store={mockStoreWithAssignment}>
                <ClassifyPageContainer
                  assignedWorkflowLevel={1}
                  workflowAssignmentEnabled
                  workflowID='5678'
                  workflows={workflows}
                />
              </Provider>
            </RouterContext.Provider>, {
              wrappingComponent: Grommet,
              wrappingComponentProps: { theme: zooTheme }
            })

          expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.be.null()
          expect(wrapper.find(ClassifyPage).props().workflowID).to.be.undefined()
        })
      })
    })

    describe('when there is not a user and thus not an assigned workflow', function () {
      it('should be able to load the first level workflow', function () {
        const mockStoreWithoutUser = Object.assign({}, mockStore, {
          user: {
            collections: {
              collections: []
            },
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
          <RouterContext.Provider value={mockRouter}>
            <Provider store={mockStoreWithoutUser}>
              <ClassifyPageContainer
                workflowAssignmentEnabled
                workflowID='1234'
                workflows={workflows}
              />
            </Provider>
          </RouterContext.Provider>, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          })
        expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[0])
        expect(wrapper.find(ClassifyPage).props().workflowID).to.equal(workflows[0].id)
      })

      it('should not be able to load other workflow levels', function () {
        const mockStoreWithoutUser = Object.assign({}, mockStore, {
          user: {
            collections: {
              collections: []
            },
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
          <RouterContext.Provider value={mockRouter}>
            <Provider store={mockStoreWithoutUser}>
              <ClassifyPageContainer
                workflowAssignmentEnabled
                workflowID='5678'
                workflows={workflows}
              />
            </Provider>
          </RouterContext.Provider>, {
            wrappingComponent: Grommet,
            wrappingComponentProps: { theme: zooTheme }
          })
        expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.be.null()
        expect(wrapper.find(ClassifyPage).props().workflowID).to.be.undefined()
      })
    })
  })

  describe('when the project is not workflow assignment enabled', function () {
    let routerStub
    const mockStore = {
      organization: {},
      project: {
        avatar: {
          src: ''
        },
        background: {
          src: ''
        },
        configuration: {
          announcement: ''
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
        collections: {
          collections: []
        },
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

    beforeEach(function () {
      routerStub = sinon.stub(Router, 'useRouter').callsFake((component) => {
        return {
          asPath: '',
          query: {
            owner: 'zootester1',
            project: 'my-project'
          },
          prefetch: () => Promise.resolve()
        }
      })
    })

    afterEach(function () {
      routerStub.restore()
    })

    it('should be able to load the workflow from the url', function () {
      let workflows = [{
        id: '1234',
        configuration: {}
      }, {
        id: '5678',
        configuration: {}
      }]
      const wrapper = mount(
        <RouterContext.Provider value={mockRouter}>
          <Provider store={mockStore}>
            <ClassifyPageContainer
              workflowID='5678'
              workflows={workflows}
            />
          </Provider>
        </RouterContext.Provider>, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })

      expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(workflows[1])
      expect(wrapper.find(ClassifyPage).props().workflowID).to.equal('5678')
    })

    it('should be able to load a completed workflow from the url', function () {
      let incompleteWorkflows = [{
        id: '91011',
        configuration: {}
      }, {
        id: '5678',
        configuration: {}
      }]

      let completeWorkflow = {
        completeness: 1,
        id: '1234',
        configuration: {}
      }

      const wrapper = mount(
        <RouterContext.Provider value={mockRouter}>
          <Provider store={mockStore}>
            <ClassifyPageContainer
              workflowID='1234'
              workflows={[...incompleteWorkflows, completeWorkflow]}
            />
          </Provider>
        </RouterContext.Provider>, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        })

      expect(wrapper.find(ClassifyPage).props().workflowFromUrl).to.equal(completeWorkflow)
      expect(wrapper.find(ClassifyPage).props().workflowID).to.equal('1234')
    })
  })
})

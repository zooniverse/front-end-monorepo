import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from './RootStore'
import ProjectStore from './ProjectStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import {
  ProjectFactory,
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory,
  UPPFactory,
  UserFactory
} from '../../test/factories'
import stubPanoptesJs from '../../test/stubPanoptesJs'

let rootStore
const seenMock = new Date().toISOString()
const token = '1235'

const user = UserFactory.build()
const project = ProjectFactory.build()
const workflow = WorkflowFactory.build({ id: project.configuration.default_workflow })
const medium = TutorialMediumFactory.build()

const tutorial = TutorialFactory.build({ steps: [
  { content: '# Hello', media: medium.id },
  { content: '# Step 2' }
] })

const tutorialNullKind = TutorialFactory.build(
  {
    steps: [
      { content: '# Hello', media: medium.id },
      { content: '# Step 2' }
    ],
    kind: null
  }
)

const tutorialMiniCourseKind = TutorialFactory.build(
  {
    steps: [
      { content: '# Hello', media: medium.id },
      { content: '# Step 2' }
    ],
    kind: 'mini-course'
  }
)

const upp = UPPFactory.build()
const uppWithTutorialTimeStamp = UPPFactory.build({
  preferences: {
    tutorials_completed_at: {
      [tutorial.id]: seenMock
    }
  }
})

const panoptesClient = stubPanoptesJs({ workflows: workflow })

const clientStub = (tutorialResource = tutorial) => {
  return Object.assign({}, panoptesClient, {
    tutorials: {
      get: sinon.stub().callsFake(() => {
        return Promise.resolve({
          body: {
            tutorials: [tutorialResource]
          }
        })
      }),
      getAttachedImages: sinon.stub().callsFake(() => {
        return Promise.resolve({
          body: {
            media: [medium]
          }
        })
      })
    }
  })
}

const authClientStubWithoutUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null))
}

const authClientStubWithUser = {
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(user)),
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(token))
}

describe('Model > TutorialStore', function () {
  function fetchTutorials () {
    sinon.stub(rootStore.tutorials, 'fetchTutorials')
    return rootStore.workflows.setActive(workflow.id)
      .then(() => {
        rootStore.tutorials.fetchTutorials.restore()
        return rootStore.tutorials.fetchTutorials()
      })
  }

  it('should exist', function () {
    expect(TutorialStore).to.be.an('object')
  })

  it('should remain in an initialized state if there is no workflow', function () {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithoutUser, client: clientStub() })

    expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
  })

  it('should set the tutorial if there is a workflow', function (done) {
    rootStore = RootStore.create({
      tutorials: TutorialStore.create(),
      workflows: WorkflowStore.create()
    }, { authClient: authClientStubWithUser, client: clientStub() })

    fetchTutorials()
      .then(() => {
        const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
        expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
  })

  describe('Actions > fetchTutorials', function () {
    it('should request for tutorials linked to the active workflow', function (done) {
      const client = clientStub()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client })

      fetchTutorials()
        .then(() => {
          expect(client.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
        }).then(done, done)
    })

    it('should not request for media or set the resources if there are no tutorials in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.resolve({ body: { tutorials: [] } }) }
          }
        })
      })

      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')

      fetchTutorials()
        .then(() => {
          expect(setTutorialsSpy).to.have.not.been.called
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.success)
        }).then(() => {
          setTutorialsSpy.restore()
        }).then(done, done)
    })

    it('should request for the media if there are tutorials', function (done) {
      const client = clientStub()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithoutUser, client })
      sinon.stub(rootStore.tutorials, 'fetchTutorials')

      rootStore.workflows.setActive(workflow.id)
        .then(() => client.tutorials.getAttachedImages.resetHistory())
        .then(() => {
          rootStore.tutorials.fetchTutorials.restore()
          return rootStore.tutorials.fetchTutorials()
        })
        .then(() => {
          expect(client.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
        }).then(done, done)
    })

    it('should call setTutorials if there are tutorials', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')

      fetchTutorials()
        .then(() => {
          expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
        }).then(() => {
          setTutorialsSpy.restore()
        }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.reject('testing error state') }
          }
        })
      })

      fetchTutorials()
        .then(() => {
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe('Actions > fetchMedia', function () {
    it('should not call setMediaResources if there is no media in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser,
        client: Object.assign({}, panoptesClient, {
          tutorials: {
            get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } }) },
            getAttachedImages: () => { return Promise.resolve({ body: { media: [] } }) }
          } })
      })

      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials()
        .then(() => {
          expect(setMediaResourcesSpy).to.have.not.been.called
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })

    it('should call setMediaResources if there is media in the response', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials()
        .then(() => {
          expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })
  })

  describe('Actions > setActiveTutorial', function () {
    it('should reset the active tutorial if the id parameter is not defined', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      const resetActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'resetActiveTutorial')
      rootStore.tutorials.setActiveTutorial()
      expect(resetActiveTutorialSpy).to.have.been.calledOnce
      expect(rootStore.tutorials.active).to.be.undefined
      expect(rootStore.tutorials.activeStep).to.be.undefined
      expect(rootStore.tutorials.activeMedium).to.be.undefined
      resetActiveTutorialSpy.restore()
    })

    it('should set the active tutorial to the id parameter', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
    })

    it('should set the tutorial step if the id parameter is defined', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      const setTutorialStepSpy = sinon.spy(rootStore.tutorials, 'setTutorialStep')

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(setTutorialStepSpy).to.have.been.calledOnceWith(1)
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(() => {
        setTutorialStepSpy.restore()
      }).then(done, done)
    })

    it('should set the seen time if the id parameter is defined', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })
      const setSeenTimeSpy = sinon.spy(rootStore.tutorials, 'setSeenTime')

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(setSeenTimeSpy).to.have.been.calledOnce
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(() => {
        setSeenTimeSpy.restore()
      }).then(done, done)
    })
  })

  describe('Actions > setTutorialStep', function () {
    it('should not set the active step if there is not an active tutorial', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setTutorialStep(0)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.be.undefined
      }).then(done, done)
    })

    it('should set not the active step if that stepIndex does not exist in the steps array', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 2)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.be.undefined
      }).then(done, done)
    })

    it('should set the active step with the stepIndex parameter', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(done, done)
    })

    it('should set the active step with the default of 0', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(0)
      }).then(done, done)
    })

    it('should set the activeMedium if it exists for the step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id)
          rootStore.tutorials.setMediaResources([medium])
        }).then(() => {
          expect(rootStore.tutorials.activeMedium).to.deep.equal(medium)
        }).then(done, done)
    })
  })

  describe('Actions > resetSeen', function () {
    it('should reset the tutorial seen time when a new workflow loads', function (done) {
      const seen = new Date().toISOString()
      rootStore = RootStore.create({
        tutorials: TutorialStore.create({ tutorialSeenTime: seen }),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      fetchTutorials()
        .then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined
        }).then(done, done)
    })
  })

  describe('Actions > setSeenTime', function () {
    it('should not set the seen time if there is not an active tutorial', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      rootStore.tutorials.setSeenTime()
      expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined
    })

    it('should set the seen time for the tutorial kind of tutorial resource', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })

    it('should set the seen time for the null kind of tutorial resource', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub(tutorialNullKind)
      })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorialNullKind.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })
  })

  describe('Actions > setModalVisibility', function () {
    it('should set the modal visibility', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, {
        authClient: authClientStubWithoutUser, client: clientStub()
      })

      rootStore.tutorials.setModalVisibility(true)
      expect(rootStore.tutorials.showModal).to.be.true
      rootStore.tutorials.setModalVisibility(false)
      expect(rootStore.tutorials.showModal).to.be.false
    })
  })

  describe('Actions > showTutorialInModal', function () {
    let clientStubWithUPP
    let clientStubWithUPPTimestamp
    let tutorialsClient

    before(function () {
      const panoptesClientWithUPP = stubPanoptesJs({ project_preferences: upp, workflows: workflow })
      const panoptesClientWithUPPTimestamp = stubPanoptesJs({ project_preferences: uppWithTutorialTimeStamp, workflows: workflow })
      tutorialsClient = {
        tutorials: {
          get: sinon.stub().callsFake(() => {
            return Promise.resolve({
              body: {
                tutorials: [tutorial]
              }
            })
          })
        }
      }
      clientStubWithUPP = Object.assign({}, tutorialsClient, panoptesClientWithUPP)
      clientStubWithUPPTimestamp = Object.assign({}, tutorialsClient, panoptesClientWithUPPTimestamp)
    })

    describe('loading attached media', function () {
      let awaitTutorials
      let awaitMedia
      function defer () {
        // http://lea.verou.me/2016/12/resolve-promises-externally-with-this-one-weird-trick/
        let res
        let rej

      	const promise = new Promise((resolve, reject) => {
      		res = resolve
      		rej = reject
      	})

      	promise.resolve = res
      	promise.reject = rej

      	return promise
      }

      beforeEach(function () {
        rootStore = RootStore.create({}, {
          authClient: authClientStubWithoutUser, client: clientStubWithUPP
        })
        awaitTutorials = defer()
        awaitMedia = defer()
        tutorialsClient.tutorials.get = sinon.stub().callsFake(() => awaitTutorials)
        tutorialsClient.tutorials.getAttachedImages = sinon.stub().callsFake(() => awaitMedia)
      })

      describe('while media are loading', function () {
        it('should wait for media to load', function (done) {
          let awaitFetch
          const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
          const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
          sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => {})
          sinon.stub(rootStore.tutorials, 'fetchTutorials')

          rootStore.projects.setResource(project)
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setActive(workflow.id)
            .then(() => {
              rootStore.tutorials.fetchTutorials.restore()
              awaitFetch = rootStore.tutorials.fetchTutorials()
              return awaitTutorials.resolve({
                body: {
                  tutorials: [tutorial]
                }
              })
            })
            .then(() => {
              expect(setActiveTutorialSpy).to.not.have.been.called
              expect(setModalVisibilitySpy).to.not.have.been.called
              expect(rootStore.tutorials.active).to.be.undefined
              expect(rootStore.tutorials.showModal).to.be.false
            })
            .then(() => {
              return awaitMedia.resolve({
                body: {
                  media: [medium]
                }
              })
            })
            .then(() => {
              // awaitFetch should have resolved now so let's test it
              return awaitFetch
            })
            .then(() => {
              expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
              expect(setModalVisibilitySpy).to.have.been.calledOnce
              expect(rootStore.tutorials.active).to.deep.equal(tutorial)
              expect(rootStore.tutorials.showModal).to.be.true
            }).then(() => {
              setActiveTutorialSpy.restore()
              setModalVisibilitySpy.restore()
            }).then(done, done)
        })
      })

      describe('when tutorial media fail to load', function () {
        it('should show the tutorial', function (done) {
          const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
          const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
          sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => { })
          sinon.stub(rootStore.tutorials, 'fetchTutorials')

          rootStore.projects.setResource(project)
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setActive(workflow.id)
            .then(() => {
              rootStore.tutorials.fetchTutorials.restore()
              const awaitFetch = rootStore.tutorials.fetchTutorials()
              awaitTutorials.resolve({
                body: {
                  tutorials: [tutorial]
                }
              })
              awaitMedia.reject('Media failed to load!')
              return awaitFetch
            })
            .then(() => {
              expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
              expect(setModalVisibilitySpy).to.have.been.calledOnce
              expect(rootStore.tutorials.active).to.deep.equal(tutorial)
              expect(rootStore.tutorials.showModal).to.be.true
            }).then(() => {
              setActiveTutorialSpy.restore()
              setModalVisibilitySpy.restore()
            }).then(done, done)
        })
      })

      describe('when media have loaded', function () {
        describe('for logged-out users', function () {
          it('should show the tutorial', function (done) {
            rootStore = RootStore.create({
              projects: ProjectStore.create(),
              tutorials: TutorialStore.create(),
              workflows: WorkflowStore.create()
            }, {
              authClient: authClientStubWithoutUser, client: clientStub()
            })
            const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
            const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
            sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => {})
            sinon.stub(rootStore.tutorials, 'fetchTutorials')

            rootStore.projects.setResource(project)
            rootStore.projects.setActive(project.id)
            rootStore.workflows.setActive(workflow.id)
              .then(() => {
                rootStore.tutorials.fetchTutorials.restore()
                const awaitFetch = rootStore.tutorials.fetchTutorials()
                awaitTutorials.resolve({
                  body: {
                    tutorials: [tutorial]
                  }
                })
                awaitMedia.resolve({
                  body: {
                    media: [medium]
                  }
                })
                return awaitFetch
              })
              .then(() => {
                expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
                expect(setModalVisibilitySpy).to.have.been.calledOnce
                expect(rootStore.tutorials.active).to.deep.equal(tutorial)
                expect(rootStore.tutorials.showModal).to.be.true
              }).then(() => {
                setActiveTutorialSpy.restore()
                setModalVisibilitySpy.restore()
                rootStore.userProjectPreferences.updateUPP.restore()
              }).then(done, done)
          })
        })

        describe('for logged-in users', function () {
          it('should show the tutorial if it has not been seen', function (done) {
            rootStore = RootStore.create({}, {
              authClient: authClientStubWithUser, client: clientStubWithUPP
            })
            const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
            const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
            sinon.stub(rootStore.userProjectPreferences, 'updateUPP').callsFake(() => { })
            sinon.stub(rootStore.tutorials, 'fetchTutorials')

            rootStore.projects.setResource(project)
            rootStore.projects.setActive(project.id)
            rootStore.workflows.setActive(workflow.id)
              .then(() => {
                rootStore.tutorials.fetchTutorials.restore()
                const awaitFetch = rootStore.tutorials.fetchTutorials()
                awaitTutorials.resolve({
                  body: {
                    tutorials: [tutorial]
                  }
                })
                awaitMedia.resolve({
                  body: {
                    media: [medium]
                  }
                })
                return awaitFetch
              })
              .then(() => {
                expect(setActiveTutorialSpy).to.have.been.calledOnceWith(tutorial.id)
                expect(setModalVisibilitySpy).to.have.been.calledOnce
                expect(rootStore.tutorials.active).to.deep.equal(tutorial)
                expect(rootStore.tutorials.showModal).to.be.true
              })
              .then(() => {
                setActiveTutorialSpy.restore()
                setModalVisibilitySpy.restore()
                rootStore.userProjectPreferences.updateUPP.restore()
              })
              .then(done, done)
          })

          it('should not show the tutorial if it has been seen', function (done) {
            rootStore = RootStore.create({}, {
              authClient: authClientStubWithUser, client: clientStubWithUPPTimestamp
            })
            const setActiveTutorialSpy = sinon.spy(rootStore.tutorials, 'setActiveTutorial')
            const setModalVisibilitySpy = sinon.spy(rootStore.tutorials, 'setModalVisibility')
            sinon.stub(rootStore.tutorials, 'fetchTutorials')

            rootStore.projects.setResource(project)
            rootStore.projects.setActive(project.id)
            const awaitWorkflows = rootStore.workflows.setActive(workflow.id)
              .then(() => {
                rootStore.tutorials.fetchTutorials.restore()
                const awaitFetch = rootStore.tutorials.fetchTutorials()
                awaitTutorials.resolve({
                  body: {
                    tutorials: [tutorial]
                  }
                })
                awaitMedia.resolve({
                  body: {
                    media: [medium]
                  }
                })
                return awaitFetch
              })
              .then(() => {
                expect(setActiveTutorialSpy).to.not.have.been.called
                expect(setModalVisibilitySpy).to.not.have.been.called
                expect(rootStore.tutorials.active).to.be.undefined
                expect(rootStore.tutorials.showModal).to.be.false
              })
              .then(() => {
                setActiveTutorialSpy.restore()
                setModalVisibilitySpy.restore()
              })
              .then(done, done)
          })
        })
      })
    })
  })

  describe('Views > isFirstStep', function () {
    it('should return false if no active tutorial', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      expect(rootStore.tutorials.active).to.be.undefined
      expect(rootStore.tutorials.isFirstStep).to.be.false
    })

    it('should return false if activeStep is not the first step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(1)
          expect(rootStore.tutorials.isFirstStep).to.be.false
        }).then(done, done)
    })

    it('should return true if activeStep is the first step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 0)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(0)
          expect(rootStore.tutorials.isFirstStep).to.be.true
        }).then(done, done)
    })
  })

  describe('Views > isLastStep', function () {
    it('should return false if no active tutorial', function () {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      expect(rootStore.tutorials.active).to.be.undefined
      expect(rootStore.tutorials.isLastStep).to.be.false
    })

    it('should return false if activeStep is not the last step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 0)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(0)
          expect(rootStore.tutorials.isLastStep).to.be.false
        }).then(done, done)
    })

    it('should return true if activeStep is the last step', function (done) {
      rootStore = RootStore.create({
        tutorials: TutorialStore.create(),
        workflows: WorkflowStore.create()
      }, { authClient: authClientStubWithUser, client: clientStub() })

      fetchTutorials()
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(1)
          expect(rootStore.tutorials.isLastStep).to.be.true
        }).then(done, done)
    })
  })
})

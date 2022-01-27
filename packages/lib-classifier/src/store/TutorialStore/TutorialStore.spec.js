import { Factory } from 'rosie'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import RootStore from '@store/RootStore'
import TutorialStore from './TutorialStore'
import {
  ProjectFactory,
  TutorialFactory,
  TutorialMediumFactory,
  WorkflowFactory,
  UPPFactory,
  UserFactory
} from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

describe('Model > TutorialStore', function () {
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

  const upp = UPPFactory.build()
  const uppWithTutorialTimeStamp = UPPFactory.build({
    preferences: {
      tutorials_completed_at: {
        [tutorial.id]: seenMock
      }
    }
  })

  const panoptesClient = stubPanoptesJs({
    subjects: Factory.buildList('subject', 10),
    workflows: workflow
  })

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

  function fetchTutorials (rootStore) {
    return rootStore.workflows.setActive(workflow.id)
      .then(() => {
        return rootStore.tutorials.fetchTutorials()
      })
  }

  function setupStores (clientStub, authClientStub) {
    return RootStore.create({
      classifications: {},
      dataVisAnnotating: {},
      drawing: {},
      feedback: {},
      fieldGuide: {},
      projects: {},
      subjects: {},
      subjectViewer: {},
      workflowSteps: {},
      userProjectPreferences: {}
    }, { client: clientStub, authClient: authClientStub })
  }

  describe('when initialized', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should exist', function () {
      expect(TutorialStore).to.be.an('object')
    })

    it('should remain in an initialized state if there is no workflow', function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      expect(rootStore.tutorials.loadingState).to.equal(asyncStates.initialized)
    })

    it('should set the tutorial if there is a workflow', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)

      fetchTutorials(rootStore)
        .then(() => {
          const tutorialInStore = rootStore.tutorials.resources.get(tutorial.id)
          expect(tutorialInStore.toJSON()).to.deep.equal(tutorial)
        }).then(done, done)
    })
  })

  describe('Actions > fetchTutorials', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it('should request for tutorials linked to the active workflow', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(panoptesClientStub.tutorials.get).to.have.been.calledWith({ workflowId: workflow.id })
        }).then(done, done)
    })

    it('should not request for media or set the resources if there are no tutorials in the response', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [] } }) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.success)
        }).then(done, done)
    })

    it('should request for the media if there are tutorials', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      rootStore.workflows.setActive(workflow.id)
        .then(() => panoptesClientStub.tutorials.getAttachedImages.resetHistory())
        .then(() => {
          return rootStore.tutorials.fetchTutorials()
        })
        .then(() => {
          expect(panoptesClientStub.tutorials.getAttachedImages).to.have.been.calledOnceWith({ id: tutorial.id })
        }).then(done, done)
    })

    it.skip('should call setTutorials if there are tutorials', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setTutorialsSpy = sinon.spy(rootStore.tutorials, 'setTutorials')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setTutorialsSpy).to.have.been.calledOnceWith([tutorial])
        }).then(() => {
          setTutorialsSpy.restore()
        }).then(done, done)
    })

    it('should set the loadingState to error if the request errors', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.reject(new Error('testing error state')) }
        }
      })
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          expect(rootStore.tutorials.loadingState).to.equal(asyncStates.error)
        }).then(done, done)
    })
  })

  describe('Actions > fetchMedia', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })

    it.skip('should not call setMediaResources if there is no media in the response', function (done) {
      const panoptesClientStub = Object.assign({}, panoptesClient, {
        tutorials: {
          get: () => { return Promise.resolve({ body: { tutorials: [tutorial] } }) },
          getAttachedImages: () => { return Promise.resolve({ body: { media: [] } }) }
        }
      })

      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.not.been.called()
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })

    it.skip('should call setMediaResources if there is media in the response', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
      const setMediaResourcesSpy = sinon.spy(rootStore.tutorials, 'setMediaResources')

      fetchTutorials(rootStore)
        .then(() => {
          expect(setMediaResourcesSpy).to.have.been.calledOnceWith([medium])
        }).then(() => {
          setMediaResourcesSpy.restore()
        }).then(done, done)
    })
  })

  describe('Actions > setActiveTutorial', function () {
    let rootStore
    beforeEach(function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
    })

    it('should reset the active tutorial if the id parameter is not defined', function () {
      rootStore.tutorials.setActiveTutorial()
      expect(rootStore.tutorials.active).to.be.undefined()
      expect(rootStore.tutorials.activeStep).to.equal(-1)
      expect(rootStore.tutorials.activeMedium).to.be.undefined()
    })

    it('should set the active tutorial to the id parameter', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.active.toJSON()).to.deep.equal(tutorial)
      }).then(done, done)
    })

    it('should set the tutorial step if the id parameter is defined', function (done) {

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(done, done)
    })

    it('should set the seen time if the id parameter is defined', function (done) {

      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
      }).then(done, done)
    })
  })

  describe('Actions > setTutorialStep', function () {
    let rootStore
    beforeEach(function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)
    })

    it('should not set the active step if there is not an active tutorial', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setTutorialStep(0)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(-1)
      }).then(done, done)
    })

    it('should set not the active step if that stepIndex does not exist in the steps array', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 2)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(-1)
      }).then(done, done)
    })

    it('should set the active step with the stepIndex parameter', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(1)
      }).then(done, done)
    })

    it('should set the active step with the default of 0', function (done) {
      Promise.resolve(rootStore.tutorials.setTutorials([tutorial])).then(() => {
        rootStore.tutorials.setActiveTutorial(tutorial.id)
      }).then(() => {
        expect(rootStore.tutorials.activeStep).to.equal(0)
      }).then(done, done)
    })

    it('should set the activeMedium if it exists for the step', function (done) {
      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id)
          rootStore.tutorials.setMediaResources([medium])
        }).then(() => {
          expect(rootStore.tutorials.activeMedium).to.deep.equal(medium)
        }).then(done, done)
    })
  })

  describe('Actions > resetSeen', function () {
    let rootStore
    it('should reset the tutorial seen time when a new workflow loads', function () {
      const seen = new Date().toISOString()
      const panoptesClientStub = clientStub()

      rootStore = RootStore.create({
        classifications: {},
        dataVisAnnotating: {},
        drawing: {},
        feedback: {},
        fieldGuide: {},
        projects: {},
        subjects: {},
        subjectViewer: {},
        tutorials: TutorialStore.create({ tutorialSeenTime: seen }),
        workflows: {
          active: workflow.id,
          resources: {
            [workflow.id]: workflow
          }
        },
        workflowSteps: {},
        userProjectPreferences: {}
      }, { client: panoptesClientStub, authClientStubWithoutUser })

      expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined()
    })
  })

  describe('Actions > setSeenTime', function () {
    let rootStore
    beforeEach(function () {
      rootStore = null
    })
    it('should not set the seen time if there is not an active tutorial', function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      rootStore.tutorials.setSeenTime()
      expect(rootStore.tutorials.tutorialSeenTime).to.be.undefined()
    })

    it('should set the seen time for the tutorial kind of tutorial resource', function (done) {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })

    it('should set the seen time for the null kind of tutorial resource', function (done) {
      const panoptesClientStub = clientStub(tutorialNullKind)
      rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorialNullKind.id)
        }).then(() => {
          expect(rootStore.tutorials.tutorialSeenTime).to.be.a('string')
        }).then(done, done)
    })
  })

  describe('Actions > setModalVisibility', function () {
    it('should set the modal visibility', function () {
      const panoptesClientStub = clientStub()
      const rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

      rootStore.tutorials.setModalVisibility(true)
      expect(rootStore.tutorials.showModal).to.be.true()
      rootStore.tutorials.setModalVisibility(false)
      expect(rootStore.tutorials.showModal).to.be.false()
    })
  })

  describe.skip('Actions > showTutorialInModal', function () {
    let clientStubWithUPP
    let clientStubWithUPPTimestamp
    let tutorialsClient

    before(function () {
      const panoptesClientWithUPP = stubPanoptesJs({
        project_preferences: upp,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
      const panoptesClientWithUPPTimestamp = stubPanoptesJs({
        project_preferences: uppWithTutorialTimeStamp,
        subjects: Factory.buildList('subject', 10),
        workflows: workflow
      })
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
      let rootStore
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
        rootStore = setupStores(clientStubWithUPP, authClientStubWithoutUser)

        awaitTutorials = defer()
        awaitMedia = defer()
        tutorialsClient.tutorials.get = sinon.stub().callsFake(() => awaitTutorials)
        tutorialsClient.tutorials.getAttachedImages = sinon.stub().callsFake(() => awaitMedia)
      })

      describe('while media are loading', function () {
        it('should wait for media to load', function (done) {
          let awaitFetch

          rootStore.projects.setResources([project])
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setActive(workflow.id)
            .then(() => {
              awaitFetch = rootStore.tutorials.fetchTutorials()
              return awaitTutorials.resolve({
                body: {
                  tutorials: [tutorial]
                }
              })
            })
            .then(() => {
              expect(rootStore.tutorials.active).to.be.undefined()
              expect(rootStore.tutorials.showModal).to.be.false()
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
              expect(rootStore.tutorials.active).to.deep.equal(tutorial)
              expect(rootStore.tutorials.showModal).to.be.true()
            }).then(done, done)
        })
      })

      describe('when tutorial media fail to load', function () {
        it('should show the tutorial', function (done) {

          rootStore.projects.setResources([project])
          rootStore.projects.setActive(project.id)
          rootStore.workflows.setActive(workflow.id)
            .then(() => {
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
              expect(rootStore.tutorials.active).to.deep.equal(tutorial)
              expect(rootStore.tutorials.showModal).to.be.true()
            }).then(done, done)
        })
      })

      describe('when media have loaded', function () {
        let rootStore
        beforeEach(function () {
          rootStore = null
        })

        describe('for logged-out users', function () {
          it('should show the tutorial', function (done) {
            const panoptesClientStub = clientStub()
            rootStore = setupStores(panoptesClientStub, authClientStubWithoutUser)

            rootStore.projects.setResources([project])
            rootStore.projects.setActive(project.id)
            rootStore.workflows.setActive(workflow.id)
              .then(() => {
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
                expect(rootStore.tutorials.active).to.deep.equal(tutorial)
                expect(rootStore.tutorials.showModal).to.be.true()
              }).then(done, done)
          })
        })

        describe('for logged-in users', function () {
          it('should show the tutorial if it has not been seen', function (done) {
            rootStore = setupStores(clientStubWithUPP, authClientStubWithUser)

            rootStore.projects.setResources([project])
            rootStore.projects.setActive(project.id)
            rootStore.workflows.setActive(workflow.id)
              .then(() => {
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
                expect(rootStore.tutorials.active).to.deep.equal(tutorial)
                expect(rootStore.tutorials.showModal).to.be.true()
              })
              .then(done, done)
          })

          it('should not show the tutorial if it has been seen', function (done) {
            rootStore = setupStores(clientStubWithUPPTimestamp, authClientStubWithUser)

            rootStore.projects.setResources([project])
            rootStore.projects.setActive(project.id)
            rootStore.workflows.setActive(workflow.id)
              .then(() => {
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
                expect(rootStore.tutorials.active).to.be.undefined()
                expect(rootStore.tutorials.showModal).to.be.false()
              })
              .then(done, done)
          })
        })
      })
    })
  })

  describe('Views > isFirstStep', function () {
    let rootStore
    beforeEach(function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)
    })

    it('should return false if no active tutorial', function () {
      expect(rootStore.tutorials.active).to.be.undefined()
      expect(rootStore.tutorials.isFirstStep).to.be.false()
    })

    it('should return false if activeStep is not the first step', function (done) {
      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(1)
          expect(rootStore.tutorials.isFirstStep).to.be.false()
        }).then(done, done)
    })

    it('should return true if activeStep is the first step', function (done) {
      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 0)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(0)
          expect(rootStore.tutorials.isFirstStep).to.be.true()
        }).then(done, done)
    })
  })

  describe('Views > isLastStep', function () {
    let rootStore
    beforeEach(function () {
      const panoptesClientStub = clientStub()
      rootStore = setupStores(panoptesClientStub, authClientStubWithUser)
    })

    it('should return false if no active tutorial', function () {
      expect(rootStore.tutorials.active).to.be.undefined()
      expect(rootStore.tutorials.isLastStep).to.be.false()
    })

    it('should return false if activeStep is not the last step', function (done) {
      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 0)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(0)
          expect(rootStore.tutorials.isLastStep).to.be.false()
        }).then(done, done)
    })

    it('should return true if activeStep is the last step', function (done) {
      fetchTutorials(rootStore)
        .then(() => {
          rootStore.tutorials.setActiveTutorial(tutorial.id, 1)
        }).then(() => {
          expect(rootStore.tutorials.activeStep).to.equal(1)
          expect(rootStore.tutorials.isLastStep).to.be.true()
        }).then(done, done)
    })
  })
})

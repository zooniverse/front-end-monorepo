import asyncStates from '@zooniverse/async-states'
import Classifier from '@zooniverse/classifier'
import zooTheme from '@zooniverse/grommet-theme'
import { mount } from 'enzyme'
import { Grommet } from 'grommet'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import sinon from 'sinon'
import { Loader } from '@zooniverse/react-components'

import ClassifierWrapper from './ClassifierWrapper'

describe('Component > ClassifierWrapper', function () {
  const router = {
    asPath: '',
    locale: 'en',
    query: {
      owner: 'zootester1',
      project: 'my-project'
    },
    prefetch: () => Promise.resolve()
  }

  function TestWrapper({ children }) {
    return(
      <RouterContext.Provider value={router}>
        <Grommet theme={zooTheme}>
          {children}
        </Grommet>
      </RouterContext.Provider>
    )
  }
  it('should render without crashing', function () {
    const project = {}
    const user = {}
    const wrapper = mount(
      <ClassifierWrapper
        project={project}
        router={router}
        user={user}
      />,
      { wrappingComponent: TestWrapper }
    )
    expect(wrapper).to.be.ok()
  })

  describe('without a project, user, and user project preferences loaded', function () {
    it('should render a Loader component', function () {
      const wrapper = mount(
        <ClassifierWrapper
          appLoadingState={asyncStates.loading}
          project={{}}
          router={router}
          user={{}}
        />,
        { wrappingComponent: TestWrapper }
      )

      expect(wrapper.find(Loader)).to.have.lengthOf(1)
    })
  })

  describe('with a project, user, user project preferences loaded', function () {
    let recents
    let collections
    let wrapper

    before(function () {
      const project = {
        links: {
          active_workflows: []
        },
        loadingState: asyncStates.success
      }
      recents = {
        add: sinon.stub()
      }
      collections = {
        addFavourites: sinon.stub(),
        removeFavourites: sinon.stub()
      }

      const user = {
        loadingState: asyncStates.success
      }
      wrapper = mount(
        <ClassifierWrapper
          appLoadingState={asyncStates.success}
          collections={collections}
          project={project}
          recents={recents}
          router={router}
          user={user}
        />,
        { wrappingComponent: TestWrapper }
      ).find(Classifier)
    })

    it('should render the classifier', function () {
      expect(wrapper).to.have.lengthOf(1)
    })

    describe('on classification complete', function () {
      describe('with user signed in and any subject', function () {
        before(function () {
          const subject = {
            id: '1',
            already_seen: false,
            favorite: false,
            retired: false,
            locations: [
              { 'image/jpeg': 'thing.jpg' }
            ]
          }
          wrapper.props().onCompleteClassification({}, subject)
        })

        after(function () {
          recents.add.resetHistory()
        })

        it('should add to recents', function () {
          const recent = {
            favorite: false,
            subjectId: '1',
            locations: [
              { 'image/jpeg': 'thing.jpg' }
            ]
          }
          expect(recents.add.withArgs(recent)).to.have.been.calledOnce()
        })
      })
    })

    describe('on toggle favourite', function () {
      it('should add a subject to favourites', function () {
        wrapper.props().onToggleFavourite('3', true)
        expect(collections.addFavourites.withArgs(['3'])).to.have.been.calledOnce()
      })

      it('should remove a subject from favourites', function () {
        wrapper.props().onToggleFavourite('3', false)
        expect(collections.removeFavourites.withArgs(['3'])).to.have.been.calledOnce()
      })
    })
  })
})

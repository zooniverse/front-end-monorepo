import { shallow } from 'enzyme'
import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'
import Classifier from '@zooniverse/classifier'

import ClassifierWrapper from './ClassifierWrapper'

describe('Component > ClassifierWrapper', function () {
  let wrapper

  before(function () {
    const project = {}
    const user = {}
    wrapper = shallow(
      <ClassifierWrapper
        project={project}
        user={user}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('with a project and user loaded', function () {
    let recents
    let collections
    let yourStats

    before(function () {
      const project = {
        loadingState: asyncStates.success
      }
      recents = {
        add: sinon.stub()
      }
      collections = {
        addFavourites: sinon.stub(),
        removeFavourites: sinon.stub()
      }
      yourStats = {
        increment: sinon.stub()
      }
      const user = {
        loadingState: asyncStates.success
      }
      wrapper = shallow(
        <ClassifierWrapper
          collections={collections}
          project={project}
          recents={recents}
          user={user}
          yourStats={yourStats}
        />
      ).find(Classifier)
    })

    it('should render the classifier', function () {
      expect(wrapper).to.have.lengthOf(1)
    })

    describe('on classification complete', function () {
      before(function () {
        const subject = {
          id: '1',
          favorite: false,
          locations: [
            { 'image/jpeg': 'thing.jpg' }
          ]
        }
        wrapper.props().onCompleteClassification({}, subject)
      })

      it('should increment stats', function () {
        expect(yourStats.increment).to.have.been.calledOnce()
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

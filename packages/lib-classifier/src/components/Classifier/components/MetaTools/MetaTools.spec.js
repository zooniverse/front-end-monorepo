import { FavouritesButton } from '@zooniverse/react-components'
import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { MetaTools } from './MetaTools'
import Metadata from './components/Metadata'
import CollectionsButton from './components/CollectionsButton'
import HidePreviousMarksButton from './components/HidePreviousMarksButton'
import { Factory } from 'rosie'
import SHOWN_MARKS from '@helpers/shownMarks'

const subjectWithMetadata = Factory.build('subject', { metadata: { foo: 'bar' } })

const favoriteSubject = Factory.build('subject', { favorite: true })

const spy = sinon.spy()

const interactionTask = {
  hidePreviousMarks: false,
  marks: [{ x: 0, y: 0 }],
  shownMarks: SHOWN_MARKS.ALL,
  togglePreviousMarks: spy
}

describe('Component > MetaTools', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetaTools.wrappedComponent />)
    expect(wrapper).to.be.ok()
  })

  describe('Metadata', function () {
    it('should render a Metadata component', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent />)
      expect(wrapper.find(Metadata)).to.have.lengthOf(1)
    })

    it('should pass along the isThereMetadata and subject resource metadata props', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent isThereMetadata subject={subjectWithMetadata} />)
      const metadataComponentProps = wrapper.find(Metadata).props()
      expect(metadataComponentProps.isThereMetadata).to.be.true()
      expect(metadataComponentProps.metadata).to.equal(subjectWithMetadata.metadata)
    })
  })

  describe('FavouritesButton', function () {
    it('should render a FavouritesButton component', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent />)
      expect(wrapper.find(FavouritesButton)).to.have.lengthOf(1)
    })

    it('should pass locale to FavouritesButton', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent locale='test' />)
      expect(wrapper.find(FavouritesButton).props().locale).to.equal('test')
    })

    it('should call toggle favourites on click of the FavouritesButton', function () {
      const subjectMethod = { toggleFavorite: sinon.spy() }
      const wrapper = shallow(<MetaTools.wrappedComponent subject={subjectMethod} />)
      wrapper.find(FavouritesButton).simulate('click')
      expect(subjectMethod.toggleFavorite).to.have.been.calledOnce()
    })

    it('should disable the FavouritesButton if there is no user project preferences', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={favoriteSubject} />)
      expect(wrapper.find(FavouritesButton).props().disabled).to.be.true()
    })

    it('should enable the FavouritesButton if there is user project preferences', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={favoriteSubject} upp={{ id: '1' }} />)
      expect(wrapper.find(FavouritesButton).props().disabled).to.be.false()
    })

    it('should check the FavouritesButton if the subject is a favorite', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={favoriteSubject} upp={{ id: '1' }} />)
      expect(wrapper.find(FavouritesButton).props().checked).to.be.true()
    })

    it('should not check the FavouritesButton if the subject is not a favorite', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={subjectWithMetadata} upp={{ id: '1' }} />)
      expect(wrapper.find(FavouritesButton).props().checked).to.be.false()
    })
  })

  describe('CollectionsButton', function () {
    it('should render a CollectionsButton component', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent />)
      expect(wrapper.find(CollectionsButton)).to.have.lengthOf(1)
    })

    it('should call to add to collection on click of the CollectionsButton', function () {
      const subjectMethod = { addToCollection: sinon.spy() }
      const addToCollectionSpy = sinon.spy(MetaTools.wrappedComponent.prototype, 'addToCollection')
      const wrapper = shallow(<MetaTools.wrappedComponent subject={subjectMethod} />)
      wrapper.find(CollectionsButton).simulate('click')
      expect(addToCollectionSpy).to.have.been.calledOnce()
      expect(subjectMethod.addToCollection).to.have.been.calledOnce()
    })

    it('should disable the CollectionsButton if there is no user project preferences', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={favoriteSubject} />)
      expect(wrapper.find(CollectionsButton).props().disabled).to.be.true()
    })

    it('should enable the CollectionsButton if there is user project preferences', function () {
      const wrapper = shallow(<MetaTools.wrappedComponent subject={favoriteSubject} upp={{ id: '1' }} />)
      expect(wrapper.find(CollectionsButton).props().disabled).to.be.false()
    })
  })

  describe('HidePreviousMarksButton', function () {
    describe('without an interaction task', function () {
      it('should not render', function () {
        const wrapper = shallow(<MetaTools.wrappedComponent />)
        expect(wrapper.find(HidePreviousMarksButton)).to.have.lengthOf(0)
      })
    })

    describe('with an interaction task', function () {
      let wrapper

      beforeEach(function () {
        wrapper = shallow(<MetaTools.wrappedComponent interactionTask={interactionTask} />)
      })

      it('should render', function () {
        expect(wrapper.find(HidePreviousMarksButton)).to.have.lengthOf(1)
      })

      it('should toggle previout marks on click of the PreviousMarks button', function () {
        wrapper.find(HidePreviousMarksButton).simulate('click')
        expect(spy).to.have.been.calledOnce()
      })
    })
  })
})

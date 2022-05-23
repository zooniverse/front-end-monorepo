import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { observable } from 'mobx'
import nock from 'nock'
import { Grommet } from 'grommet'
import { zooTheme } from '@zooniverse/grommet-theme'
import FieldGuideWrapper from './FieldGuideWrapper'
import FieldGuide from './components/FieldGuide'
import FieldGuideButton from './components/FieldGuideButton'
import { FieldGuideFactory, FieldGuideMediumFactory } from '@test/factories'

describe('Component > FieldGuideWrapper', function () {
  const medium = FieldGuideMediumFactory.build()
  const fieldGuide = FieldGuideFactory.build({
    items: [
      {
        title: 'Cat',
        icon: medium.id,
        content: 'lorem ipsum'
      },
      {
        title: 'Dog',
        content: 'Foo bar'
      },
      { title: 'Iguana', content: 'hello' },
      { title: 'Koala', content: '' },
      { title: 'Dragon', content: 'Why is this here?' }
    ]
  })
  const icons = observable.map()

  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideWrapper
        fieldGuide={fieldGuide}
        icons={icons}
        locale='en'
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should not show the field guide', function () {
    const wrapper = shallow(
      <FieldGuideWrapper
        fieldGuide={fieldGuide}
        icons={icons}
        locale='en'
      />
    )
    expect(wrapper.find(FieldGuide)).to.have.lengthOf(0)
  })

  describe('FieldGuideButton', function () {
    let wrapper
    let showModal = false
    const setModalVisibilityStub = sinon.stub().callsFake((boolean) => { showModal = boolean })
    const translation = {
      language: 'en',
      translated_id: fieldGuide.id,
      translated_type: 'field_guide',
      strings: {
        'items.0.title': 'Cat',
        'items.0.content': 'lorem ipsum',
        'items.1.title': 'Dog',
        'items.1.content': 'Foo bar',
        'items.2.title': 'Iguana',
        'items.2.content': 'hello',
        'items.3.title': 'Koala',
        'items.3.content': '',
        'items.4.title': 'Dragon',
        'items.4.content': 'Why is this here?'
      }
    }

    beforeEach(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
      .get('/translations')
      .query(query => query.translated_type === 'field_guide')
      .reply(200, [translation])
      wrapper = mount(
        <FieldGuideWrapper
          fieldGuide={fieldGuide}
          icons={icons}
          locale='en'
        />, {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    afterEach(function () {
      wrapper.unmount()
    })

    it('should render a FieldGuideButton', function () {
      expect(wrapper.find(FieldGuideButton)).to.have.lengthOf(1)
    })

    it('should pass the expected props', function () {
      const props = wrapper.find(FieldGuideButton).props()
      expect(props.fieldGuide).to.equal(fieldGuide)
      expect(props.onClick).to.be.a('function')
    })

    it('should open the field guide when clicked', function () {
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(0)
      wrapper.find(FieldGuideButton).simulate('click')
      expect(wrapper.find(FieldGuide)).to.have.lengthOf(1)
    })
  })
})

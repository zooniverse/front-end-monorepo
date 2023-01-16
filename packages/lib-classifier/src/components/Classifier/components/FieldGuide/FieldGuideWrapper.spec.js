import { shallow } from 'enzyme'
import { observable } from 'mobx'
import FieldGuideWrapper from './FieldGuideWrapper'
import FieldGuide from './components/FieldGuide'
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
})

import { shallow } from 'enzyme'
import { Grid } from 'grommet'
import FieldGuideItems from './FieldGuideItems'
import FieldGuideItemAnchor from '../FieldGuideItemAnchor'
import { FieldGuideMediumFactory } from '@test/factories'

const medium = FieldGuideMediumFactory.build()
const items = [
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

const strings = {
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

describe('Component > FieldGuideItems', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
        strings={strings}
      />)
    expect(wrapper).to.be.ok()
  })

  it('should render a Grid component', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
        strings={strings}
      />)
    expect(wrapper.find(Grid)).to.be.lengthOf(1)
  })

  it('should render a FieldGuideItemAnchor equal to the number of items', function () {
    const wrapper = shallow(
      <FieldGuideItems
        items={items}
        strings={strings}
      />)
    expect(wrapper.find(FieldGuideItemAnchor)).to.be.lengthOf(items.length)
  })
})

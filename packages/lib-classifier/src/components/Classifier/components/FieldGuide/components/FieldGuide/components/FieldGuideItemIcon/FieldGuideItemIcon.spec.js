import { shallow } from 'enzyme'
import { observable } from 'mobx'
import { Media } from '@zooniverse/react-components'
import FieldGuideItemIcon from './FieldGuideItemIcon'
import { FieldGuideMediumFactory } from '@test/factories'

const medium = FieldGuideMediumFactory.build()
const attachedMedia = observable.map()
attachedMedia.set(medium.id, medium)

describe('Component > FieldGuideItemIcon', function () {
  const icon = attachedMedia.get(medium.id)
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FieldGuideItemIcon
        icon={icon}
      />)
    expect(wrapper).to.be.ok()
  })

  it('should render a Media component if there is an icon', function () {
    const wrapper = shallow(
      <FieldGuideItemIcon
        icon={icon}
      />)
    expect(wrapper.find(Media)).to.have.lengthOf(1)
  })

  it('should not render a Media if there is not an icon', function () {
    const wrapper = shallow(<FieldGuideItemIcon />)
    expect(wrapper.find(Media)).to.have.lengthOf(0)
  })
})

import { shallow } from 'enzyme'
import { Paragraph } from 'grommet'
import { SlideTutorialContainer } from './SlideTutorialContainer'
/** useTranslation will simply return the translation key in a test environment */

describe('SlideTutorialContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<SlideTutorialContainer stepWithMedium={{}} />)
    expect(wrapper).to.be.ok()
  })
})

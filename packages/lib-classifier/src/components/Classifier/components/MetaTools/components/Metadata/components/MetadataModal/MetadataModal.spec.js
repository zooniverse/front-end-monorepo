import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Modal } from '@zooniverse/react-components'

import MetadataModal from './MetadataModal'

const metadata = {
  id: '1',
  href: 'https://zooniverse.org',
  '#hidden': true,
  '!onlyTalk': false,
  'foo': null
}

describe('MetadataModal', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper).to.be.ok()
  })

  it('should render a Modal', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find(Modal)).to.have.lengthOf(1)
  })

  it('should render a styled Grommet DataTable', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find('Styled(DataTable)')).to.have.lengthOf(1)
  })

  it('should render the correct number of table rows', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    expect(wrapper.find('Styled(DataTable)').props().data).to.have.lengthOf(Object.keys(metadata).length - 2)
  })

  it('should not render metadata prefixed with # or !', function () {
    const wrapper = shallow(<MetadataModal metadata={metadata} />)
    wrapper.find('Styled(DataTable)').props().data.forEach((datum) => {
      expect(datum.label.includes('#')).to.be.false()
      expect(datum.label.includes('!')).to.be.false()
    })
  })
})

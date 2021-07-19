import { shallow } from 'enzyme'
import NavLink from '@shared/components/NavLink'

import { ContentBox } from './ContentBox'

const Foobar = () => (<div>Foobar</div>)

describe('Component > ContentBox', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <ContentBox theme={{ dark: false }}>
        <Foobar />
      </ContentBox>
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render its children', function () {
    expect(wrapper.find(Foobar)).to.have.lengthOf(1)
  })

  describe('with link props', function () {
    let wrapper

    before(function () {
      let linkProps = {
        href: '/projects/test/project/stats'
      }
      wrapper = shallow(
        <ContentBox
          theme={{ dark: false }}
          linkLabel='View more stats'
          linkProps={linkProps}
          >
          <Foobar />
        </ContentBox>
      )
    })

    it('should render a navigation link', function () {
      expect(wrapper.find(NavLink)).to.have.lengthOf(1)
    })

    it('should link to the specified href', function () {
      const link = wrapper.find(NavLink).prop('link')
      expect(link.href).to.equal('/projects/test/project/stats')
    })
    
    it('should use the specified link text', function () {
      const link = wrapper.find(NavLink).prop('link')
      expect(link.text).to.equal('View more stats')
    })
  })
})

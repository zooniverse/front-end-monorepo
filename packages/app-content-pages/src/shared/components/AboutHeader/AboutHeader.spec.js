import { shallow } from 'enzyme'

import { AboutHeader } from './AboutHeader'

let wrapper

describe('Component > AboutHeader', function () {
  before(function () {
    wrapper = shallow(<AboutHeader />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have an `About` link', function () {
    expect(wrapper.find('[href="/about"]')).to.have.lengthOf(1)
  })

  it('should have a `Publications` link', function () {
    expect(wrapper.find('[href="/about/publications"]')).to.have.lengthOf(1)
  })

  it('should have an `Our Team` link', function () {
    expect(wrapper.find('[href="/about/team"]')).to.have.lengthOf(1)
  })

  it('should have a `Acknowledgements` link', function () {
    expect(wrapper.find('[href="/about/acknowledgements"]')).to.have.lengthOf(1)
  })

  it('should have a `Resources` link', function () {
    expect(wrapper.find('[href="/about/resources"]')).to.have.lengthOf(1)
  })

  it('should have a `Contact Us` link', function () {
    expect(wrapper.find('[href="/about/contact"]')).to.have.lengthOf(1)
  })

  it('should have a `FAQ` link', function () {
    expect(wrapper.find('[href="/about/faq"]')).to.have.lengthOf(1)
  })

  it('should have a `Highlights` link', function () {
    expect(wrapper.find('[href="/about/highlights"]')).to.have.lengthOf(1)
  })

  it('should have a `Mobile App` link', function () {
    expect(wrapper.find('[href="/about/mobile-app"]')).to.have.lengthOf(1)
  })

  it('should have a `Donate` link', function () {
    expect(wrapper.find('[href="/about/donate"]')).to.have.lengthOf(1)
  })
})

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
    expect(wrapper.find('[href="/"]')).to.have.lengthOf(1)
  })

  it('should have a `Publications` link', function () {
    expect(wrapper.find('[href="/publications"]')).to.have.lengthOf(1)
  })

  it('should have an `Our Team` link', function () {
    expect(wrapper.find('[href="/team"]')).to.have.lengthOf(1)
  })

  it('should have a `Acknowledgements` link', function () {
    expect(wrapper.find('[href="/acknowledgements"]')).to.have.lengthOf(1)
  })

  it('should have a `Resources` link', function () {
    expect(wrapper.find('[href="/resources"]')).to.have.lengthOf(1)
  })

  it('should have a `Contact Us` link', function () {
    expect(wrapper.find('[href="/contact"]')).to.have.lengthOf(1)
  })

  it('should have a `FAQ` link', function () {
    expect(wrapper.find('[href="/faq"]')).to.have.lengthOf(1)
  })

  it('should have a `Highlights` link', function () {
    expect(wrapper.find('[href="/highlights"]')).to.have.lengthOf(1)
  })

  it('should have a `Mobile App` link', function () {
    expect(wrapper.find('[href="/mobile-app"]')).to.have.lengthOf(1)
  })

  it('should have a `Donate` link', function () {
    expect(wrapper.find('[href="/donate"]')).to.have.lengthOf(1)
  })
})

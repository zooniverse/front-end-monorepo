import { shallow } from 'enzyme'
import React from 'react'
import { Filter } from 'grommet-icons'
import CharacteristicsFilterLabel from './CharacteristicsFilterLabel'
import en from './locales/en'

describe('Component > CharacteristicsFilterLabel', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <CharacteristicsFilterLabel />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the label text', function () {
    expect(wrapper.contains(en.CharacteristicsFilterLabel.filter)).to.be.true()
  })

  it('should render the Filter icon', function () {
    expect(wrapper.find(Filter)).to.have.lengthOf(1)
  })
})

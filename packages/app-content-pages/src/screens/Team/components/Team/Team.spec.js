import { shallow } from 'enzyme'
import React from 'react'

import Team from '../Team'

let wrapper

const ID = 'foobar'
const NAME = 'The Screaming Panthers'
const PEOPLE = [
  { id: '1' },
  { id: '2' }
]

describe('Component > Team', function () {
  before(function () {
    wrapper = shallow(<Team id={ID} name={NAME} people={PEOPLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the team name', function () {
    expect(wrapper.find('Heading').shallow().text()).to.include(NAME)
  })

  it('should render a `<Person />` for each item in the `people` array prop', function () {
    const peopleWrapper = wrapper.find('Person')
    expect(peopleWrapper).to.have.lengthOf(PEOPLE.length)
    PEOPLE.forEach(function (PERSON) {
      expect(peopleWrapper.find(PERSON)).to.have.lengthOf(1)
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import DdSelect from './DdSelect'

describe('SimpleDropdownTask > DdSelect', function () {
  
  const options = [
    'Red',
    'Blue',
    'Green',
  ]
  
  const selectConfig = {
    allowCreate: false,
    required: false,
    title: 'Favourite colour',
  }
  
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(
        <DdSelect
          annotationValue={undefined}
          index={0}
          options={options}
          selectConfig={selectConfig}
          setAnnotation={() => {}}
        />
      )
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })
    
    it('should have no initial value', function () {
      const grommetSelect = wrapper.find('Select')
      expect(grommetSelect.props()['value']).to.equal(undefined)
    })
    
    it('should have a Grommet Select component set up to correctly read its option-values', function () {
      const grommetSelect = wrapper.find('Select')
      expect(grommetSelect.props()['labelKey']).to.equal('label')
      expect(grommetSelect.props()['valueKey']).to.equal('value')
    })
    
    it('should render the correct number of options', function () {
      const grommetSelect = wrapper.find('Select')
      const renderedOptions = grommetSelect.props()['options'] || []
      expect(renderedOptions).to.have.length(3)
      expect(renderedOptions[0].value).to.equal(options[0])
      expect(renderedOptions[1].value).to.equal(options[1])
      expect(renderedOptions[2].value).to.equal(options[2])
    })
  })

  describe('with an annotation', function () {
    let wrapper
    
    const annotationValue = {
      value: 'Blue',
      option: true,
    }

    before(function () {
      wrapper = shallow(
        <DdSelect
          annotationValue={annotationValue}
          index={0}
          options={options}
          selectConfig={selectConfig}
          setAnnotation={() => {}}
        />
      )
    })

    it('should pass the annotation value to the Grommet Select in the correct form', function () {
      const grommetSelect = wrapper.find('Select')
      expect(grommetSelect.props().value.value).to.equal('Blue')
    })
  })
})

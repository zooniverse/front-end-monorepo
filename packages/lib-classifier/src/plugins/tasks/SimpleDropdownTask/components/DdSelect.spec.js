import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import DdSelect from './DdSelect'

describe('SimpleDropdownTask > DdSelect', function () {
  
  const options = [
    {
      label: 'Red',
      value: 'hashed-value-R',
    },
    {
      label: 'Green',
      value: 'hashed-value-G',
    },
    {
      label: 'Blue',
      value: 'hashed-value-B',
    },
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
    
    it('should render the title', function () {
      expect(wrapper.contains(selectConfig.title)).to.be.true()
      console.log(wrapper.debug())
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
      expect(renderedOptions[0]).to.equal(options[0])
      expect(renderedOptions[1]).to.equal(options[1])
      expect(renderedOptions[2]).to.equal(options[2])
    })
  })

  describe('with an annotation', function () {
    let wrapper
    
    const annotationValue = {
      value: 'hashed-value-B',
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
      // Note that the annotation value is DIFFERENT from the value passed to Grommet's <Select>
      // annotation value       = { value: 'hashed-value-B', option: true }
      // value passed to Select = { value: 'hashed-value-B', label: 'Blue' }
      
      const grommetSelect = wrapper.find('Select')
      expect(grommetSelect.props()['value']).to.equal(options[2])
    })
  })
})

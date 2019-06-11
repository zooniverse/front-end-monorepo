import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { Box, Button, FormField, TextInput } from 'grommet'
import sinon from 'sinon'
import withCustomFormik from './withCustomFormik'

const MockForm = ({ handleBlur, handleChange, handleSubmit, values }) => (
  <Box as='form' onSubmit={handleSubmit}>
    <FormField htmlFor='testInput' label='Enter text' >
      <TextInput
        id='testInput'
        name='testInput'
        onBlur={handleBlur}
        onChange={handleChange}
        type='text'
        value={values.testInput}
      />
    </FormField>
    <Button type='submit' label='Submit' />
  </Box>
)

const WrappedMockForm = withCustomFormik(MockForm)

const initialValues = { testInput: '' }
const onSubmit = sinon.spy()

describe('Higher Order Component > withCustomFormik', function () {
  it('renders without crashing', function () {
    const wrapper = shallow(<WrappedMockForm initialValues={initialValues} onSubmit={onSubmit} />)
    expect(wrapper).to.be.ok()
  })

  it('should pass Formik required props', function () {
    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    )

    const formikHOC = wrapper.find('FormikHOC')

    expect(formikHOC.props().initialValues).to.equal(initialValues)
    expect(formikHOC.props().onSubmit).to.equal(onSubmit)
  })

  it('should pass Formik optional props', function () {
    const validate = sinon.spy()
    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={validate}
      />
    )
    const formikHOC = wrapper.find('FormikHOC')

    expect(formikHOC.props().validate).to.equal(validate)
  })

  it('should call onChange prop', function () {
    const onChangeStub = sinon.stub()

    const wrapper = mount(
      <WrappedMockForm
        initialValues={initialValues}
        onChange={onChangeStub}
        onSubmit={onSubmit}
      />
    )
    const formikProps = wrapper.find(MockForm).props()
    let testInput = wrapper.find('input[name="testInput"]')
    const eventMock = {
      target: {
        name: testInput.props().name,
        value: 'foo'
      }
    }

    expect(testInput.props().value).to.equal('')
    testInput.simulate('change', eventMock)
    // diry chai does not work with sinon chai
    expect(onChangeStub.withArgs(eventMock, formikProps)).to.have.been.calledOnce
    testInput = wrapper.find('input[name="testInput"]')
    // Formik's handleChange updates the input value for us based on the name attribute
    // Test that the internal Formik handleChange has been called and worked
    expect(testInput.props().value).to.equal('foo')
  })
})

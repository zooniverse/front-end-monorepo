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

describe.only('Higher Order Component > withCustomFormik', function () {
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

  it('should call the custom change handler on change', function () {

    const onChangeStub = sinon.stub()
    const wrapper = mount(
      <WrappedMockForm
        initialValues={initialValues}
        onChange={onChangeStub}
        onSubmit={onSubmit}
        ref={mockForm}
      />
    )
    const mockForm = wrapper.find(MockForm)
    const formikProps = mockForm.props()
    const eventMock = {
      target: {
        name: 'testInput',
        value: 'foo'
      }
    }
    const changeSpy = onChangeStub.callsFake((event, props) => console.log(event === eventMock, props === formikProps))

    formikProps.handleChange(eventMock, formikProps)
    console.log(changeSpy.callCount)
    expect(changeSpy.withArgs(eventMock, formikProps)).to.have.been.calledOnce()
  })
})

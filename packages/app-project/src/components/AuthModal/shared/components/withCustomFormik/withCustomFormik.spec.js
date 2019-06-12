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

  it('should call the custom change handler on change', function () {

    const onChangeStub = sinon.stub()
    const wrapper = mount(
      <WrappedMockForm
        initialValues={initialValues}
        onChange={onChangeStub}
        onSubmit={onSubmit}
      />
    )
    const eventMock = {
      target: {
        name: 'testInput',
        value: 'foo'
      }
    }
    const renderForm = wrapper.find('Formik').props().children
    const mockInnerProps = {
      values: {
        testInput: 'foo'
      },
      handleChange: sinon.stub()
    }

    const mockForm = renderForm(mockInnerProps)
    mockForm.props.handleChange(eventMock)
    expect(mockInnerProps.handleChange.withArgs(eventMock)).to.have.been.calledOnce()
    expect(onChangeStub.withArgs(eventMock, mockInnerProps)).to.have.been.calledOnce()
  })
})

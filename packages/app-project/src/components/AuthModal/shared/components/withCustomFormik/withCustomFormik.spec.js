import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { Box, Button, FormField, TextInput } from 'grommet'
import { Formik } from 'formik'
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
    const wrapper = shallow(<WrappedMockForm />)
    expect(wrapper).to.be.ok()
  })

  it('should pass Formik required props', function () {
    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    )

    const formikComponent = wrapper.find(Formik)

    expect(formikComponent.props().initialValues).to.equal(initialValues)
    expect(formikComponent.props().onSubmit).to.equal(onSubmit)
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
    const formikComponent = wrapper.find(Formik)

    expect(formikComponent.props().validate).to.equal(validate)
  })

  it('should call onChange prop', function () {
    const onChangeStub = sinon.stub()
    const eventMock = {}

    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onChange={onChangeStub}
        onSubmit={onSubmit}
      />
    )
    const formikProps = wrapper.dive().find(MockForm).props()
    const mockFormikProps = Object.assign({}, formikProps, { handleChange: sinon.stub() })

    wrapper.instance().handleChangeWithCallback(eventMock, mockFormikProps)
    expect(onChangeStub.withArgs(eventMock, mockFormikProps)).to.have.been.calledOnce
    expect(mockFormikProps.handleChange.withArgs(eventMock)).to.have.been.calledOnce
  })

  it('should call onBlur prop', function () {
    const onBlurStub = sinon.stub()
    const eventMock = {}

    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onBlur={onBlurStub}
        onSubmit={onSubmit}
      />
    )
    const formikProps = wrapper.dive().find(MockForm).props()
    const mockFormikProps = Object.assign({}, formikProps, { handleBlur: sinon.stub() })
    
    wrapper.instance().handleBlurWithCallback(eventMock, mockFormikProps)
    expect(onBlurStub.withArgs(eventMock, mockFormikProps)).to.have.been.calledOnce
    expect(mockFormikProps.handleBlur.withArgs(eventMock)).to.have.been.calledOnce
  })
})

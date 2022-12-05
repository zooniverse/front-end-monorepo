import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import { Formik } from 'formik'
import { Box, Button, FormField, Grommet, TextInput } from 'grommet'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
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
    const wrapper = shallow(
      <WrappedMockForm initialValues={initialValues} onSubmit={onSubmit} />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } }
    )
    expect(wrapper).to.be.ok()
  })

  it('should pass Formik required props', function () {
    const wrapper = shallow(
      <WrappedMockForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      />,
      { wrappingComponent: <Grommet /> , wrappingComponentProps: { theme: zooTheme } }
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
      />,
      { wrappingComponent: <Grommet />, wrappingComponentProps: { theme: zooTheme } }
    )
    const formikHOC = wrapper.find('FormikHOC')

    expect(formikHOC.props().validate).to.equal(validate)
  })

  describe('the wrapped form', function () {
    let onBlurStub, onChangeStub, wrapper, eventMock, InnerForm, mockForm
    const mockInnerProps = {
      values: {
        testInput: 'foo'
      },
      handleBlur: sinon.stub(),
      handleChange: sinon.stub(),
      handleSubmit: sinon.stub()
    }

    before(function () {
      onBlurStub = sinon.stub()
      onChangeStub = sinon.stub()
      wrapper = mount(
        <WrappedMockForm
          initialValues={initialValues}
          onBlur={onBlurStub}
          onChange={onChangeStub}
          onSubmit={onSubmit}
        />,
        { wrappingComponent: Grommet, wrappingComponentProps: { theme: zooTheme } }
      )
      eventMock = {
        target: {
          name: 'testInput',
          value: 'foo'
        }
      }

      // the form's children prop is a render function
      // ie. a stateless component
      InnerForm = wrapper.find(Formik).props().children

      mockForm = shallow(<InnerForm {...mockInnerProps} />)
    })

    
    Object.keys(mockInnerProps).forEach(function (key) {
      it(`should pass ${key} to the wrapped form`, function () {
        expect(mockForm.prop(key)).to.exist()
      })
    })

    it('should have a handleSubmit function', function () {
      expect(mockForm.props().handleSubmit).to.equal(mockInnerProps.handleSubmit)
    })

    it('should have a values object', function () {
      expect(mockForm.props().values).to.exist()
      expect(mockForm.props().values).to.equal(mockInnerProps.values)
    })
    
    it('should call the custom change handler on change', function () {
      mockForm.props().handleChange(eventMock)
      expect(mockInnerProps.handleChange.withArgs(eventMock)).to.have.been.calledOnce()
      expect(onChangeStub.withArgs(eventMock, mockInnerProps)).to.have.been.calledOnce()
    })

    it('should call the custom blur handler on blur', function () {
      mockForm.props().handleBlur(eventMock)
      expect(mockInnerProps.handleBlur.withArgs(eventMock)).to.have.been.calledOnce()
      expect(onBlurStub.withArgs(eventMock, mockInnerProps)).to.have.been.calledOnce()
    })
  })
})

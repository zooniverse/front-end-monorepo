import { Component, forwardRef } from 'react';
import PropTypes from 'prop-types'
import { Formik } from 'formik'

function withCustomFormik (WrappedComponent) {
  class FormikHOC extends Component {
    constructor () {
      super()

      this.handleBlurWithCallback = this.handleBlurWithCallback.bind(this)
      this.handleChangeWithCallback = this.handleChangeWithCallback.bind(this)
    }

    handleBlurWithCallback(event, formikProps) {
      formikProps.handleBlur(event)
      this.props.onBlur(event, formikProps)
    }

    handleChangeWithCallback (event, formikProps) {
      formikProps.handleChange(event)
      this.props.onChange(event, formikProps)
    }

    renderForm (props, ref) {
      // render the wrapped form but override handleChange with a custom callback
      const {
        handleBlur,
        handleChange,
        ...rest
      } = props
      const { handleBlurWithCallback, handleChangeWithCallback } = this

      function handleCustomBlur (event) {
        handleBlurWithCallback(event, props)
      }

      function handleCustomChange (event) {
        handleChangeWithCallback(event, props)
      }

      return (
        <WrappedComponent
          handleBlur={handleCustomBlur}
          handleChange={handleCustomChange}
          ref={ref}
          {...rest}
        />
      )
    }

    render () {
      const { forwardedRef, initialValues, onSubmit, ...optionalProps } = this.props
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          {...optionalProps}
        >
          {(innerProps) => this.renderForm(innerProps, forwardedRef)}
        </Formik>
      )
    }
  }

  FormikHOC.defaultProps = {
    forwardedRef: null,
    onBlur: () => {},
    onChange: () => {}
  }

  FormikHOC.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  const DecoratedFormikHOC = forwardRef(function (props, ref) {
    return <FormikHOC {...props} forwardedRef={ref} />
  })
  const name = WrappedComponent.displayName || WrappedComponent.name;
  DecoratedFormikHOC.displayName = `withCustomFormik(${name})`;
  DecoratedFormikHOC.wrappedComponent = WrappedComponent

  return DecoratedFormikHOC
}

export default withCustomFormik

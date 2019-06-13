import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

function withCustomFormik (WrappedComponent) {
  class FormikHOC extends React.Component {
    constructor () {
      super()

      this.handleChangeWithCallback = this.handleChangeWithCallback.bind(this)
    }

    handleChangeWithCallback (event, formikProps) {
      formikProps.handleChange(event)
      this.props.onChange(event, formikProps)
    }

    renderForm (props, ref) {
      // render the wrapped form but override handleChange with a custom callback
      const {
        handleChange,
        ...rest
      } = props
      const { handleChangeWithCallback } = this

      function handleCustomChange (event) {
        handleChangeWithCallback(event, props)
      }

      return (
        <WrappedComponent
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
    onChange: () => {}
  }

  FormikHOC.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  const DecoratedFormikHOC = React.forwardRef(function (props, ref) {
    return <FormikHOC {...props} forwardedRef={ref} />
  })
  const name = WrappedComponent.displayName || WrappedComponent.name;
  DecoratedFormikHOC.displayName = `withCustomFormik(${name})`;
  DecoratedFormikHOC.wrappedComponent = WrappedComponent

  return DecoratedFormikHOC
}

export default withCustomFormik

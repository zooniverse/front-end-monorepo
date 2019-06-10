import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

function withCustomFormik (WrappedComponent) {
  class FormikHOC extends React.Component {
    constructor () {
      super()

      this.handleBlurWithCallback = this.handleBlurWithCallback.bind(this)
      this.handleChangeWithCallback = this.handleChangeWithCallback.bind(this)
    }

    handleBlurWithCallback (event, formikProps) {
      formikProps.handleBlur(event)
      this.props.onBlur(event, formikProps)
    }

    handleChangeWithCallback (event, formikProps) {
      formikProps.handleChange(event)
      this.props.onChange(event, formikProps)
    }

    render () {
      const { initialValues, onSubmit, ...rest } = this.props
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          {...rest}
        >
          {(innerProps) => {
            const {
              handleBlur,
              handleChange,
              handleReset,
              handleSubmit,
              ...restOfInnerProps
            } = innerProps

            return (
              <WrappedComponent
                handleBlur={(event) => this.handleBlurWithCallback(event, innerProps)}
                handleChange={(event) => this.handleChangeWithCallback(event, innerProps)}
                {...restOfInnerProps}
              />
            )
          }}
        </Formik>
      )
    }
  }

  FormikHOC.defaultProps = {
    onBlur: () => {},
    onChange: () => {}
  }

  FormikHOC.propTypes = {
    initialValues: PropTypes.object.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  return FormikHOC
}

export default withCustomFormik

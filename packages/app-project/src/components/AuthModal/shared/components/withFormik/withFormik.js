import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

function withFormik (WrappedComponent) {
  class FormikHOC extends React.Component {
    constructor () {
      super()

      this.handleBlurWithCallback = this.handleBlurWithCallback.bind(this)
      this.handleChangeWithCallback = this.handleChangeWithCallback.bind(this)
    }

    handleBlurWithCallback (event, handleBlur, formikProps) {
      handleBlur(event)
      this.props.onBlur(event, formikProps)
    }

    handleChangeWithCallback (event, handleChange, formikProps) {
      handleChange(event)
      this.props.onChange(event, formikProps)
    }

    render () {
      const { initialValues, onSubmit } = this.props
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          {...this.props}
        >
          {(innerProps) => {
            const {
              handleBlur,
              handleChange,
              handleReset,
              handleSubmit
            } = innerProps

            return (
              <WrappedComponent
                onBlurEvent={(event) => this.handleBlurWithCallback(event, handleBlur, innerProps)}
                onChangeEvent={(event) => this.handleChangeWithCallback(event, handleChange, innerProps)}
                onResetEvent={handleReset}
                onSubmitEvent={handleSubmit}
                {...innerProps}
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
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  }

  return FormikHOC
}

export default withFormik

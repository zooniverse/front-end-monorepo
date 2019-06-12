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

    render () {
      const { forwardedRef, initialValues, onSubmit, ...optionalProps } = this.props
      return (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          {...optionalProps}
        >
          {(innerProps) => {
            const {
              handleChange,
              ...restOfInnerProps
            } = innerProps

            return (
              <WrappedComponent
                handleChange={(event) => this.handleChangeWithCallback(event, innerProps)}
                ref={forwardedRef}
                {...restOfInnerProps}
              />
            )
          }}
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

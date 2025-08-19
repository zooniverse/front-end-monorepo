import { forwardRef } from 'react';
import { func, object } from 'prop-types'
import { Formik } from 'formik'

const DEFAULT_HANDLER = () => true

function withCustomFormik (WrappedComponent) {
  function FormikHOC({
    forwardedRef = null,
    initialValues,
    onBlur = DEFAULT_HANDLER,
    onChange = DEFAULT_HANDLER,
    onSubmit = DEFAULT_HANDLER,
    ...optionalProps
  }) {

    function handleBlurWithCallback(event, formikProps) {
      formikProps.handleBlur(event)
      onBlur(event, formikProps)
    }

    function handleChangeWithCallback(event, formikProps) {
      formikProps.handleChange(event)
      onChange(event, formikProps)
    }

    function renderForm({ handleBlur, handleChange, ...rest } , ref) {
      function handleCustomBlur(event) {
        handleBlurWithCallback(event, { handleBlur, handleChange, ...rest })
      }

      function handleCustomChange(event) {
        handleChangeWithCallback(event, { handleBlur, handleChange, ...rest })
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

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        {...optionalProps}
      >
        {(innerProps) => renderForm(innerProps, forwardedRef)}
      </Formik>
    )
  }

  FormikHOC.propTypes = {
    initialValues: object.isRequired,
    onBlur: func,
    onChange: func,
    onSubmit: func.isRequired
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

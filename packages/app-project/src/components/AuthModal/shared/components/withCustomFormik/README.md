# withCustomFormik

This is a higher order component that wraps forms with the `Formik` component. This component is from the [formik](https://jaredpalmer.com/formik/) library that provides a declarative API to:

> Formik takes care of the repetitive and annoying stuff--keeping track of values/errors/visited fields, orchestrating validation, and handling submission

and

> Since form state is inherently local and ephemeral, Formik does not use external state management libraries like Redux or MobX. This also makes Formik easy to adopt incrementally and keeps bundle size to a minimum.

`withCustomFormik` is the same as the built in `withFormik` except it includes support for custom a onChange handler.

## Usage

Decorate or call your form component within the function like any other HOC:

``` js

@withCustomFormik
class MyForm extends React.Component {
  render() {
    return (
      <form>
        {// Rents of form HTML or components here}
      </form>
    )
  }
}
```

``` js

function MyForm (props) {
  render() {
    return (
      <form>
        {// Rents of form HTML or components here}
      </form>
    )
  }
}

export default withFormik(MyForm)
export { MyForm } // exported separately for testing
```

### Usage with Formik API

The formik API has two required props, so you need a parent container component to supply an onSubmit handler as well as initial form values:

``` js
// import withCustomFormik(MyForm)
import WrappedWithFormikForm from './MyForm'

class MyFormContainer extends React.Component {
  onSubmit (values) {
    // doStuff with form values
  }

  render () {
    const initialValues = {
      username: '',
      password: ''
    }

    return (
      <WrappedWithFormikForm
        initialValues={initialValues}
        onSubmit={this.onSubmit}
      />
    )
  }
}
```

You can also pass any non required Formik props in:

``` js
// import of withCustomFormik(MyForm)
import WrappedWithFormikForm from './MyForm'

class MyFormContainer extends React.Component {
  onSubmit (values) {
    // doStuff with form values
  }

  validate (values) {
    // synchronous validations on form inputs
  }

  render () {
    const initialValues = {
      username: '',
      password: ''
    }

    return (
      <WrappedWithFormikForm
        initialValues={initialValues}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}
```

These props get passed to the `<Formik>` component inside the `withFormik` HOC. Please read the Formik API docs on more information about these and other props: https://jaredpalmer.com/formik/docs/api/formik

### Customizing the onChange handler

Formik does not directly support customization of the onChange handler. The `withFormik` HOC here supports an `onChange` prop that get passed along and added to a function that will call the Formik's `handleChange` handler as well as the custom `onChange` prop. The prop are called with the DOM event as well as the rest of the Formik props, so you can do something like an async validation on the change event:

``` js
// import of withCustomFormik(MyForm)
import WrappedWithFormikForm from './MyForm'

class MyFormContainer extends React.Component {
  onSubmit (values) {
    // doStuff with form values
  }

  async checkNameForConflict (value) {
    // async validation
  }

  async checkEmailForConflict (value) {
    // async validation
  }

  async onChange (event, formikProps) {
    const { target: { name, value } } = event
    // See Formik API docs for what these all are...
    const { setFieldError } = formikProps
    if (name === 'username') {
      const nameErrorMessage = await this.checkNameForConflict(value)
      if (nameErrorMessage) setFieldError('username', nameErrorMessage)
    }

    if (name === 'email') {
      const emailErrorMessage = await this.checkEmailForConflict(value)
      if (emailErrorMessage) setFieldError('email', emailErrorMessage)
    }
  }

  render () {
    const initialValues = {
      username: '',
      email: '',
      password: ''
    }

    return (
      <WrappedWithFormikForm
        initialValues={initialValues}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        validate={this.validate}
      />
    )
  }
}
```

### Connecting the child form to Formik

The child form component will get passed along Formik's props: https://jaredpalmer.com/formik/docs/api/formik#formik-render-methods-and-props

At a minimum, inside your child form, you should set the inputs with `handleChange` on their onChange prop and `handleSubmit` to the submit button or the form's `onSubmit` prop. 

``` js

class MyForm extends React.Component {
  render (
    const { handleChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          Username:
          <input
            id='username'
            name='username'
            onChange={handleChange}
            type='text'
          />
        </label>
        <label htmlFor='password'>
          Password:
          <input
            id='password'
            name='password'
            onChange={handleChange}
            type='password'
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    )
  )
}
```

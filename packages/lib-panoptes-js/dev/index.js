import { signIn, addEventListener } from '@src/experimental-auth.js'

class App {
  constructor () {
    this.html = {
      loginForm: document.getElementById('login-form')
    }

    this.html.loginForm.addEventListener('submit', this.loginForm_onSubmit.bind(this))
    addEventListener('change', this.onAuthChange)
  }

  loginForm_onSubmit (e) {
    const formData = new FormData(e.target)
    signIn(formData.get('login'), formData.get('password'))

    e.preventDefault()
    return false
  }

  onAuthChange (e) {
    console.log('+++ Yahoo! We detected a change of user: ', e)
  }
}

function init () {
  new App()
}

window.onload = init
import { signIn } from '@src/experimental-auth.js'

class App {
  constructor () {
    this.html = {
      loginForm: document.getElementById('login-form')
    }

    this.html.loginForm.addEventListener('submit', this.loginForm_onSubmit.bind(this))
  }

  loginForm_onSubmit (e) {
    const formData = new FormData(e.target)
    signIn(formData.get('login'), formData.get('password'))

    e.preventDefault()
    return false
  }
}

function init () {
  new App()
}

window.onload = init
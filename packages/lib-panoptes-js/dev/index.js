import { signIn } from '@src/experimental-auth.js'

class App {
  constructor () {
    this.html = {
      loginForm: document.getElementById('login-form')
    }

    this.html.loginForm.addEventListener('submit', this.loginForm_onSubmit.bind(this))
  }

  loginForm_onSubmit (e) {
    console.log('+++ loginForm_onSubmit', e)

    experimentalAuth.signIn()
    
    e.preventDefault()
    return false
  }
}

function init () {
  new App()
}

window.onload = init
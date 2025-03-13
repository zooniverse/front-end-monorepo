import { signIn, addEventListener } from '@src/experimental-auth.js'

class App {
  constructor () {
    this.html = {
      loginForm: document.getElementById('login-form'),
      message: document.getElementById('message'),
    }

    this.html.loginForm.addEventListener('submit', this.loginForm_onSubmit.bind(this))
    addEventListener('change', this.onAuthChange)
  }

  async loginForm_onSubmit (e) {
    const formData = new FormData(e.target)
    e.preventDefault()

    try {
      // Note: await is necessary to catch sign in errors.
      const user = await signIn(formData.get('login'), formData.get('password'))
      if (user) {
        this.html.message.innerHTML += `> Logged in as ${user.login}\n`
      } else {
        throw new Error('No user?')
      }
    } catch (err) {
      console.error(err)
      this.html.message.innerHTML += `> ${err.toString()}\n`
    }
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
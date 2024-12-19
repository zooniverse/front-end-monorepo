import {
  checkBearerToken,
  checkCurrentUser,
  signIn,
  signOut,
  addEventListener,
} from '@src/experimental-auth.js'

class App {
  constructor () {
    this.html = {
      checkCurrentUserButton: document.getElementById('check-current-user-button'),
      signOutButton: document.getElementById('sign-out-button'),
      loginForm: document.getElementById('login-form'),
      message: document.getElementById('message'),
    }

    this.html.checkCurrentUserButton.addEventListener('click', this.checkCurrentUserButton_onClick.bind(this))
    this.html.signOutButton.addEventListener('click', this.signOutButton_onClick.bind(this))
    this.html.loginForm.addEventListener('submit', this.loginForm_onSubmit.bind(this))
    addEventListener('change', this.onAuthChange)
  }

  async checkCurrentUserButton_onClick (e) {
    try {
      const user = await checkCurrentUser()
      if (user) {
        this.html.message.innerHTML += `> Current user: ${user.login} \n`
      } else {
        this.html.message.innerHTML += `> Current user: [nobody] \n`
      }
    } catch (err) {
      console.error(err)
      this.html.message.innerHTML += `> [ERROR] ${err.toString()} \n`
    }
    return false
  }

  async signOutButton_onClick (e) {
    try {
      const success = await signOut()
      if (success) {
        this.html.message.innerHTML += `> Successfully signed out \n`
      } else {
        this.html.message.innerHTML += `> There's no user to sign out \n`
      }
    } catch (err) {
      console.error(err)
      this.html.message.innerHTML += `> [ERROR] ${err.toString()} \n`
    }
    return false
  }

  async loginForm_onSubmit (e) {
    const formData = new FormData(e.target)
    e.preventDefault()

    try {
      // Note: await is necessary to catch sign in errors.
      const user = await signIn(formData.get('login'), formData.get('password'))
      if (user) {
        this.html.message.innerHTML += `> Logged in as ${user.login} \n`
      } else {
        throw new Error('No user?')
      }
    } catch (err) {
      console.error(err)
      this.html.message.innerHTML += `> [ERROR] ${err.toString()} \n`
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
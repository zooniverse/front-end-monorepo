/*
Redirect To Sign In Page

After a short delay, this function redirects users to the Zooniverse sign in
page.  This is meant to be called by CommitResetForm, after the "commit reset"
action is successful.

As of Aug 2026, the "canonical" sign in page is https://www.zooniverse.org/accounts/sign-in
and it sits on PFE. As a result, we're using a very simple redirect code to
avoid any possible complications from traversing the FEM-PFE boundaries. 
 */

const WAIT_TIME = 6000  // 6 seconds
export const SIGN_IN_URL = '/accounts/sign-in'

export default async function redirectToSignInPage () {

  await sleep(WAIT_TIME)
  
  if (window && window.location) {
    window.location = SIGN_IN_URL
  }
}

function sleep (time = 0) {
  return new Promise(resolve => setTimeout(resolve, time))
}

# AuthModal

A modal dialog that provides a tabbed interface to either sign-in to your Zooniverse account, or create a new account. Password reset is handled by a link to the reset page. Sign-in is handled by the [Panoptes JS Client](https://zooniverse.github.io/panoptes-javascript-client/#panoptes-javascript-client-auth), using the [OAuth password flow](https://oauth.net/2/grant-types/password/). The selected tab state is controlled via component props.

```js
import { AuthModal } from '@zooniverse/react-components';
import { useState } from 'react';

function MyAuthComponent() {
  const [activeIndex, setActiveIndex] = useState(-1);

  // Sign in by activating the Sign In tab.
  function signIn() {
    setActiveIndex(0);
  }

  // Register by activating the Register tab.
  function register() {
    setActiveIndex(1);
  }

  // Close the modal by deselecting the active tab.
  function closeModal() {
    setActiveIndex(-1);
  }

  return (
    <button onClick={signIn}>Sign In</button>
    <button onClick={register}>Register</button>
    <AuthModal activeIndex={activeIndex} onActive={setActiveIndex} closeModal={closeModal} />
  );
}
```
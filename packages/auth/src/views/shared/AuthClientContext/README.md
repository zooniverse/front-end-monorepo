# AuthClientContext

The OAuth client returned by [js-client-oauth2](https://github.com/mulesoft/js-client-oauth2) is:

a) a non-serializable object
b) not part of the app state

...so we're not going to try and shoehorn it into `mobx-state-tree`'s volatile state or similar. Instead, we leverage the new [React 16 Context API](https://reactjs.org/docs/context.html) to pass it down the component tree.

We don't have access to the client at this point, so the initial value is an empty object.

# Layout Components

These are only functional view components. It is up to you to implement containers where needed to manage state. This library does not include state management so you can choose how to handle that.

These components are built using [grommet](https://grommet.github.io/). You will need to install the [zoo-grommet](https://github.com/zooniverse/zoo-grommet) theme to get the correct colors and fonts. You must also import the default css from this repository as well.

TODO: Add layout components that do not use grommet.

## ZooFooter

### Props

The navigation list props are available to you to have flexibility with React Router versions and flexibility with absolute or relative links. The default props use Grommet's <Anchor /> or <Button /> components and absolute links. If you need to define any of these props yourself, be sure to use the classes defined in the style file to inherit the correct styles that modify the original grommet styles.


| prop                   | propType                                                                              | default                                                                                                                                                  | Notes                                                                                                         |
|------------------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| aboutNavList           | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org about pages                                                                     |                                                                                                               |
| adminContainer         | PropTypes.node                                                                        | null                                                                                                                                                     | You must provide a container to manage state and pass down the expected props for the AdminCheckbox component |
| buildNavList           | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org lab and lab help pages                                                          |                                                                                                               |
| getInvolvedNavList     | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org get involved pages                                                              |                                                                                                               |
| homeLogoDiv            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))            |                                                                                                                                                          |                                                                                                               |
| mainSectionColorIndex  | PropTypes.string                                                                      | "light-1"                                                                                                                                                | This corresponds to a color set in the zoo-grommet theme                                                      |
| newsNavList            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to Daily Zoo and Zooniverse Blog                                                                     |                                                                                                               |
| policyNavList          | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to zooniverse.org policy and status pages                                                            |                                                                                                               |
| projectNavList         | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of a grommet anchor component that link to zooniverse.org projects page                                                                     |                                                                                                               |
| smallSectionColorIndex | PropTypes.string                                                                      | "light-2"                                                                                                                                                | This corresponds to a color set in the zoo-grommet theme                                                      |
| socialNavList          | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet button components that behave like anchors and social media components that link to Zooniverse Facebook, Twitter, and Instagram. |                                                                                                               |
| talkNavList            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of a grommet anchor component that link to zooniverse.org talk page                                                                         |                                                                                                               |

## AdminCheckbox

If you're working on a front-end app where being able to toggle admin mode would be useful, then build an AdminCheckboxContainer component using the state management of your choice and use AdminCheckbox as the rendered view. Pass your AdminCheckboxContainer component down as a prop to the ZooFooter and it will be rendered correctly. Be sure to pass down the props that AdminCheckbox is expecting.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| checked  | PropTypes.bool  | false        |       |
| label    | PropTypes.string | 'Admin Mode' |       |
| onChange | PropTypes.func  | () => {}     |       |

## AdminLayoutIndicator

This functional view component can be used in your main layout to have the striped bars while admin mode is on. Use it with whatever state management your app uses. It has no props and simply renders `<div className="admin-layout-indicator" title="Admin mode on!" />`

## ZooHeader

Top level view component for the Zooniverse Header using Grommet.

### Props

The `logoHomeLink` and `mainHeaderNavList` props are available to you to have flexibility with React Router versions and flexibility with absolute or relative links. The default props use Grommet's <Anchor /> components and absolute links. If you need to define any of these props yourself, be sure to use the classes defined in the style file to inherit the correct styles that modify the original grommet styles.

The `authContainer` prop can be passed a container component using the state management solution of your choice should be passed as a prop into the ZooHeader. The `authContainer` can use optional view components, LoginButton, LogoutButton, UserMenu, and UserNavigation, available in this library. It should also manage the UI state based on whether or not a user is authenticated. For example, a logged out user would see the `LoginButton` and a logged in user would see the `LogoutButton`.

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| authContainer  | PropTypes.node  | null        |       |
| logoHomeLink    | PropTypes.node.isRequired | A Grommet Anchor linked to http://www.zooniverse.org using the ZooniverseLogo icon |       |
| mainHeaderNavList | PropTypes.arrayOf(PropTypes.node).isRequired  | An array of Grommet anchor components linked to the top level Zooniverse pages     |       |

### Example `AuthContainer`

This example is from the edu-api-front-end using Grommet and JumpState for state management

```
export class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    if (!props.initialised) {
      Actions.checkLoginUser();
    }

    this.login = this.login.bind(this);
  }

  toggleOauthModal() {
    Actions.auth.toggleOauthModal();
  }

  login() {
    new Promise((resolve, reject) => {
      const location = this.props.location;
      if (location.pathname !== '/') resolve(storeLocation(location.pathname, location.search));
    }).then(
      Actions.loginToPanoptes()
    ).catch((error) => { redirectErrorHandler(error); });
  }

  logout() {
    Actions.logoutFromPanoptes();
  }

  loginWithGoogle() {
    let googleUrl = 'https://panoptes.zooniverse.org/users/auth/google_oauth2';

    if (env === 'development') {
      googleUrl = 'https://panoptes-staging.zooniverse.org/users/auth/google_oauth2';
    }

    Promise.resolve(storeLocation(location.pathname, location.search))
      .then(() => { window.location.href = googleUrl; })
      .catch((error) => { redirectErrorHandler(error); });
  }

  render() {
    let userMenuNavItems;
    if (this.props.user && this.props.initialised) {
      const login = this.props.user.login;
      userMenuNavList = [
        <Anchor href={`https://www.zooniverse.org/users/${login}`}>Profile</Anchor>,
        <Anchor href="https://www.zooniverse.org/settings">Settings</Anchor>,
        <Anchor href={`https://www.zooniverse.org/collections/${login}`}>Collections</Anchor>,
        <Anchor href={`https://www.zooniverse.org/favorites/${login}`}>Favorites</Anchor>,
        <LogoutButton logout={this.logout} />
      ];
    }


    return (this.props.user && this.props.initialised)
      ? <div>
          <UserNavigation />
          <UserMenu user={this.props.user} userMenuNavList={userMenuNavList} />
        </div>
      : <div>
          <LoginButton toggleForm={this.toggleOauthModal} />
          <OauthModal login={this.login} loginWithGoogle={this.loginWithGoogle} onClose={this.toggleOauthModal} showOauthModal={this.props.showOauthModal} />
        </div>;
  }
}
```

## LoginButton

Login button using Grommet. Pass either a `login` function prop or a `toggleModal` function prop. The `login` function should be the function to authenticate with Panoptes using oauth. The `toggleModal` function is for toggling the `OauthModal` instead. The state management solution of your choosing should manage the visibility state of the modal.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| className  | PropTypes.string  | 'zoo-header__button--as-link'        | The default Zoo Header style is like a link rather than a button |
| label    | PropTypes.oneOfType([PropTypes.node, PropTypes.string]) | 'Sign in' | Text or node label of the button |
| login | PropTypes.func  | null     | If you wish to only use the LoginButton, define the `login` function |
| plain    | PropTypes.bool | true | Whether or not it is a Grommet styled button or plain |
| toggleModal | PropTypes.func  | null     | If you wish to use the OauthModal, define the `toggleModal` function |

## LogoutButton

Logout button using Grommet. 

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| classname  | PropTypes.string  | 'zoo-header__button--as-link'        | The default Zoo Header style is like a link rather than a button |
| label    | PropTypes.oneOfType([PropTypes.node, PropTypes.string]) | 'Logout' | Text or node label of the button |
| logout | PropTypes.func.isRequired  | () => {}     |       |

## OauthModal

A modal for presenting options for oauth authentication with Panoptes. This will show a button either to sign in or register to Panoptes which links to Panoptes devise sign in view or a button that links directly to the sign in with Google via Panoptes.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| heading  | PropTypes.string  | 'Sign In'        |       |
| login    | PropTypes.func | () => {} | Define a function to oauth sign in with Panoptes which should redirect to Panoptes devise view. Using the panoptes-javascript-client, this funciton will probably be `oauth.signIn(computeRedirectURL(window))`. An example is in zoo-reduxify |
| loginWithGoogle | PropTypes.func  | () => {}     | Define a function to redirect Panoptes sign in with Google page directly |
| onClose  | PropTypes.func  | () => {}        | Define a function to close the modal (Set state to false) |
| showOauthModal    | PropTypes.bool | false | Boolean visibility state of the modal |
| signInGoogleLabel | PropTypes.string  | 'Sign in with Google'     |       |
| signInLabel | PropTypes.string  | 'Sign in or Register'     |       |

## UserNavigation

The notifications and messages links for signed in users. These are static links only at the moment and this is not built to handle the Sugar websockets to show the number of notifications like PFE currently does. The `userNavigationNavList` default props absolute link to zooniverse.org notification and inbox pages.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| userNavigationNavList  | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired  | An array of Grommet Anchors        |       |

## UserMenu

This is the signed in dropdown menu that contains links to the user profile, collections, and other pages as well as the LogoutButton. Currently the default Zooniverse styles for this component have to globally target some Grommet styles that override some of the Grommet defaults for the dropdown menu. Use with caution if you are using Grommet dropdown menus in your app currently. A fix has been merged into Grommet master, but hasn't been published to npm yet.

You must provide the `userMenuNavList` as there is no default prop. The default prop is not provided because the link hrefs must be dynamically created based on the user's login:

```
if (this.props.user && this.props.initialised) {
  const login = this.props.user.login;
  userMenuNavList = [
    <Anchor href={`https://www.zooniverse.org/users/${login}`}>Profile</Anchor>,
    <Anchor href="https://www.zooniverse.org/settings">Settings</Anchor>,
    <Anchor href={`https://www.zooniverse.org/collections/${login}`}>Collections</Anchor>,
    <Anchor href={`https://www.zooniverse.org/favorites/${login}`}>Favorites</Anchor>,
    <LogoutButton logout={this.logout} />
  ];
}
```

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| user  | PropTypes.shape({ display_name: PropTypes.string }).isRequired  | user: { display_name: '' } |       |
| userMenuNavList    | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | none | A default prop is not provided. You must supply the navigation list because the link hrefs are dynamically created based on the signed in user's login |

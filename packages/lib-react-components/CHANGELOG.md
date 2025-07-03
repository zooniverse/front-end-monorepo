# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added
- `IconActionButton` component, a styled Grommet `Button` that displays an icon with additional accessibility features and tooltip support

## [1.14.0] 2025-05-02

### Changed

- ZooFooter and ZooHeader styling to include `display: none;` when printing (`@media print`)
- PlainButton has text-decoration underline on hover even for links.
- ZooFooter links and labels updated to reflect newly launched FEM pages.
- Updated styling in ProjectCard's badge component.
- `useProgressiveImage`: run `onLoad` callbacks immediately when `delay` is 0. Add optional `onLoad` and `onError` event handlers for image `load` events.
- Add project state (paused, finished) overlay to ProjectCard.
- Add disciplines to the Projects links in ZooFooter

### Fixed

- refactor `AnimatedNumber` to fix a bug where deferred values are displayed as 0.
- Style RegisterForm as one column for `small` screensize.
- Project card badges are now circular in Safari.
- Inconsistent text sizes for Markdown tables and lists.
- `useUnreadNotifications` and `useUnreadMessages` now wait for Panoptes auth to complete before fetching data.
- `Modal`: add the `dialog` role and an accessible name. Pass keyboard focus to dialogs when they open.

## [1.13.0] 2024-05-17

### Added
- Added a `bodyBackground` prop to Modal to allow for custom background colors.
- Added a `ProjectCard` component originally developed in lib-user, but now need for widespread FEM use.
- Added a `Loader` component originally developed in app-project, but now used in app-root too.

### Changed
- Removed `pxToRem` function.
- Use `grommet-icons` for Notifications and Messages links in ZooHeader's mobile design. Removed `@fortawesome` from the lib.

### Fixed
- Added `d3` as peer dependency and grab available d3 methods from `@visx`.
- Fixed value in AnimatedNumber when a device prefers reduced motion.
- SpacedText `weight` prop type to allow for `number` values.

## [1.12.0] 2024-03-04

### Added
Added an `onSignIn` function to AuthModal. A handler than can be called in the parent app when a user registers or signs-in.
Added `AnimatedNumber` component, an interpolation animation of integers from 0 to `value`.

### Changed
Standardized the variable name for when a user is using admin mode to `adminMode`.

### Fixed
Media's Video component was nesting an unused Anchor component. Removed it.

## [1.11.0] 2023-12-04

### Added
Added an optional theme toggle to ZooHeader.
Added a `useHasMounted` hook for lazy loading.

### Fixed
Fixed spacing around components in ZooFooter and ZooHeader toward standardizing padding through FEM pages.

## [1.10.1] 2023-11-29

### Fixed
- fix a bug where unread notifications and messages are fetched for empty user objects.

## [1.10.0] 2023-11-22

### Fixed
Added missing `@zooniverse/panoptes-js` package (used by Panoptes data-fetching hooks.)

### Added
- `Media` can now display text subjects.

## [1.9.1] 2023-11-16

### Fixed
Added missing `swr` package (used by Panoptes data-fetching hooks.)

## [1.9.0] 2023-11-08

### Added
- `AuthModal` component for Zooniverse username/password sign-in, and Zooniverse user registration.
- New hooks for working with authenticated Panoptes users:
  - `usePanoptesUser`: exchange a Panoptes session cookie for an authenticated user session.
  - `useUnreadMessages`: check unread private messages.
  - `useUnreadNotifications`: check unread Talk notifications.

## [1.8.1] 2023-11-02

### Fixed
- `SpacedHeading` was not passing `size` to its child `SpacedText`. This fix allows the font-size to be adjusted as a prop in `SpacedHeading`.

## [1.8.0] 2023-10-30

### Changed
- `Markdownz`: replace `remark` with `markdownz` and `rehype`.

## [1.7.0] 2023-10-26
### Changed
- build with Node 20.

## [1.6.4] 2023-10-05

### Fixed
- export `package.json` for build tools.

## [1.6.3] 2023-09-30

### Fixed
- restore module field in `package.json`.

## [1.6.2] 2023-09-19

### Fixed
- display `Media` images inline.
- `Markdownz`: convert line breaks to `<br>`.

## [1.6.1] 2023-09-18

### Fixed
- Fix ESM import errors when the library is loaded with `require`.

## [1.6.0] 2023-09-12

### Changed
- modularise exports for more efficient tree-shaking.

## [1.5.6] 2023-09-04

### Changed
- refactor `SignedInUserNavigation` to avoid hydration errors during SSR.

## [1.5.5] 2023-08-15

### Changed
- add `sideEffects: false` to enable pruning of unused exports during tree-shaking.

## [1.5.4] 2023-06-01

### Fixed
- Add missing `cuid` dependency for JSON data media.

## [1.5.3] 2023-05-25

### Fixed
- `SpacedText`: Change margin prop type to allow object.

## [1.5.2] 2023-05-04

### Changed
- `ThumbnailImage`: Change the default height and width from `999px` to an empty string.

## [1.5.1] 2023-03-29

### Changed
- Ignore mock data and screenshots in the published package.

## [1.5.0] 2023-03-20

### Added
- The `Media` component now supports previews for JSON scatter plots, using the same schemas as `@zooniverse/classifier`.

## [1.4.1] 2023-01-28

### Fixed
- Removed the default drop-down menu icon from the hamburger menu button on small screens.

## [1.4.0] 2023-01-13

### Changed
- Replaced the webpack UMD build (`dist/main.js`) with a Babel CommonJS transform (`dist/cjs/index.js`).

## [1.3.3] 2023-1-12

### Changed
- Refactor Markdownz's handling of custom image dimensions by allowing height to be undefined.

## [1.3.2] 2022-12-12

### Changed
- Change `polished` from a dev dependency to a standard dependency.

## [1.3.1] 2022-12-05

### Removed
- Removed source maps from webpack builds.

## [1.3.0] 2022-12-01

### Added
- Added an ES6 build for loaders that use ES Modules.

### Changed
- Use an `i18next` instance specific to this library, rather than modifying the default instance.
- Optimised `lodash` imports for tree-shaking.
- Replaced `mime-types` with `mime/lite`.
- Enabled the React automatic runtime.

### Removed
- Removed `@fortawesome/react-fontawesome` and `@fortawesome/fontawesome-svg-core`.

## [1.2.1] 2022-11-03

### Added
- Export `useProgressiveImage` hook.

### Changed
- Removed `react-progressive-image` from the `Media` component.

## [1.2.0] 2022-10-03

### Added
- Added Grommet's `target` and `full` props to modal layers.
- Added standard width sizes to PrimaryButton according to design
- Localisation with `react-i18n`, including full Spanish translations!

### Fixed
- Changed `LinkList` component to use `fit-content` CSS styling to render correct height in Safari.
- Modified matchRegex in `ping` of `Markdownz` to avoid creating username-links in typed email addresses.
- Fixed buttons that could be rendered like disabled buttons, but still functioned as links. Grommet's `Button` allows you to add an `href` prop which will render a link (HTML anchor tag) styled like a button. It, however, accepts all `Button` props including `disabled`, but links can't be disabled. We now prevent this by checking to see if an `href` is defined and if `disabled` is true and instead render a span via the `as` prop. This impacts `PrimaryButton` and `PlainButton` which directly use Grommet's `Button`. For `CloseButton`, we've destructured `href` from the props to make sure it's not passed along because it doesn't make sense to render this component as a link.
- Markdownz wasn't handling ordered lists as expected. The fix includes upgrading `remark` to v12, installing `remark-footnotes`, and manually applying some style attributes to `<ol>` and `<ul>`.
- add the `react-rnd` `default`, `position` and `size` props to `MovableModal`.
- Allow `CloseButton` to be clicked on touch devices.
- catch errors in `Markdownz` during server-side rendering.
- Remove `header` tag and `presentation` role from `ZooHeader`.
- Replace deprecated Grommet `tag` with styled-components `as` in Grommet components.

### Changed
- All components use `react-i18next` instead of `counterpart` for translations management.

## [1.1.0] 2021-05-26

### Added
- Stories and readme for MetaToolsButton
- Custom theme object for `Markdownz` which defines styles for headings and anchors

### Fixed
- Allow for modals that can't be closed. [#1983]
- Arrow position is now correct based on the position set by tippyjs-react for the Tooltip
- Restore default colours for the Modal and MovableModal components.
- Update Modal spacing to reflect the Zooniverse design system.
- Allow the colour of the Modal close button to be changed based on the ModalHeading text colour.
- Removed hardcoded margin-top from MetaToolsButton. Leave spacing to the consuming library.
- Removed the hardcoded cancel string for MovableModal applied to Rnd.
- Manually parse images in Markdownz children before passing to `remark` to provide backwards compatible custom img sizes previously used with `markdown-it-imsize`.

### Changed
- Updated text color on green `PrimaryButton` variant

### Removed
- Removed GoldButton component in favor of PrimaryButton which defaults to gold theme colors. Added GoldButton as an alias for the PrimaryButton export as to not make a breaking change.

## [1.0.2] 2020-07-15
- Patch fix previous version with correctly built package

## [1.0.1] 2020-07-15
- Export ZooniverseLogotype, which renders the Zooniverse logotype as an SVG that is often used in a site's footer

## [1.0.0] 2020-06-29
- Publish rebuild of library. This allows the following components to be accessible via the `@zooniverse/react-components` package:
  - AdminCheckbox
  - CloseButton
  - FavouritesButton
  - GoldButton
  - Markdownz
  - Media
  - MetaToolsButton
  - Modal
  - MovableModal
  - PlainButton
  - PrimaryButton
  - SpacedHeading
  - SpacedText
  - Tab
  - Tooltip
  - ZooFooter
  - ZooHeader
  - ZooniverseLogo

## [Unpublished] 2018-09-12

- Start rebuild of library

## [0.7.1] 2018-01-02
### Fixed
- Only show the Google sign in button if props.loginWithGoogle function is defined

## [0.7.0] 2017-11-10
### Added
- SignedInUserNavigation component and tests
- SignedOutUserNavigation component and tests
- MobileNavigationMenu component, default styles, and tests
- Higher order component function withMobileView and tests

### Changed
- ZooHeader is now wrapped by withMobileView which toggles hiding the desktop navigation menu
- ZooHeader now supports prop.isAdmin which determines whether or not to show the Anchor component that links to the admin page
- UserNavigation is now wrapped by withMobileView which determines what kind of label to use for the Anchor components.
- UserNavigation navigation props changed to separate props for the notifications and messages links so that they could be targeted by the mobile view state for the label change.
- Updated shared default styles between UserMenu and MobileNavigationMenu

## [0.6.3] 2017-10-26
### Fixed
- Fixed Tutorial function binding and missing period in preferences query

## [0.6.2] 2017-10-24
### Fixed
- Fixed Tutorial static methods to open component if tutorial isn't finished

## [0.6.1] 2017-10-18
### Fixed
- Added exports for MediaCard and StepThrough components

## [0.6.0] 2017-10-16
### Added
- MediaCard component and tests
- StepThrough component and tests
- Tutorial component and tests
- Default CSS for Tutorial and child components
- Added `animated-scrollto` dependency for StepThrough component
- Added `markdownz` dependency for Tutorial component
- Added `react-swipe` dependency for StepThrough component

## [0.5.0] 2017-10-10
### Added
- ZooHeader component and tests
- OauthModal component and tests
- OauthGoogleIcon component and tests
- LoginButton component and tests
- LogoutButton component and tests
- UserMenu component and tests
- UserNavigation component and tests
- Default CSS for ZooHeader and child components

### Changed
- Reorganized css folder and imports

## [0.4.4] 2017-08-16
### Fixed
- Add missing default styles for AdminLayoutIndicator

## [0.4.3] 2017-08-11
### Fixed
- Fixed border color and base font size for the default styles for ZooFooter

## [0.4.2] 2017-08-10
### Fixed
- Fixed AdminLayoutIndicator export
- Fixed eslint configs and bumped dependency versions
- Use hosted image for footer

## [0.4.1] 2017-08-10
### Fixed
- Fixed AdminCheckbox export
- Fixed ZooFooter export

## [0.4.0] 2017-08-10
### Added
- ZooFooter component, default CSS, and tests
- AdminCheckbox component and tests
- AdminLayoutIndicator component and tests
- Added `dirty-chai` for tests
- Added `grommet` dependency for ZooFooter and AdminCheckbox components
- Specified node 8 and npm 5 in package.json and added package-lock.json file
- Added travis configuration file, so tests will run when a PR is submitted

### Fixed
- Added className props to ZooniverseLogo and ZooniverseLogotype to better support modifying the SVG styles
- Updated `jsdom` dependency and setup configuration for testing so it works with later versions of enzyme
- Fixed how the URL is formed to make sure it uses the origin prop in DisplayNameSlugEditor

### Changed
- Updated `react` and `react-dom` dependencies
- Updated to use the `prop-types` dependency for React PropTypes
- Updated `react-select` dependency
- Changed Paginator selection text to use a prop and minor default CSS margin change

## [0.3.0] 2017-07-17
### Added
- Paginator component and tests

### Fixed
- Removed default syling from ZooniverseLogo
- Added class method to DisplayNameSlugEditor to access state values

## [0.2.0] 2017-05-25
### Added
- DisplayNameSlugEditor component and tests
- ImageSelector component and tests

### Fixed
- Removed capitalization from package name to conform with NPM requirements

## [0.1.2] 2017-02-20
### Fixed
- Fixed build

## [0.1.1] 2017-02-17
### Fixed
- Fixed broken onChange handler and returned values in `UserSearch` component

## [0.1.0] 2017-02-02
### Added

- DragAndDrop component
- FileButton component
- MediaIcon component
- Thumbnail component
- UserSearch component
- Default styles for DragAndDrop and MediaIcon
- Build scripts to transpile stylus and jsx into css and js in lib folder
- Mocha tests for DragAndDrop and MediaIcon
- Added Babel, Yarn, and ESLint

### Changed
- Switched from gulp to webpack
- Updated dependency for React

### Removed
- Removed old experimental components

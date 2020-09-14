# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unpublished]
### Fixed
- Arrow position is now correct based on the position set by tippyjs-react for the Tooltip
- Restore default colours for the Modal and MovableModal components.
- Update Modal spacing to reflect the Zooniverse design system.
- Allow the colour of the Modal close button to be changed based on the ModalHeading text colour.

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

# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.1.1]
### Changed
- updated package repo description.

## [3.1.0]
### Added
- Set `CheckBox` gap to a margin of 10px
- Build with Node 16.

## [3.0.0]
### Added
- Added drawing tool colors as `drawing-${variableName}` and to the colors object for utility use
- Added highlighter tool colors as `highlighter-${variableName}` and to the colors object for utility use
- Set border color on inputs to `light-5`
- Set `dark-6` to be `#666666`
- Set default icon colors to be `dark-6` for light theme and `light-6` for dark theme
- Set size of the `CheckBox` icon and toggle size

### Changed
- Lowered font weight for form input text.
- Removed border radius on inputs
- Changed the name for the colors `drawing-purple` to `drawing-pink` and `drawing-pink` to `drawing-ruby` for clarity.
- `#6D91B3` color set to `accent-3` deprecated. The accent series of variables are updated to accommodate the deprecation.
- `#345446` and `#0C4881` set to `neutral-1` and `neutral-3` deprecated. The neutral series of variables are updated to accommodate the deprecations.
- `status-ok` color updated to be `#1ED359` for better contrast
- Updated README

## [2.2.0] 2019-09-23
### Added
- Negative edge sizes

### Changed
- Added color information to README

## [2.1.0] 2019-08-20
### Added
- Zooniverse colors, fonts, and brand styles for specific components

## [2.0.0] 2018-12
### Added

- Initial theme object structured using Grommet's theme convention

# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] 2022-10-03
- update header parsing to allow any header to be set.
- add internal hostnames to speed up API requests across the Zooniverse kubernetes cluster.
- remove `pages` from project requests.
- add `talkAPI` client.
- Remove `url-parse`.

## [0.1.2] 2022-2-28
- Bump `url-parse` dependency to 1.15.10.

## [0.1.1] 2019-10-14
### Fixed
- Moves @zooniverse/standard and snazzy to be dev dependencies. Fixes issue with installing the package from npm because @zooniverse/standard is not published.

## [0.1.0] 2019-09-23
### Added
- Base helpers for HTTP requests GET, PUT, POST, and DELETE
- Client configuration file for which API host to use depending on environment
- Project, Subject, Tutorial, and Collection resource request helpers
- Media resource test mocks
- User resource test mocks
- Tests
- Documentation
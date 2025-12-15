# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.1] 2025-12-3
- Fix missing file name extension `.js` in /resources/users/index.js.

## [1.0.0] 2025-12-3
- Convert CJS syntax and module type to ESM

## [0.6.0] 2025-09-15
- Replaced `mocha` with `vitest`.
- Uninstalled `chai`, `chai-dom`, `sinon-chai`, `dirty-chai`, and `sinon`.
- Removed restriction on Node > v20.18 (not reflected in the changelog, but all FEM packages can now use Node v20.19).

## [0.5.2] 2025-04-17
- Bump `jose` to 5.2.
- Bump `mocha` to 10.3.
- Bump `nock` to 13.5.
- Bump `jsdom` to v24.

## [0.5.1] 2023-11-22
- Bump `jose` to 5.1.

## [0.5.0] 2023-10-26
- build with Node 20.

## [0.4.1] 2023-08-24
- fix a check for the `/projects` path.

## [0.4.0] 2023-07-04
- add `auth.decodeJWT(token)` to get a Panoptes user from a token.
- allow `auth` methods to accept Authorization headers (which are used in the Classifier) as well as tokens.

## [0.3.0] 2023-05-25
- add JWT verification as `auth.verify(token)`.

## [0.2.3] 2022-12-05
- require `superagent` 8.0.6 or higher.

## [0.2.2] 2022-12-05
- fix duplicate `repository` field.

## [0.2.1] 2022-12-05
- updated package repo description.
- bump sinon to 15.0.
- bump mocha to 10.1.

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

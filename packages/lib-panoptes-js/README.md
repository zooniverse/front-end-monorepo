# Panoptes.js

A Javascript client for [Panoptes API](https://github.com/zooniverse/Panoptes) using [Superagent](https://github.com/visionmedia/superagent).

## Description

A new take on a javascript client for [Panoptes](https://github.com/zooniverse/Panoptes). This client is designed to be stateless. It is up to the consumers of the library to decide how to store the responses from Panoptes as state.

TODO: Add documentation about consumer apps of this library like the classifier app.

## Getting Started

Install the client from NPM:

```
npm i @zooniverse/panoptes-js
```

and use it

ES6

```
import { panoptes } from '@zooniverse/panoptes-js';
```

## Documentation

The repository contains readme files under each sub-folder.

## Tests

Run the tests by command line:

```
pnpm test
```

Tests are run by [Vitest](https://vitest.dev)

Panoptes API data fixture mocks are built on top of [nock](https://github.com/nock/nock) plugin.

Browser web standard emulation is provided by [JSDOM](https://github.com/jsdom/jsdom)

## Contributing

See the [contributing documentation](docs/CONTRIBUTING.md) for more information.

## License

Copyright 2018 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.



# Zooniverse Grommet Theme

A Zooniverse theme for the [Grommet 2.0](https://grommet.github.io/) React component library.

## Usage

To use this theme, import it and pass it as a prop to the top-level `Grommet` component:

```javascript

import React from 'react'
import grommetTheme from '@zooniverse/grommet-theme'
import { Button, Grommet } from 'grommet'

class MyComponent extends React.Component {
  render() {
    return (
      <Grommet theme={grommetTheme}>
        <Button color="teal" label="Click me!" />
      </Grommet>
    )
  }
}

```

## License

Copyright 2018 Zooniverse

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

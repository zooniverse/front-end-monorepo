# Zooniverse Grommet Theme

A Zooniverse theme for the [Grommet 2.0](https://grommet.github.io/) React component library. [Zooniverse brand](https://projects.invisionapp.com/dsm/zooniverse/primary-brand/folder/colors/5bbd0dbcd018e900118186e8).

## Usage

To use this theme, import it and pass it as a prop to the top-level `Grommet` component:

```javascript
import { Button, Grommet, base as baseTheme } from 'grommet'
import React from 'react'
import merge from 'lodash/merge'
import zooTheme from '@zooniverse/grommet-theme'

class MyComponent extends React.Component {
  // Deep merging the base and new theme is recommended by the Grommet team
  // Use which ever deep merge function you'd like
  const mergedTheme = merge({}, baseTheme, zooTheme)
  render() {
    return (
      <Grommet theme={mergedTheme}>
        <Button color='brand' label='Click me!' />
      </Grommet>
    )
  }
}
```

## Development

The conventions of the theme structure are based on Grommet's base theme: https://github.com/grommet/grommet/blob/master/src/js/themes/base.js

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

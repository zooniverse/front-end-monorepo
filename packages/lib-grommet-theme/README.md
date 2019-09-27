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

## Theme colors

[Zooniverse brand colors](https://projects.invisionapp.com/dsm/zooniverse/primary-brand/folder/colors/5bbd0dbcd018e900118186e8) map to the following variable names in the theme:

| theme variable | hex |
| ----------- | --------- |
| 'accent-1' | '#B8E986' |
| 'accent-2' | '#f6d885' |
| 'accent-3' | '#6D91B3' |
| 'accent-4' | '#addde0' |
| 'brand' | '#00979d' |
| 'dark-1' | '#2D2D2D' |
| 'dark-2' | '#272727' |
| 'dark-3' | '#333333' |
| 'dark-4' | '#404040' |
| 'dark-5' | '#5C5C5C' |
| 'dark-6' | '#5C5C5C' |
| 'light-1' | '#eff2f5' |
| 'light-2' | '#ebebeb' |
| 'light-3' | '#e2e5e9' |
| 'light-4' | '#CBCCCB' |
| 'light-5' | '#a6a7a9' |
| 'light-6' | '#979797' |
| 'neutral-1' | '#345446' |
| 'neutral-2' | '#005D69' |
| 'neutral-3' | '#0C4881' |
| 'neutral-4' | '#f0b200' |
| 'status-critical' | '#E45950' |
| 'status-error' | '#FFB6AA' |
| 'status-warning' | '#CC9200' |
| 'status-ok' | '#078F52' |
| 'status-unknown' | '#CBCCCB' |
| 'status-disabled' | '#CBCCCB' |

Colors for components defaults, text, focus, placeholder, borders, etc are set from these in the theme. Additionally, any Grommet component that accepts a color for a prop can be passed in the variable name to set it, i.e. `<Box background={{ light: 'dark-2', dark: 'light-2' }}>`

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

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

| theme variable | hex | color |
| - | - | - |
| `accent-1` | `#B8E986` | <div style="background: #B8E986; height: 2rem;"></div> |
| `accent-2` | `#f6d885` | <div style="background: #f6d885; height: 2rem;"></div> |
| `accent-3` | `#6D91B3` | <div style="background: #6D91B3; height: 2rem;"></div> |
| `accent-4` | `#addde0` | <div style="background: #addde0; height: 2rem;"></div> |
| `brand` | `#00979d` | <div style="background: #00979d; height: 2rem;"></div> |
| `dark-1` | `#2D2D2D` | <div style="background: #2D2D2D; height: 2rem;"></div> |
| `dark-2` | `#272727` | <div style="background: #272727; height: 2rem;"></div> |
| `dark-3` | `#333333` | <div style="background: #333333; height: 2rem;"></div> |
| `dark-4` | `#404040` | <div style="background: #404040; height: 2rem;"></div> |
| `dark-5` | `#5C5C5C` | <div style="background: #5C5C5C; height: 2rem;"></div> |
| `dark-6` | `#5C5C5C` | <div style="background: #5C5C5C; height: 2rem;"></div> |
| `light-1` | `#eff2f5` | <div style="background: #eff2f5; height: 2rem;"></div> |
| `light-2` | `#ebebeb` | <div style="background: #ebebeb; height: 2rem;"></div> |
| `light-3` | `#e2e5e9` | <div style="background: #e2e5e9; height: 2rem;"></div> |
| `light-4` | `#CBCCCB` | <div style="background: #CBCCCB; height: 2rem;"></div> |
| `light-5` | `#a6a7a9` | <div style="background: #a6a7a9; height: 2rem;"></div> |
| `light-6` | `#979797` | <div style="background: #979797; height: 2rem;"></div> |
| `neutral-1` | `#345446` | <div style="background: #345446; height: 2rem;"></div> |
| `neutral-2` | `#005D69` | <div style="background: #005D69; height: 2rem;"></div> |
| `neutral-3` | `#0C4881` | <div style="background: #0C4881; height: 2rem;"></div> |
| `neutral-4` | `#f0b200` | <div style="background: #f0b200; height: 2rem;"></div> |
| `status-critical` | `#E45950` | <div style="background: #E45950; height: 2rem;"></div> |
| `status-error` | `#FFB6AA` | <div style="background: #FFB6AA; height: 2rem;"></div> |
| `status-warning` | `#CC9200` | <div style="background: #CC9200; height: 2rem;"></div> |
| `status-ok` | `#078F52` | <div style="background: #078F52; height: 2rem;"></div> |
| `status-unknown` | `#CBCCCB` | <div style="background: #CBCCCB; height: 2rem;"></div> |
| `status-disabled` | `#CBCCCB` | <div style="background: #CBCCCB; height: 2rem;"></div> |

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

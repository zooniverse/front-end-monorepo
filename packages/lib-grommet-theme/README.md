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
| `accent-1` | `#B8E986` | ![](https://via.placeholder.com/80x30.png/B8E986?text=+) |
| `accent-2` | `#f6d885` | ![](https://via.placeholder.com/80x30.png/f6d885?text=+) |
| `accent-3` | `#6D91B3` | ![](https://via.placeholder.com/80x30.png/6D91B3?text=+) |
| `accent-4` | `#addde0` | ![](https://via.placeholder.com/80x30.png/addde0?text=+) |
| `brand` | `#00979d` | ![](https://via.placeholder.com/80x30.png/00979d?text=+) |
| `dark-1` | `#2D2D2D` | ![](https://via.placeholder.com/80x30.png/2D2D2D?text=+) |
| `dark-2` | `#272727` | ![](https://via.placeholder.com/80x30.png/272727?text=+) |
| `dark-3` | `#333333` | ![](https://via.placeholder.com/80x30.png/333333?text=+) |
| `dark-4` | `#404040` | ![](https://via.placeholder.com/80x30.png/404040?text=+) |
| `dark-5` | `#5C5C5C` | ![](https://via.placeholder.com/80x30.png/5C5C5C?text=+) |
| `dark-6` | `#5C5C5C` | ![](https://via.placeholder.com/80x30.png/5C5C5C?text=+) |
| `drawing-red` | `#FF3C25` | ![](https://via.placeholder.com/80x30.png/FF3C25?text=+) |
| `drawing-orange` | `#235DFF` | ![](https://via.placeholder.com/80x30.png/235DFF?text=+) |
| `drawing-yellow` | `#FFFF03` | ![](https://via.placeholder.com/80x30.png/FFFF03?text=+) |
| `drawing-green` | `#FF9300` | ![](https://via.placeholder.com/80x30.png/FF9300?text=+) |
| `drawing-lightBlue` | `#06FE76` | ![](https://via.placeholder.com/80x30.png/06FE76?text=+) |
| `drawing-blue` | `#0CFFE0` | ![](https://via.placeholder.com/80x30.png/0CFFE0?text=+) |
| `drawing-purple` | `#FF40FF` | ![](https://via.placeholder.com/80x30.png/FF40FF?text=+) |
| `drawing-pink` | `#FF2B70` | ![](https://via.placeholder.com/80x30.png/FF2B70?text=+) |
| `light-1` | `#eff2f5` | ![](https://via.placeholder.com/80x30.png/eff2f5?text=+) |
| `light-2` | `#ebebeb` | ![](https://via.placeholder.com/80x30.png/ebebeb?text=+) |
| `light-3` | `#e2e5e9` | ![](https://via.placeholder.com/80x30.png/e2e5e9?text=+) |
| `light-4` | `#CBCCCB` | ![](https://via.placeholder.com/80x30.png/CBCCCB?text=+) |
| `light-5` | `#a6a7a9` | ![](https://via.placeholder.com/80x30.png/a6a7a9?text=+) |
| `light-6` | `#979797` | ![](https://via.placeholder.com/80x30.png/979797?text=+) |
| `neutral-1` | `#345446` | ![](https://via.placeholder.com/80x30.png/345446?text=+) |
| `neutral-2` | `#005D69` | ![](https://via.placeholder.com/80x30.png/005D69?text=+) |
| `neutral-3` | `#0C4881` | ![](https://via.placeholder.com/80x30.png/0C4881?text=+) |
| `neutral-4` | `#f0b200` | ![](https://via.placeholder.com/80x30.png/f0b200?text=+) |
| `neutral-5` | `#43BBFD` | ![](https://via.placeholder.com/80x30.png/43BBFD?text=+) |
| `neutral-6` | `#ffffff` | ![](https://via.placeholder.com/80x30.png/ffffff?text=+)
| `status-critical` | `#E45950` | ![](https://via.placeholder.com/80x30.png/E45950?text=+) |
| `status-error` | `#FFB6AA` | ![](https://via.placeholder.com/80x30.png/FFB6AA?text=+) |
| `status-warning` | `#CC9200` | ![](https://via.placeholder.com/80x30.png/CC9200?text=+) |
| `status-ok` | `#078F52` | ![](https://via.placeholder.com/80x30.png/078F52?text=+) |
| `status-unknown` | `#CBCCCB` | ![](https://via.placeholder.com/80x30.png/CBCCCB?text=+) |
| `status-disabled` | `#CBCCCB` | ![](https://via.placeholder.com/80x30.png/CBCCCB?text=+) |

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

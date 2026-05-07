# Zooniverse Grommet Theme

A Zooniverse theme for the [Grommet 2.0](https://grommet.github.io/) React component library. [Zooniverse brand](https://www.figma.com/proto/HUWCyrjkwgPsGKLXhLGb21/Design-System?type=design&node-id=1-2&t=BhMF5SH2wLWBuNx6-0&scaling=scale-down-width&page-id=0%3A1&starting-point-node-id=1%3A2]).

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

[Zooniverse brand colors](https://www.figma.com/proto/HUWCyrjkwgPsGKLXhLGb21/Design-System?type=design&node-id=1-10&t=BhMF5SH2wLWBuNx6-0&scaling=scale-down-width&page-id=0%3A1&starting-point-node-id=1%3A2) map to the following variable names in the theme:

| theme variable | hex | color |
| - | - | - |
| `accent-1` | `#addde0` | ![](https://placehold.co/80x30/addde0.png) |
| `accent-2` | `#f6d885` | ![](https://placehold.co/80x30/f6d885.png) |
| `accent-3` | `#B8E986` | ![](https://placehold.co/80x30/B8E986.png) |
| `accent-4` | `#FFB6AA` | ![](https://placehold.co/80x30/FFB6AA.png) |
| `brand` | `#00979d` | ![](https://placehold.co/80x30/00979d.png) |
| `dark-1` | `#2D2D2D` | ![](https://placehold.co/80x30/2D2D2D.png) |
| `dark-2` | `#272727` | ![](https://placehold.co/80x30/272727.png) |
| `dark-3` | `#333333` | ![](https://placehold.co/80x30/333333.png) |
| `dark-4` | `#404040` | ![](https://placehold.co/80x30/404040.png) |
| `dark-5` | `#5C5C5C` | ![](https://placehold.co/80x30/5C5C5C.png) |
| `dark-6` | `#666666` | ![](https://placehold.co/80x30/666666.png) |
| `drawing-red` | `#FF3C25` | ![](https://placehold.co/80x30/FF3C25.png) |
| `drawing-orange` | `#FF9300` | ![](https://placehold.co/80x30/FF9300.png) |
| `drawing-yellow` | `#FFFF03` | ![](https://placehold.co/80x30/FFFF03.png) |
| `drawing-green` | `#06FE76` | ![](https://placehold.co/80x30/06FE76.png) |
| `drawing-aqua` | `#0CFFE0` | ![](https://placehold.co/80x30/0CFFE0.png) |
| `drawing-blue` | `#235DFF` | ![](https://placehold.co/80x30/235DFF.png) |
| `drawing-pink` | `#FF40FF` | ![](https://placehold.co/80x30/FF40FF.png) |
| `drawing-ruby` | `#FF2B70` | ![](https://placehold.co/80x30/FF2B70.png) |
| `highlighter-red` | `#E65252` | ![](https://placehold.co/80x30/E65252.png) |
| `highlighter-orange` | `#F1AE4D` | ![](https://placehold.co/80x30/F1AE4D.png) |
| `highlighter-yellow` | `#FCED54` | ![](https://placehold.co/80x30/FCED54.png) |
| `highlighter-pink` | `#EE7BCF` | ![](https://placehold.co/80x30/EE7BCF.png) |
| `highlighter-honeysuckle` | `#C7F55B` | ![](https://placehold.co/80x30/C7F55B.png) |
| `highlighter-green` | `#52DB72` | ![](https://placehold.co/80x30/52DB72.png) |
| `highlighter-turquoise` | `#65EECA` | ![](https://placehold.co/80x30/65EECA.png) |
| `highlighter-sky` | `#7CDFF2` | ![](https://placehold.co/80x30/7CDFF2.png) |
| `highlighter-blue` | `#8AA0D3` | ![](https://placehold.co/80x30/8AA0D3.png) |
| `highlighter-purple` | `#C17DDF` | ![](https://placehold.co/80x30/C17DDF.png) |
| `highlighter-plum` | `#E7BBE3` | ![](https://placehold.co/80x30/E7BBE3.png) |
| `light-1` | `#eff2f5` | ![](https://placehold.co/80x30/eff2f5.png) |
| `light-2` | `#ebebeb` | ![](https://placehold.co/80x30/ebebeb.png) |
| `light-3` | `#e2e5e9` | ![](https://placehold.co/80x30/e2e5e9.png) |
| `light-4` | `#CBCCCB` | ![](https://placehold.co/80x30/CBCCCB.png) |
| `light-5` | `#a6a7a9` | ![](https://placehold.co/80x30/a6a7a9.png) |
| `light-6` | `#979797` | ![](https://placehold.co/80x30/979797.png) |
| `neutral-1` | `#005D69` | ![](https://placehold.co/80x30/005D69.png) |
| `neutral-2` | `#f0b200` | ![](https://placehold.co/80x30/f0b200.png) |
| `neutral-3` | `#1ED359` | ![](https://placehold.co/80x30/1ED359.png) |
| `neutral-4` | `#E45950` | ![](https://placehold.co/80x30/E45950.png) |
| `neutral-5` | `#43BBFD` | ![](https://placehold.co/80x30/43BBFD.png) |
| `neutral-6` | `#ffffff` | ![](https://placehold.co/80x30/ffffff.png) |
| `neutral-7` | `#000000` | ![](https://placehold.co/80x30/000000.png) |
| `status-critical` | `#E45950` | ![](https://placehold.co/80x30/E45950.png) |
| `status-error` | `#FFB6AA` | ![](https://placehold.co/80x30/FFB6AA.png) |
| `status-warning` | `#CC9200` | ![](https://placehold.co/80x30/CC9200.png) |
| `status-ok` | `#1ED359` | ![](https://placehold.co/80x30/1ED359.png) |
| `status-unknown` | `#CBCCCB` | ![](https://placehold.co/80x30/CBCCCB.png) |
| `status-disabled` | `#CBCCCB` | ![](https://placehold.co/80x30/CBCCCB.png) |

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

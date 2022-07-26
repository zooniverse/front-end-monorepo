# withFeatureFlag

Render a component only if an experimental feature is enabled for that project.

Usage:
```js
import React from 'react'
import { withFeatureFlag } from '@helpers'
import QuickTalk from './QuickTalk'


export default withFeatureFlag(QuickTalk, 'quicktalk')
```

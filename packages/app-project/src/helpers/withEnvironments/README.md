# withEnvironments

Render a component in specific deployment environments. For example, this renders `LocaleSwitcher` in development and staging, but not on the production site.

Usage:
```js
import React from 'react'
import { withEnvironments } from '@helpers'
import LocaleSwitcher from './LocaleSwitcher'


export default withEnvironments(LocaleSwitcher, 'development,staging')
```

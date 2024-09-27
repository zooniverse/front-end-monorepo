# VolumetricViewer

This directory holds all the relevant code for rendering the VolumetricViewer. There are two primary exports:

- `VolumetricViewerComponent` - a React component for the VolumetricViewer
- `VolumetricViewerData` - a function that returns the data within instantiated models along wi React Component

## Usage

Import the `VolumetricViewerComponent` and use as you would any other React component.

Import the `VolumetricViewerData` function and use to generate a stateful object with component as an attribute of the return object upon instantiation.

```javascript
import { VolumetricViewerData } from './VolumetricViewerData'

const { data, component } = VolumetricViewerData({ subjectUrl: 'https://some.url.to/base64.data' })
```

With the returned object, you can choose when and where to render the component as well as setup listeners for any state changes on any of the models.


# VolumetricViewer

This directory holds all the relevant code for rendering the VolumetricViewer. There are two primary exports:

- `VolumetricViewerComponent` - a React component for the VolumetricViewer
- `VolumetricViewerData` - a function that returns the data with instantiated models along with the React Component

NOTE: Webpack has trouble importing from a node_module package from dependent package chains (`lib-subject-viewers` => `lib-classifier` => `app-project`), therefore we have inlined `OrbitControls.js` file so that it works without Webpack issues. When updating the `three` dependency in `package.json` make sure to copy the file from `node_modules/three/examples/jsm/controls/OrbitControls.js` to `lib-subject-viewers/src/VolumetricViewer/helpers/OrbitControls.js`.
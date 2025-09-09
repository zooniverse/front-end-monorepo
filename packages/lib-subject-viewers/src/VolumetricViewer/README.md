# VolumetricViewer

This directory holds all the relevant code for rendering the VolumetricViewer. There are three primary React component exports:

- `VolumetricFull` - the full VolumetricViewer with annotation capabilities
- `VolumetricView` - the full VolumetricViewer without annotation capabilities
- `VolumetricPreview` - a paired down viewer for previewing only the Cube

NOTE: OrbitControls are typically imported as `import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'` but that syntax throws an error due to FEM not being pure ESM, therefore we have inlined `OrbitControls.js` file so that it works without bundling issues. When updating the `three` dependency in `package.json` make sure to copy the file from `node_modules/three/examples/jsm/controls/OrbitControls.js` to `lib-subject-viewers/src/VolumetricViewer/helpers/OrbitControls.js`.

NOTE: The sub-foldering of the exported components within the VolumetricViewer directory is to aid in proper path mapping for the export naming convention outlined in the `package.json` file.
Specifically, by foldering we allow the `./*` convention to utilize the directory structure for exposing `index.js` files.

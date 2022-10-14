# Flipbook Viewer

13 Oct 2022

## Context

Migration of projects from PFE to FEM requires building the flipbook viewer for classification of non-transcription subjects with multiple images.

## Decision

The Flipbook Viewer is a separate viewer than the Multiframe Viewer. The Multiframe viewer is designed and built for transription projects where pan, zoom, rotate, and annotations do not need to be consistent when flipping through multiple frames per subject.

The Flipbook Viewer will have the same features as PFE, and its design is catered to landscape oriented subject images. [Invision Design](https://projects.invisionapp.com/prototype/Flipbook-Viewer-cl7ar8qa402m83i01w6uvj5hq)

## Features

Features of the FEM Flipbook Viewer will include:
1. Thumbnails of each subject's images below the currently selected image. Clicking these buttons will change the currently selected image. 
2. Next/Back buttons to navigate through available thumbnails.
3. Play/Pause to flip/animate through the images.
4. Switching between the "flipbook" display and "separate images" display.
5. Full use of the ImageToolbar component (pan, zoom, rotate, invert, etc).
6. Control of playback speed (options similar to VideoController: 4x, 2x, 1x, 0.5x, 0.25x).

## Status

Accepted

# ADR 45: Custom Video Controls

10 Oct 2022

## Context
The video subject viewer was built as part of the migration of projects with video subjects from PFE to FEM. In PFE, video subjects are displayed with native browser controls plus custom playback speed buttons.

In FEM, custom video controls are planned for building drawing tools layers on top of a video subject. The `react-player` used to display a video subject has built-in (native browser) controls, but their position overlaps some of the video. When an svg is placed on top of the player to record annotations, the built-in controls become unusable, hence the need for custom controls displayed below the subject.

## Decision
The end goal for the video subject viewer is to always display custom video controls for consistency - regardless if a project uses drawing tools with a video subject. However, migration of projects from PFE to FEM requires seemlessly moving video subjects to FEM's video subject viewer. There are no launched projects that use video subjects + drawing tools and the custom controls are incomplete. Therefore, further development of custom video controls will be paused and FEM's video subject viewer will use the same native browser controls as PFE for already-launched non-drawing-tools projects.

See [PR 3684](https://github.com/zooniverse/front-end-monorepo/pull/3684) for more discussion.

## Consequences
The video subject viewer will be deployed without custom video controls for now. Future work toward projects with video subjects + drawing tools is tracked in the [Video Annotations](https://github.com/zooniverse/front-end-monorepo/projects/13) project board.

## Status
Accepted


# ADR 29: Video Player

Created: Dec 8, 2020

## Context

Future projects using the `front-end-monorepo` will require a video player. Some projects may simply need a video to play. Some projects will require users to interact with a video file; such as make annotations on the video to mark locations or item sizes. The video player must be highly customizable, able to be used in a React code base project and support all major browsers.

## Decision

We will implement `react-player` [Github](https://github.com/CookPete/react-player).
Demo Page: [Demo](https://cookpete.com/react-player/)

### Media

`react-player` is a React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion. [Supported Media](https://github.com/CookPete/react-player#supported-media)

### Customization

A wide range of [Props](https://github.com/CookPete/react-player#props) can be passed in to control playback and react to events.

Please read through the [Github](https://github.com/CookPete/react-player) for a full list of features.

## Status

Pending

## Consequences

- `react-player` is not guaranteed to function properly on mobile devices. This appears to apply only to the `autoplay` feature.
  `The HTML5 <video> element, in certain mobile browsers (such as Chrome and Safari), only allows playback to take place if it’s initiated by a user interaction (such as tapping on the player).`

# ADR 29: Video Player

Created: Dec 8, 2020

## Context

Future projects using the `front-end-monorepo` will require a video player. Some projects may simply need a video to play. Some projects will require users to interact with a video file; such as make annotations on the video to mark locations or item sizes. The video player must be highly customizable, able to be used in a React code base project and support all major browsers.

## Decision

We will implement `react-player` [Github](https://github.com/CookPete/react-player).
Demo Page: [Demo](https://cookpete.com/react-player/)
The lengthy list of attributes (props) and Callback Props makes `react-player` a great choice for developers who need customization. Many of these attributes are simply booleans. For example, to play a video, pass in `playing={boolean}`. Full list of [Props](https://github.com/CookPete/react-player#props)
Compared to the native HTML video player, `react-player` makes it easy to customize styling so the player looks the same across different browsers.
Making `react-player` responsive is easy by targeting pre-defined classNames.
[Responsiveness](https://github.com/cookpete/react-player#responsive-player)
One of the biggest wins of using `react-player` is ease-of-use. This will reduce developer time and reduce the amount of custom methods in our code base.

### Media

`react-player` is a React component for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion. [Supported Media](https://github.com/CookPete/react-player#supported-media)

Although `react-player` supports a number of externally hosted videos, we will only support video files uploaded to the Zooniverse platform.
File types will be validated to ensure the files are mp4.

### Customization

A wide range of [Props](https://github.com/CookPete/react-player#props) can be passed in to control playback and react to events.

Please read through the [Github](https://github.com/CookPete/react-player) for a full list of features.

## Status

Approved

## Consequences

- `react-player` is not guaranteed to function properly on mobile devices. This appears to apply only to the `autoplay` feature.
  `The HTML5 <video> element, in certain mobile browsers (such as Chrome and Safari), only allows playback to take place if it’s initiated by a user interaction (such as tapping on the player).`
  This is acceptable for the Zooniverse platform since we don't auto-play video for accessibility reasons.
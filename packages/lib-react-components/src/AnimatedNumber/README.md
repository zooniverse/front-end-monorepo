## AnimatedNumber

This component is a span styled to animate from integar 0 to the given `value` prop over the timed `duration` prop. It uses `d3` transition with interpolation, formats the number to include commas. An IntersectionObserver detects when the element is in a user's viewport, then triggers the animation only once.

If a user has "prefers reduced motion" set on their device, the animation is cancelled and the `value` simply displayed immediately.

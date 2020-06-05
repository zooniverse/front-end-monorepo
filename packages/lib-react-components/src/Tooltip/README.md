`Tooltip` uses [@tippyjs/react](https://github.com/atomiks/tippyjs-react) which is a React implementation of tippy.js and popper.js. This component is wrapped around a child React component that is used as a trigger to render the tooltip on mouseover or focus, like a button. The child component must be able to have refs fowarded to it to function.

## Example

```js
<Tooltip
  label='helpful tip'
>
  <Button label='click me' onClick={onClick} />
</Tooltip>
```

## Props

The props are the same as what is supported by @tippyjs/react, but a few specifically are defined:

- arrow: (boolean) Defaults to `true`. Determines whether to render a directional arrow.
- animation: (string) Defaults to `'scale'`. Type of animation to use when rendering the tooltip.
- children: (node) Required. Child component that triggers the rendering of the tooltip on certain events.
- label: (string) Required. The text of the tip.
- placement: (string) Defaults to `'top'`. The placement of the tooltip relative to the child node target. Placement automatically flips position if the viewport is not big enough for the default placement. See the storybook for an example.
- trigger: (string). Defaults to `'mouseover focus'`. The event(s) that triggers the tooltip to render.

Any other @tippyjs/react props can be defined and passed. 

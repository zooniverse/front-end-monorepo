# IconActionButton

A styled Grommet `Button` component that displays an icon with additional accessibility features and tooltip support.

## Props

- `active` (bool): Indicates whether the button is active. Default `false`.
- `a11yTitle` (string): Accessibility title for screen readers.
- `disabled` (bool): Disables the button when set to `true`. Default `false`.
- `dropProps` (object): Configuration for the tooltip's drop alignment. Default `{ align: { top: 'bottom' } }`.
- `icon` (node|object): The icon to display inside the button.
- `onBlur` (func): Callback function triggered on blur.
- `onClick` (func): Callback function triggered on click.
- `onFocus` (func): Callback function triggered on focus.
- `onPointerDown` (func): Callback function triggered on pointer down.
- `onPointerOut` (func): Callback function triggered on pointer out.
- `onPointerOver` (func): Callback function triggered on pointer over.
- `onPointerUp` (func): Callback function triggered on pointer up.
- `theme` (object): Theme configuration, including `dark` mode.

## Example Usage

```jsx
import { IconActionButton } from './IconActionButton';
import { CircleInformation } from 'grommet-icons';

<IconActionButton
  a11yTitle="Metadata"
  icon={<CircleInformation />}
  active={true}
  onClick={() => console.log('Button clicked!')}
/>
```

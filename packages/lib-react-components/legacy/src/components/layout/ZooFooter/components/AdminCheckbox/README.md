## AdminCheckbox

If you're working on a front-end app where being able to toggle admin mode would be useful, then build an AdminCheckboxContainer component using the state management of your choice and use AdminCheckbox as the rendered view. Pass your AdminCheckboxContainer component down as a prop to the ZooFooter and it will be rendered correctly. Be sure to pass down the props that AdminCheckbox is expecting.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| checked  | PropTypes.bool  | false        |       |
| colorTheme | PropTypes.string  | 'light'  | For toggling between the Zooniverse light and dark themes |
| label    | PropTypes.string | 'Admin Mode' |       |
| onChange | PropTypes.func  | () => {}     |       |
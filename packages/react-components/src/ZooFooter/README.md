The standard Zooniverse footer to be used on Zooniverse sites. Built using:

- [React](http://reactjs.org/)
- [Grommet v2](https://v2.grommet.io/components)
- [styled-components](https://www.styled-components.com/)
- [styled-theming](https://github.com/styled-components/styled-theming)
- @zooniverse/grommet-theme

The `ZooFooter` has two available theme variants with the light and dark themes provide in @zooniverse/grommet-theme. The theme defaults to `light` in its `colorTheme` prop. If you want to toggle between the themes, you must update the `colorTheme` prop to `dark`. How to manage the state of which theme is set is up to the consuming app. 

### Props

The navigation list props (the props ending with `URLs`) are available to you to have flexibility with absolute or relative links. The default props use absolute links. For translations, the `en.json` is in the `locales` folder and additional locales can be added there for additional language support. 

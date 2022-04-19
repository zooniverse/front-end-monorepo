The standard Zooniverse footer to be used on Zooniverse sites. Built using:

- [React](http://reactjs.org/)
- [Grommet v2](https://v2.grommet.io/components)
- [styled-components](https://www.styled-components.com/)
- [styled-theming](https://github.com/styled-components/styled-theming)
- @zooniverse/grommet-theme

The `ZooFooter` has two available theme variants with the light and dark themes provided in `@zooniverse/grommet-theme`. Like Grommet core, the state is set by the theme `dark` property; how to manage the state of which theme is set is up to the consuming app.

### Props

The navigation list props (the props ending with `URLs`) are available to you to have flexibility with absolute or relative links. The default props use absolute links.

Locale is passed down from app-project. The page layout in FEM always includes ZooFooter, so calling i18n.changeLanguage in ZooFooter whenever locale changes results in all components imported from lib-react-components updating with the new language.

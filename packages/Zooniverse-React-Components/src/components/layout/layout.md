# Layout Components

These are only functional view components. It is up to you to implement containers where needed to manage state. This library does not include state management so you can choose how to handle that.

These components are built using [grommet](https://grommet.github.io/). You will need to install the [zoo-grommet](https://github.com/zooniverse/zoo-grommet) theme to get the correct colors and fonts. You must also import the default css from this repository as well.

TODO: Add layout components that do not use grommet.

## ZooFooter

### Props

The navigation list props are available to you to have flexibility with React Router versions and flexibility with absolute or relative links. The default props use Grommet's <Anchor /> or <Button /> components and absolute links. If you need to define any of these props yourself, be sure to use the classes defined in the style file to inherit the correct styles that modify the original grommet styles.


| prop                   | propType                                                                              | default                                                                                                                                                  | Notes                                                                                                         |
|------------------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| aboutNavList           | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org about pages                                                                     |                                                                                                               |
| adminContainer         | PropTypes.node                                                                        | null                                                                                                                                                     | You must provide a container to manage state and pass down the expected props for the AdminCheckbox component |
| buildNavList           | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org lab and lab help pages                                                          |                                                                                                               |
| getInvolvedNavList     | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to the zoonverse.org get involved pages                                                              |                                                                                                               |
| homeLogoDiv            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string]))            |                                                                                                                                                          |                                                                                                               |
| mainSectionColorIndex  | PropTypes.string                                                                      | "light-1"                                                                                                                                                | This corresponds to a color set in the zoo-grommet theme                                                      |
| newsNavList            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to Daily Zoo and Zooniverse Blog                                                                     |                                                                                                               |
| policyNavList          | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet anchor components that link to zooniverse.org policy and status pages                                                            |                                                                                                               |
| projectNavList         | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of a grommet anchor component that link to zooniverse.org projects page                                                                     |                                                                                                               |
| smallSectionColorIndex | PropTypes.string                                                                      | "light-2"                                                                                                                                                | This corresponds to a color set in the zoo-grommet theme                                                      |
| socialNavList          | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of grommet button components that behave like anchors and social media components that link to Zooniverse Facebook, Twitter, and Instagram. |                                                                                                               |
| talkNavList            | PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.string])).isRequired | An array of a grommet anchor component that link to zooniverse.org talk page                                                                         |                                                                                                               |

## AdminCheckbox

If you're working on a front-end app where being able to toggle admin mode would be useful, then build an AdminCheckboxContainer component using the state management of your choice and use AdminCheckbox as the rendered view. Pass your AdminCheckboxContainer component down as a prop to the ZooFooter and it will be rendered correctly. Be sure to pass down the props that AdminCheckbox is expecting.

### Props

| prop     | propType        | default      | notes |
|----------|-----------------|--------------|-------|
| checked  | PropTypes.bool  | false        |       |
| label    | PropTypes.label | 'Admin Mode' |       |
| onChange | PropTypes.func  | () => {}     |       |

## AdminLayoutIndicator

This functional view component can be used in your main layout to have the striped bars while admin mode is on. Use it with whatever state management your app uses. It has no props and simply renders `<div className="admin-layout-indicator" title="Admin mode on!" />`


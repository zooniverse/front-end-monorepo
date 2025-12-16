import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Zooniverse User Library',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});

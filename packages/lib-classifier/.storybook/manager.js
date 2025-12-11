import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Zooniverse Classifier',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});

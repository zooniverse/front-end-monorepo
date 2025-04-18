import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Zooniverse Content Pages',
});

addons.setConfig({
  panelPosition: 'bottom',
  theme,
});

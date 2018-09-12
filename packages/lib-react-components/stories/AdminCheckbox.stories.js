import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { withNotes } from '@storybook/addon-notes';

import { backgrounds } from './lib'
import { AdminCheckbox } from '../src'
import adminDocs from '../src/ZooFooter/components/AdminCheckbox/README.md'

const stories = storiesOf('AdminCheckbox', module);

stories.addDecorator(withKnobs);

stories.addDecorator(backgrounds)

stories.add('Light theme (default)', withNotes(adminDocs)(() => (
  <AdminCheckbox checked={boolean('checked', false)} onChange={action('admin toggle change')} />
)))

stories.add('Dark theme', () => (
  <AdminCheckbox
    checked={boolean('checked', false)}
    colorTheme="dark"
    onChange={action('admin toggle change')}
  />
))

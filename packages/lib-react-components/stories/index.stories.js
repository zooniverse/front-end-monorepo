import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { ZooFooter } from '../src'


storiesOf('ZooFooter', module)
  .add('with light theme', () => <ZooFooter />)
  .add('with dark theme', () => (
    <ZooFooter />
  ));

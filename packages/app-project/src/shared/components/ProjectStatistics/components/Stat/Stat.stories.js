import React from 'react';
import { storiesOf } from '@storybook/react';
import Stat from './Stat'

storiesOf('Shared/Components/Project Statistics/Stat', module)
  .add('Default', () => (
    <Stat
      label='Volunteers'
      value={122}
    />
  ))
  .add('Huge number', () => (
    <Stat
      label='Volunteers is a long word'
      value={122000000}
    />
  ))
  .add('Zero', () => (
    <Stat
      label='Zero'
      value={0}
    />
  ))
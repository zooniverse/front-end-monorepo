import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';
import { withNotes } from '@storybook/addon-notes';
import { AdminCheckbox } from '../src'
import adminDocs from '../src/components/layout/ZooFooter/components/AdminCheckbox/README.md'

class AdminContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      checked: false
    }
  }

  onChange(event) {
    this.setState({ checked: event.target.checked })
  }

  render() {
    return (<AdminCheckbox checked={this.state.checked} onChange={this.onChange.bind(this)} />)
  }
}

const stories = storiesOf('AdminCheckbox', module);

stories.addDecorator(withKnobs);

stories.add('default', withNotes(adminDocs)(() => (
  <AdminCheckbox checked={boolean('checked', false)} onChange={action('admin toggle change')} />
)))
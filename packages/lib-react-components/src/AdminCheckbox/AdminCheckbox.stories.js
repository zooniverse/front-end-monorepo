import { withActions } from '@storybook/addon-actions';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import React from 'react';

import AdminCheckbox from './AdminCheckbox';
import readme from './README.md';

const config = {
  docs: {
    description: {
      component: readme,
    },
  },
};

export default {
  title: 'Components/AdminCheckbox',
  decorators: [withActions('change #admin-checkbox')],
};

export const LightThemeDefault = () => <AdminCheckboxStoryExample />;

LightThemeDefault.story = {
  name: 'Light theme (default)',
  parameters: config,
};

export const DarkTheme = () => <AdminCheckboxStoryExample colorTheme="dark" />;

DarkTheme.story = {
  name: 'Dark theme',
  parameters: config,
};

class AdminCheckboxStoryExample extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      checked: false,
    };
  }

  onChange(event) {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  }

  render() {
    const mergedThemes = Object.assign({}, zooTheme, { dark: this.props.colorTheme === 'dark' });

    return (
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1',
        }}
        theme={mergedThemes}
        themeMode={this.props.colorTheme === 'dark' ? 'dark' : 'light'}
      >
        <Box align="center" justify="center" height="medium">
          <AdminCheckbox checked={this.state.checked} onChange={this.onChange} />
        </Box>
      </Grommet>
    );
  }
}

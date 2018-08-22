import React from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Grommet } from 'grommet';
import { ThemeProvider } from 'styled-components';

import counterpart from 'counterpart';
import en from './locales/en';

import zooTheme from '@zooniverse/grommet-theme';

counterpart.registerTranslations('en', en)


function AdminCheckbox({ checked, colorTheme, label, onChange, theme }) {
  return (
    <Grommet theme={theme}>
      <ThemeProvider theme={{ mode: colorTheme }}>
        <CheckBox
          checked={checked}
          id="admin-checkbox"
          name="admin-checkbox"
          label={label}
          onChange={onChange}
          toggle={true}
        />
      </ThemeProvider>
    </Grommet>
  );
};

AdminCheckbox.defaultProps = {
  checked: false,
  colorTheme: 'light',
  label: counterpart('AdminCheckbox.label'),
  onChange: () => {},
  theme: zooTheme
};

AdminCheckbox.propTypes = {
  checked: PropTypes.bool,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  label: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.object
};

export default AdminCheckbox;
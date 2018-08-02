import React from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Grommet } from 'grommet';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';

import counterpart from 'counterpart';
import en from './locales/en';

import zooTheme from '@zooniverse/grommet-theme';

counterpart.registerTranslations('en', en)

// This isn't working
// Reported bug with Grommet v2: https://github.com/grommet/grommet/issues/2140
export const StyledAdminCheckbox = styled(CheckBox)`
  color: ${theme('mode', {
    light: zooTheme.light.colors.font,
    dark: zooTheme.dark.colors.font
  })};
`

function AdminCheckbox({ checked, colorTheme, label, onChange, theme }) {
  return (
    <Grommet theme={theme}>
      <ThemeProvider theme={{ mode: colorTheme }}>
        <StyledAdminCheckbox
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
import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import counterpart from 'counterpart'
import { Button, Text } from 'grommet'
import { FormNextLink } from 'grommet-icons'
import zooTheme from '@zooniverse/grommet-theme';
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO: box-shadow, border-radius, and disabled likely can move into the grommet theme.
export const StyledNextButton = styled(Button)`
  background: ${theme('mode', { 
    dark: zooTheme.dark.colors.background.default,
    light: zooTheme.global.colors.gold
  })};
  border: ${theme('mode', {
    dark: `solid thin ${zooTheme.global.colors.gold}`,
    light: `solid thin ${zooTheme.global.colors.gold}`
  })};
  border-radius: 0;
  box-shadow: none;
  color: ${theme('mode', {
    dark: zooTheme.global.colors.gold,
    light: 'black'
  })};
  padding: 0;
  text-transform: capitalize;

  svg {
    fill: ${theme('mode', {
      dark: zooTheme.global.colors.gold,
      light: 'black'
    })};
    stroke: ${theme('mode', {
      dark: zooTheme.global.colors.gold,
      light: 'black'
    })};
  }

  &:hover:not(:disabled), &:focus:not(:disabled) {
    background: ${theme('mode', {
      dark: zooTheme.global.colors.gold,
      light: zooTheme.light.colors.button.nextHover
    })};
    color: ${theme('mode', {
      dark: 'black',
      light: 'black'
    })};;
  }

  &:disabled {
    ${'' /* background: ${theme('mode', {
      dark: zooTheme.dark.colors.background.default,
      light: zooTheme.global.colors.lightGold
    })};
    border: ${theme('mode', {
      dark: `solid thin ${zooTheme.global.colors.gold}`,
      light: `solid thin ${zooTheme.global.colors.gold}`
    })};
    color: ${theme('mode', {
      dark: zooTheme.global.colors.gold,
      light: 'black'
    })}; */}
    cursor: not-allowed;
    ${'' /* opacity: 0.5; */}
  }
`;

function NextButton({ autoFocus, disabled, classifierTheme, onClick }) {
  return (
    <ThemeProvider theme={{ mode: classifierTheme }}>
      <StyledNextButton
        autoFocus={autoFocus}
        color={zooTheme.global.colors.gold}
        disabled={disabled}
        icon={<FormNextLink size="small" />}
        label={<Text size="small">{counterpart('NextButton.next')}</Text>}
        onClick={(disabled) ? null : onClick}
        reverse={true}
        type="button"
      />
    </ThemeProvider>
  );
}

NextButton.defaultProps = {
  autoFocus: false,
  classifierTheme: 'light',
  disabled: false,
};

NextButton.propTypes = {
  autoFocus: PropTypes.bool,
  classifierTheme: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default NextButton;

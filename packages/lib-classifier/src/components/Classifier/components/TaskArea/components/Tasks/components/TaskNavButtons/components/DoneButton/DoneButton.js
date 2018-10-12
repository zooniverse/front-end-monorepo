import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from 'grommet'
import styled, { ThemeProvider } from 'styled-components';
import theme from 'styled-theming';
import { darken, lighten } from 'polished';
import zooTheme from '@zooniverse/grommet-theme';
import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

// TODO move what makes sense into theme
export const StyledDoneButton = styled(Button)`
  background-color: ${theme('mode', {
    dark: zooTheme.dark.colors.background.default,
    light: zooTheme.light.colors.button.done
  })};
  border: ${theme('mode', {
    dark: `solid thin ${zooTheme.dark.colors.button.done.default}`,
    light: `solid thin ${zooTheme.light.colors.button.done}`
  })};
  border-radius: 0;
  color: white;
  cursor: pointer;
  flex: 3 0;
  font-size: 0.9em;
  padding: 0.9em;
  text-transform: capitalize;

  > i {
    margin-left: 1ch;
  }

  &:hover, &:focus {
    background: ${theme('mode', {
      dark: zooTheme.dark.colors.button.done.hover,
      light: darken(0.15, zooTheme.light.colors.button.done)
    })};
    border: ${theme('mode', {
      dark: `solid thin ${zooTheme.dark.colors.button.done.default}`,
      light: `solid thin ${darken(0.15, zooTheme.light.colors.button.done)}`
    })};
    color: 'white';
  }

  &:disabled {
    background: ${theme('mode', {
      dark: lighten(0.05, zooTheme.dark.colors.background.default),
      light: lighten(0.05, zooTheme.light.colors.button.done)
    })};

    border: ${theme('mode', {
      dark: `solid thin ${zooTheme.dark.colors.button.done.default}`,
      light: `solid thin ${lighten(0.05, zooTheme.light.colors.button.done)}`
    })};
    color: ${theme('mode', {
      dark: zooTheme.dark.colors.font,
      light: '#EEF1F4'
    })};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
// TODO add back gold standard and demo buttons using grommet Button icon prop
// {props.demoMode && <i className="fa fa-trash fa-fw" />}
// {props.goldStandardMode && <i className="fa fa-star fa-fw" />}
export function DoneButton(props) {
  if (!props.completed) {
    return (
      <ThemeProvider theme={{ mode: props.theme }}>
        <StyledDoneButton
          color={theme('mode', {
            dark: zooTheme.dark.colors.background.default,
            light: zooTheme.light.colors.button.done
          })}
          disabled={props.disabled}
          label={<Text size="small">{counterpart('DoneButton.done')}</Text>}
          onClick={props.onClick}
        />
      </ThemeProvider>
    );
  }

  return null;
}

DoneButton.defaultProps = {
  completed: false,
  demoMode: false,
  disabled: false,
  goldStandardMode: false,
  onClick: () => {},
  theme: 'light'
};

DoneButton.propTypes = {
  completed: PropTypes.bool,
  demoMode: PropTypes.bool,
  disabled: PropTypes.bool,
  goldStandardMode: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string
};

export default DoneButton;
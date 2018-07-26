import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-theming'
import ZooniverseLogotype from '../zooniverse-logotype';

export const StyledFooterBox = styled(Box)`
  border-top: 5px solid #005D69;
`;

export default function FooterContainer(props) {
  const { colortheme } = props
  return (
    <ThemeProvider theme={{ mode: colorTheme }}>
      <StyledFooterBox
        align="center"
        background={{ dark: true }}
        direction="column"
        pad={{ horizontal: 'none', vertical: 'none' }}
        tag="footer"
      >
        {this.props.children}
      </StyledFooterBox>
    </ThemeProvider>
  )
}

FooterContainer.defaultProps = {
  colorTheme: 'light'
}

FooterContainer.propTypes = {
  colorTheme: PropTypes.string
}
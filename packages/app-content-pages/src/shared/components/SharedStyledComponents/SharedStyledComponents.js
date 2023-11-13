/* Components are shared in Teams and Publications for two-column layout and mobile layout */

import styled, { css } from 'styled-components'
import { Box, Grid, Heading } from 'grommet'
import Sidebar from '../Sidebar/Sidebar.js'

export const mobileBreakpoint = '72rem'

export const MobileHeading = styled(Heading)`
  color: white;
  display: flex;
  justify-content: center;
  padding: 0 0 20px 0;
  margin: 0;
  width: 100%;

  ${props =>
    css`
      background: ${props.theme.global.colors.brand};
    `}

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

export const StickyBox = styled(Box)`
  position: sticky;
  top: 0;
  width: 100%;

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

export const StickySidebar = styled(Sidebar)`
  max-height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

export const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
  padding: 0 30px;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

export const StyledHeading = styled(Heading)`
  position: relative;
  padding: 30px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #ffffff 0%, #a6a7a9 50%, #ffffff 100%);
    height: 2px;
    width: 100%;
  }
`

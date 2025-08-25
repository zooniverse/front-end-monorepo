import { base as baseTheme } from 'grommet'
import styled from 'styled-components'

const { breakpoints } = baseTheme.global

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 100%;

  section {
    &:nth-of-type(1) {
      padding-bottom: 12px;
      border-bottom: solid 1px rgba(0,0,0,0.33);
    }
    &:nth-of-type(2) {
      margin-top: 12px;
    }
  }

  @media (min-width: ${breakpoints.small.value}px) {
    grid-template-rows: 1fr;
    grid-template-columns: 61.8% auto;

    section {
      &:nth-of-type(1) {
        padding-bottom: 0;
        padding-right: 24px;
        border-bottom: 0;
        border-right: solid 1px rgba(0,0,0,0.33);
      }
      &:nth-of-type(2) {
        margin-top: 0;
        margin-left: 24px;
      }
    }
  }
`

export default MainGrid

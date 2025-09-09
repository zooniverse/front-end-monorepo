import styled, { css } from 'styled-components'
import { Box, Grid } from 'grommet'
import ImageToolbar from '@components/Classifier/components/ImageToolbar'

export const ViewerGrid = styled(Grid)`
  grid-area: viewer;
  grid-template-columns: auto clamp(3rem, 10%, 4.5rem);
  grid-template-rows: auto;
  grid-template-areas: 'subject toolbar';
`

export const StyledSubjectContainer = styled(Box)`
  grid-area: subject;
  height: fit-content;

  ${props => props.hasSurveyTask
  ? css`
      @media screen and (min-width: 70rem) {
        position: sticky;
        top: 10px;
      }
    `
  : css`
      @media screen and (min-width: 769px) {
        position: sticky;
        top: 10px;
      }
    `}
`

export const StyledImageToolbarContainer = styled.div`
  grid-area: toolbar;
`

export const StyledImageToolbar = styled(ImageToolbar)`
  position: sticky;
  top: 10px;
`

export const StyledTaskAreaContainer = styled.div`
  grid-area: task;
`

export const StyledTaskArea = styled(Box)`
  ${props => props.hasSurveyTask ? css`
    @media screen and (min-width: 70rem) {
      position: sticky;
      top: 10px;
    }
  ` : css`
    @media screen and (min-width: 769px) {
      position: sticky;
      top: 10px;
    }
  `}
`

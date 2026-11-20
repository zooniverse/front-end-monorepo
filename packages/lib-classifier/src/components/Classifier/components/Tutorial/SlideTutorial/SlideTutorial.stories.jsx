import { Box, Text } from 'grommet'
import Modal from '@zooniverse/react-components/Modal'

import SlideTutorial from './SlideTutorial'
import { ContainerGrid } from '../../Layout/components/MaxWidth/MaxWidth'
import {
  StyledTaskAreaContainer,
  StyledTaskArea
} from '../../Layout/components/shared/StyledContainers'
import {
  steps,
  strings,
  stepWithMedium,
  manySteps,
  manyStepsStrings,
  stepWithManyMedium
} from './mockTutorials'

export default {
  title: 'Other / SlideTutorial',
  component: SlideTutorial
}

export function DefaultLayout() {
  return (
    <ContainerGrid>
      <Box
        align='center'
        justify='center'
        background={{ light: 'white', dark: 'dark-3' }}
        height='120vh'
      >
        <Text>The subject viewer is here</Text>
      </Box>
      <StyledTaskAreaContainer>
        <StyledTaskArea>
          <Box background={{ light: 'white', dark: 'dark-3' }}>
            <SlideTutorial steps={steps} stepWithMedium={stepWithMedium} strings={strings} />
          </Box>
        </StyledTaskArea>
      </StyledTaskAreaContainer>
    </ContainerGrid>
  )
}

export function LotsOfSteps() {
  return (
    <ContainerGrid>
      <Box
        align='center'
        justify='center'
        background={{ light: 'white', dark: 'dark-3' }}
        height='40vh'
      >
        <Text>The subject viewer is here</Text>
      </Box>
      <StyledTaskAreaContainer>
        <StyledTaskArea>
          <Box background={{ light: 'white', dark: 'dark-3' }}>
            <SlideTutorial
              steps={manySteps}
              stepWithMedium={stepWithManyMedium}
              strings={manyStepsStrings}
            />
          </Box>
        </StyledTaskArea>
      </StyledTaskAreaContainer>
    </ContainerGrid>
  )
}

const DEFAULT_HANDLER = () => true
export function WithinModal() {
  return (
    <Modal
      active={true}
      closeFn={DEFAULT_HANDLER}
      pad='none'
      height={{ max: '90%' }} // dimensions like ModalTutorial without having to setup a MST store
      width={{ max: '400px' }}
      title='Example tutorial in a modal'
    >
      <SlideTutorial steps={steps} stepWithMedium={stepWithMedium} strings={strings} />
    </Modal>
  )
}

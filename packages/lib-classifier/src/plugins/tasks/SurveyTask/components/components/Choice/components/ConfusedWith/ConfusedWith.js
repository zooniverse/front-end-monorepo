import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'

import Confusion from './components/Confusion'

import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledDropButton = styled(DropButton)`
  background-color: ${props => props.theme.global.colors[props.backgroundColor]};
  border: none;
  margin-right: 5px;
  padding: 5px;
`

function ConfusedWith (props) {
  const {
    choices,
    confusions,
    confusionsOrder,
    handleChoice,
    images,
    theme
  } = props

  const [open, setOpen] = React.useState(false)
  function onClose () {
    setOpen(false)
  }
  function onOpen (confusionId) {
    setOpen(confusionId)
  }

  return (
    <Box>
      <SpacedHeading>{counterpart('ConfusedWith.confused')}</SpacedHeading>
      <Box
        direction='row'
        wrap
      >
        {confusionsOrder.map((confusionId) => {
          let backgroundColor = 'neutral-6'
          if (theme.dark) {
            backgroundColor = 'dark-3'
          }
          if (open === confusionId) {
            backgroundColor = 'accent-1'
          }

          return (
            <StyledDropButton
              key={confusionId}
              backgroundColor={backgroundColor}
              dropAlign={{
                bottom: 'top'
              }}
              dropContent={
                <Confusion
                  confusion={choices[confusionId]}
                  confusionId={confusionId}
                  confusionText={confusions[confusionId]}
                  handleChoice={handleChoice}
                  images={images}
                  onClose={onClose}
                />
              }
              label={choices[confusionId].label}
              open={open === confusionId}
              onClose={() => onClose()}
              onOpen={() => onOpen(confusionId)}
            />
          )
        })}
      </Box>
    </Box>
  )
}

ConfusedWith.defaultProps = {
  choices: {},
  confusions: {},
  confusionsOrder: [],
  handleChoice: () => {},
  images: {}
}

ConfusedWith.propTypes = {
  choices: PropTypes.objectOf(
    PropTypes.shape({
      confusions: PropTypes.objectOf(PropTypes.string),
      confusionsOrder: PropTypes.arrayOf(PropTypes.string),
      images: PropTypes.arrayOf(PropTypes.string),
      label: PropTypes.string
    })
  ),
  confusions: PropTypes.objectOf(PropTypes.string),
  confusionsOrder: PropTypes.arrayOf(PropTypes.string),
  handleChoice: PropTypes.func,
  images: PropTypes.objectOf(PropTypes.string)
}

export default withTheme(ConfusedWith)
export { ConfusedWith }

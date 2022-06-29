import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

import Confusion from './components/Confusion'

export const StyledDropButton = styled(DropButton)`
  background-color: ${props => props.theme.global.colors[props.backgroundColor]};
  border: none;
  margin-right: 5px;
  padding: 5px;
`

function ConfusedWith({
  choices = {},
  choiceId,
  confusions = {},
  confusionsOrder = [],
  handleChoice = () => {},
  hasFocus = false,
  images = {},
  strings,
  theme
} ) {
  const { t } = useTranslation('plugins')

  const [open, setOpen] = React.useState(false)
  function onClose () {
    setOpen(false)
  }
  function onOpen (confusionId) {
    setOpen(confusionId)
  }

  return (
    <Box>
      <SpacedHeading>{t('SurveyTask.ConfusedWith.confused')}</SpacedHeading>
      <Box
        direction='row'
        wrap
      >
        {confusionsOrder.map((confusionId, index) => {
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
              a11yTitle={strings.get(`choices.${confusionId}.label`)}
              autoFocus={hasFocus && index === 0}
              backgroundColor={backgroundColor}
              dropAlign={{
                bottom: 'top'
              }}
              dropContent={
                <Confusion
                  confusion={choices[confusionId]}
                  confusionId={confusionId}
                  confusionText={strings.get(`choices.${choiceId}.confusions.${confusionId}`)}
                  handleChoice={handleChoice}
                  images={images}
                  label={strings.get(`choices.${confusionId}.label`)}
                  onClose={onClose}
                />
              }
              label={strings.get(`choices.${confusionId}.label`)}
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
  hasFocus: PropTypes.bool,
  images: PropTypes.objectOf(PropTypes.string)
}

export default withTheme(ConfusedWith)
export { ConfusedWith }

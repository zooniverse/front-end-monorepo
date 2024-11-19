import { Box, DropButton } from 'grommet'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { useState } from 'react';
import styled, { withTheme } from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

import Confusion from './components/Confusion'

export const StyledDropButton = styled(DropButton)`
  background-color: ${props => props.theme.global.colors[props.backgroundColor]};
  border: none;
  color: ${props => props.theme.dark ? props.theme.global.colors['neutral-6'] : props.theme.global.colors['neutral-7']};
  font-size: 1rem;
  height: 40px;
  min-width: 110px;
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

  const [open, setOpen] = useState(false)
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
          let backgroundColor = 'light-1'
          if (theme.dark) {
            backgroundColor = 'dark-4'
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
                top: 'bottom'
              }}
              dropContent={
                <Confusion
                  confusion={choices.get(confusionId)}
                  confusionId={confusionId}
                  confusionText={strings.get(`choices.${choiceId}.confusions.${confusionId}`)}
                  handleChoice={handleChoice}
                  images={images}
                  label={strings.get(`choices.${confusionId}.label`)}
                  onClose={onClose}
                />
              }
              dropProps={{
                elevation: 'none',
                overflow: 'visible',
                responsive: false
              }}
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
  choices: MobXPropTypes.observableMap,
  confusions: MobXPropTypes.observableMap,
  confusionsOrder: PropTypes.arrayOf(PropTypes.string),
  handleChoice: PropTypes.func,
  hasFocus: PropTypes.bool,
  images: MobXPropTypes.observableMap,
}

export default withTheme(ConfusedWith)
export { ConfusedWith }

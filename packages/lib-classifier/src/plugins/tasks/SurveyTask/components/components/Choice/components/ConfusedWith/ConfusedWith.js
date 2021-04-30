import { Box, DropButton } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { SpacedHeading } from '@zooniverse/react-components'

import Confusion from './components/Confusion'

import counterpart from 'counterpart'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function ConfusedWith (props) {
  const {
    choices,
    confusions,
    confusionsOrder,
    handleChoice,
    images
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
          return (
            <DropButton
              key={confusionId}
              dropAlign={{
                right: 'left'
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
  choices: PropTypes.object, // TODO: refactor for relevant properties
  confusions: PropTypes.objectOf(PropTypes.string),
  confusionsOrder: PropTypes.arrayOf(PropTypes.string),
  handleChoice: PropTypes.func,
  images: PropTypes.objectOf(PropTypes.string)
}

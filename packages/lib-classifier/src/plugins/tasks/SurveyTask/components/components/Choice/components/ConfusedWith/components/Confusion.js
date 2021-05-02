import { Box, Button, Carousel, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { Media, PrimaryButton, SpacedHeading } from '@zooniverse/react-components'

import counterpart from 'counterpart'
import en from '../locales/en'

counterpart.registerTranslations('en', en)
export default function Confusion (props) {
  const {
    confusion,
    confusionId,
    confusionText,
    handleChoice,
    images,
    onClose
  } = props

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      pad={{
        bottom: 'small',
        horizontal: 'small',
        top: 'none'
      }}
      width='medium'
    >
      <SpacedHeading>{confusion.label}</SpacedHeading>
      {confusion.images?.length > 0 && (
        <Carousel
          controls='arrows'
        >
          {confusion.images.map((filename, index) => (
            <Media
              key={filename}
              alt={`${confusion.label}-image${index}`}
              src={images[filename]}
            />
          ))}
        </Carousel>
      )}
      <Paragraph>{confusionText}</Paragraph>
      <Box
        direction='row'
        fill='horizontal'
        gap='xsmall'
        justify='center'
        margin={{ top: 'small' }}
        pad={{ top: 'small' }}
      >
        <Button
          fill='horizontal'
          label={counterpart('ConfusedWith.cancel')}
          onClick={() => onClose()}
        />
        <PrimaryButton
          fill='horizontal'
          label={counterpart('ConfusedWith.itsThis')}
          onClick={() => handleChoice(confusionId)}
        />
      </Box>
    </Box>
  )
}

Confusion.defaultProps = {
  confusion: {},
  confusionId: '',
  confusionText: '',
  handleChoice: () => {},
  images: {},
  onClose: () => {}
}

Confusion.propTypes = {
  confusion: PropTypes.shape({
    confusions: PropTypes.objectOf(PropTypes.string),
    confusionsOrder: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string
  }),
  confusionId: PropTypes.string,
  confusionText: PropTypes.string,
  handleChoice: PropTypes.func,
  images: PropTypes.objectOf(PropTypes.string),
  onClose: PropTypes.func
}

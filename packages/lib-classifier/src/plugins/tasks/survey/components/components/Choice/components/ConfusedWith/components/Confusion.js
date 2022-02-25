import { Box, Button, Carousel, Paragraph } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import { Media, PrimaryButton, SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

export default function Confusion (props) {
  const {
    confusion,
    confusionId,
    confusionText,
    handleChoice,
    images,
    onClose
  } = props

  const { t } = useTranslation('plugins')

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
          data-testid='confusion-images'
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
          label={t('SurveyTask.ConfusedWith.cancel')}
          onClick={() => onClose()}
        />
        <PrimaryButton
          fill='horizontal'
          label={t('SurveyTask.ConfusedWith.itsThis')}
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

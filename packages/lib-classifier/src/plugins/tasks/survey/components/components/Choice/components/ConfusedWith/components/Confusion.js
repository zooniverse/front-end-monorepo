import { Box, Button, Carousel, Paragraph } from 'grommet'
import { PropTypes as MobXPropTypes } from 'mobx-react'
import PropTypes from 'prop-types'
import { Media, PrimaryButton, SpacedHeading } from '@zooniverse/react-components'
import { useTranslation } from '@translations/i18n'

export default function Confusion({
  confusion = {},
  confusionId = '',
  confusionText = '',
  handleChoice = () => {},
  images = {},
  label,
  onClose = () => true
}) {
  const { t } = useTranslation('plugins')

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      flex={false}
      pad={{
        bottom: 'small',
        horizontal: 'small',
        top: 'none'
      }}
      width='medium'
    >
      <SpacedHeading>{label}</SpacedHeading>
      {confusion.images?.length > 0 && (
        <Carousel
          data-testid='confusion-images'
          controls='arrows'
        >
          {confusion.images.map((filename, index) => (
            <Media
              key={filename}
              alt={`${confusion.label}-image${index}`}
              src={images.get(filename)}
              width={400}
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
          style={{ overflow: 'hidden' }}
        />
        <PrimaryButton
          fill='horizontal'
          label={t('SurveyTask.ConfusedWith.itsThis')}
          onClick={() => handleChoice(confusionId)}
          style={{ overflow: 'hidden' }}
        />
      </Box>
    </Box>
  )
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
  images: MobXPropTypes.observableMap,
  onClose: PropTypes.func
}

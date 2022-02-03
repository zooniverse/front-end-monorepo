import { Media, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledButton = styled(Button)`
  border-radius: 4px;
  border-width: 1px;
`

function ProjectCard (props) {
  const { t } = useTranslation('screens')
  const { description, image, name, url } = props
  return (
    <Box border={{ color: 'light-4' }} width='300px'>
      <Media src={image} />
      <Box pad='small'>
        <Box
          border={{ color: 'light-4', side: 'bottom' }}
          margin={{ bottom: 'xsmall' }}
          pad={{ bottom: 'xsmall' }}
        >
          <SpacedText weight='bold'>
            {name}
          </SpacedText>
        </Box>
        <Box as='p' margin={{ top: 'none', bottom: 'small' }}>
          <Text>
            {description}
          </Text>
        </Box>
        <StyledButton
          alignSelf='start'
          color='neutral-2'
          label={
            <Text size='small'>
              {t('Classify.FinishedForTheDay.RelatedProjectModal.ProjectCard.viewProject')}
            </Text>
          }
          href={url}
        />
      </Box>
    </Box>
  )
}

ProjectCard.propTypes = {
  description: string.isRequired,
  image: string.isRequired,
  name: string.isRequired,
  url: string.isRequired
}

export default ProjectCard

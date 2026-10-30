import { Markdownz, PrimaryButton } from '@zooniverse/react-components'
import { Box, Paragraph } from 'grommet'
import { ShareRounded } from 'grommet-icons'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next/pages'

const markdownzComponents = {
  p: nodeProps => <Paragraph {...nodeProps} margin={{ bottom: 'small', top: 'none' }} />
}

function ExternalWorkflow({ description = '', url }) {
  const { t } = useTranslation('screens')

  return (
    <Box
      align='center'
      background={{ dark: 'dark-3', light: 'neutral-6' }}
      fill
      justify='center'
      pad='large'
    >
      <Box gap='medium' width={{ max: '40rem' }}>
        <Markdownz components={markdownzComponents}>
          {description || t('Classify.ExternalWorkflow.fallback')}
        </Markdownz>
        <PrimaryButton
          alignSelf='start'
          as='a'
          href={url}
          icon={<ShareRounded aria-hidden='true' size='small' />}
          label={t('Classify.ExternalWorkflow.button')}
          reverse
        />
      </Box>
    </Box>
  )
}

ExternalWorkflow.propTypes = {
  /** Markdown shown before the volunteer leaves for the external site (workflow.configuration.external_workflow_description) */
  description: string,
  /** External custom front end URL (workflow.configuration.external_workflow_url) */
  url: string.isRequired
}

export default ExternalWorkflow

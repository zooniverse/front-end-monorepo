import { Anchor, Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'

function OrganizationLink({
  slug = '',
  title = ''
}) {
  const { t } = useTranslation('components')

  return (
    <Box
      alignContent='start'
      wrap={true}
    >
      <SpacedText>
        {t('ProjectHeader.organization')}
      </SpacedText>
      <Anchor
        href={`/organizations/${slug}`}
      >
        <SpacedText
          weight='bold'
        >
          {title}
        </SpacedText>
      </Anchor>
    </Box>
  )
}

OrganizationLink.propTypes = {
  slug: string,
  title: string
}

export default OrganizationLink

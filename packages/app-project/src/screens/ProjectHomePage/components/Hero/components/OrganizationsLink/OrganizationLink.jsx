import { Anchor, Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { arrayOf, shape, string } from 'prop-types'
import { SpacedText } from '@zooniverse/react-components'

function OrganizationLink({
  organizations = []
}) {
  const { t } = useTranslation('components')

  if (!(organizations.length > 0)) return null

  return (
    <Box
      alignContent='start'
      wrap={true}
    >
      <SpacedText>
        {t('ProjectHeader.organization')}
      </SpacedText>
      {organizations.map(org =>
        <Anchor
          key={org.slug}
          href={`/organizations/${org.slug}`}
        >
          <SpacedText
            weight='bold'
          >
            {org.title}
          </SpacedText>
        </Anchor>
      )}
    </Box>
  )
}

OrganizationLink.propTypes = {
  organizations: arrayOf(shape({
    slug: string,
    title: string
  }))
}

export default OrganizationLink

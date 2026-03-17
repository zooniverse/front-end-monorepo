import { Anchor, Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { SpacedText } from '@zooniverse/react-components'
import OrganizationAvatar from '../OrganizationAvatar'

const StyledBox = styled(Box)`
  position: relative;
`

/**
  Link text styles
*/
const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
  margin-right: 10px;
`

/**
  Link styles
*/
const StyledAnchor = styled(Anchor)`
  margin-left: -4px;
`

function OrganizationsLink({
  organizations = [],
}) {
  const { t } = useTranslation('components')

  if (!(organizations.length > 0)) return null

  return (
    <StyledBox
      align='center'
      alignSelf='end'
      direction='row'
      gap='none'
      pad={{
        horizontal: 'medium',
        top: 'medium'
      }}
    >
      <StyledSpacedText
        color='light-3'
      >
        {t('ProjectHeader.organization')}
      </StyledSpacedText>

      {organizations.map(org =>
        <StyledAnchor
          key={org.slug}
          href={`/organizations/${org.slug}`}
        >
          <OrganizationAvatar
            organization={org}
          />
        </StyledAnchor>
      )}
    </StyledBox>
  )
}

OrganizationsLink.propTypes = {
  organizations: arrayOf(shape({
    /** The organization slug */
    slug: string,
    /** The organization name */
    title: string
  }))
}
export default OrganizationsLink

import { Anchor, Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { SpacedText } from '@zooniverse/react-components'

const StyledBox = styled(Box)`
  position: relative;
`

/**
  Link text styles
*/
const StyledSpacedText = styled(SpacedText)`
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);
`

/**
  Link styles
*/
const StyledAnchor = styled(Anchor)`
  border-bottom: 3px solid transparent;
  white-space: nowrap;

  &:hover {
    text-decoration: none;
    border-bottom: 3px solid white;
  }
`

function OrganizationLink({
  slug = '',
  title = ''
}) {
  const { t } = useTranslation('components')

  return (
    <StyledBox
      align='baseline'
      alignSelf='end'
      direction='row'
      gap='xsmall'
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
      <StyledAnchor
        href={`/organizations/${slug}`}
      >
        <StyledSpacedText
          color='white'
          weight='bold'
        >
          {title}
        </StyledSpacedText>
      </StyledAnchor>
    </StyledBox>
  )
}

OrganizationLink.propTypes = {
  /** The organization slug */
  slug: string,
  /** The organization name */
  title: string
}
export default OrganizationLink

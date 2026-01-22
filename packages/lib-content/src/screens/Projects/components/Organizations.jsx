import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import StyledCardsContainer from './StyledCardsContainer'

export default function Organizations({ organizations }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)

  return (
    <Box align='center' margin={{ vertical: '80px' }}>
      <SpacedHeading
        id='organizations'
        level={2}
        size='2rem'
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        textAlign='center'
        fill
      >
        {t('Projects.organizations.heading')}
      </SpacedHeading>
      <Box width='min(100%, 60rem)'>
        <Paragraph
          margin={{ top: 'xsmall', bottom: 'medium' }}
          size={size === 'small' ? '1rem' : '1.125rem'}
          color={{ light: 'black', dark: 'white' }}
        >
          {t('Projects.organizations.description')}
        </Paragraph>
      </Box>
      <StyledCardsContainer>
        {organizations?.length ? (
          organizations.map(org => (
            <li key={org.slug}>
              <ProjectCard
                description={org.description}
                displayName={org.display_name}
                href={`https://www.zooniverse.org/organizations/${org.slug}`}
                imageSrc={org.avatar_src}
                size={size}
              />
            </li>
          ))
        ) : (
          <Box as='li' align='center' fill>
            {t('Projects.organizations.none')}
          </Box>
        )}
      </StyledCardsContainer>
    </Box>
  )
}

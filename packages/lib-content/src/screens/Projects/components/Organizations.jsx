import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'

import { useTranslation } from '@translations/i18n'
import StyledCardsContainer from './StyledCardsContainer'

export default function Organizations({ organizations }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)

  return (
    <Box align='center'>
      <SpacedHeading
        id='organizations'
        level={2}
        size='2rem'
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        textAlign='center'
        fill
        margin={{ top: '60px' }}
      >
        {t('Projects.organizations.heading')}
      </SpacedHeading>
      <Box width='min(100%, 60rem)'>
        <Paragraph
          margin={{ top: 'none', bottom: 'medium' }}
          size={size === 'small' ? 'rem' : '1.125rem'}
          color={{ light: 'black', dark: 'white' }}
        >
          {t('Projects.organizations.description')}
        </Paragraph>
      </Box>
      <StyledCardsContainer>
        {organizations?.length ? (
          organizations.map(project => (
            <li key={project.slug}>
              <ProjectCard
                description={project.description}
                displayName={project.display_name}
                href={`https://www.zooniverse.org/projects/${project.slug}`}
                imageSrc={project.avatar_src}
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

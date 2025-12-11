import { Box, Paragraph, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { ProjectCard, SpacedHeading } from '@zooniverse/react-components'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'

const StyledBox = styled(Box)`
  list-style: none;
  column-gap: 20px;
  row-gap: 20px;
  margin: 0 30px 40px;
  padding: 0 0 10px 0;

  @media (min-width: 48rem) {
    column-gap: 40px;
    row-gap: 40px;
    margin: 0 30px 60px;
  }

  @media (min-width: 90rem) {
    row-gap: 40px;
    column-gap: 40px;
    margin: 0 30px 60px;
  }
`

export default function Organizations({ organizations }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)

  return (
    <Box align='center'>
      <SpacedHeading
        level={2}
        size='2rem'
        color={{ light: 'neutral-1', dark: 'white' }}
        textAlign='center'
        fill
      >
        {t('Projects.organizations.heading')}
      </SpacedHeading>
      <MaxWidthContent>
        <Paragraph textAlign='center'>
          {t('Projects.organizations.description')}
        </Paragraph>
      </MaxWidthContent>
      <StyledBox
        forwardedAs='ul'
        direction='row'
        wrap
        overflow={{ horizontal: 'auto' }}
      >
        {organizations?.length ? (
          organizations.map(project => (
            <ProjectCard
              key={project.slug}
              description={project.description}
              displayName={project.display_name}
              href={`https://www.zooniverse.org/projects/${project.slug}`}
              imageSrc={project.avatar_src}
              size={size}
              background='light-1'
            />
          ))
        ) : (
          <Box as='li' align='center' fill>
            {t('')}
          </Box>
        )}
      </StyledBox>
    </Box>
  )
}

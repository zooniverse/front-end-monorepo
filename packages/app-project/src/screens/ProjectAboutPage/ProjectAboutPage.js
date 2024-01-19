import { Box, Grid, Heading } from 'grommet'
import { arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

import StandardLayout from '@shared/components/StandardLayout'
import ProjectAboutPageLayout from './ProjectAboutPageLayout.js'
import AboutSidebar from './components/AboutSidebar'
import AboutDropdownNav from './components/AboutDropdownNav'
import TeamMember from './components/TeamMember'
import AboutMarkdownz from './components/AboutMarkdownz/AboutMarkdownz'

const mobileBreakpoint = '76rem'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
  min-height: 50vh;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

const SidebarContainer = styled(Box)`
  position: sticky;
  top: 20px;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

const DropdownContainer = styled(Box)`
  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`
const StyledHeading = styled(Heading)`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    height: 2px;
    width: 80%;
    ${props =>
      props.theme.dark
        ? css`
            background: linear-gradient(
              90deg,
              #333333 0%,
              #000000 50%,
              #333333 100%
            );
          `
        : css`
            background: linear-gradient(
              90deg,
              #ffffff 0%,
              #a6a7a9 50%,
              #ffffff 100%
            );
          `}
  }
`

const DesktopTeamMembersContainer = styled(Box)`
  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

const MobileTeamMembersContainer = styled(Box)`
  width: 100%;

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  width: fit-content;

  @media (width <= ${mobileBreakpoint}) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
    column-gap: 15px;
  }
`

const TeamMembersList = ({ teamArray }) => {
  return (
    <Box width='100%' align='center'>
      {teamArray.length && (
        <StyledList aria-label='List of team members'>
          {teamArray.map(user => (
            <TeamMember key={user.id} user={user} />
          ))}
        </StyledList>
      )}
    </Box>
  )
}

function ProjectAboutPage({
  aboutNavLinks,
  aboutPageData = {},
  inBeta = false,
  teamArray = []
}) {
  const { t } = useTranslation('screens')

  const { strings, title: pageType } = aboutPageData
  const { content } = strings ?? 'No content yet.'

  const pageTitle = t(`About.PageHeading.title.${pageType.toLowerCase()}`)
  const isTeamPage = pageType.toLowerCase().includes('team')

  return (
    <StandardLayout inBeta={inBeta}>
      <ProjectAboutPageLayout>
        <DropdownContainer>
          <AboutDropdownNav aboutNavLinks={aboutNavLinks} />
        </DropdownContainer>
        <Box width='min(100%, 45rem)'>
          <StyledHeading
            color={{ light: 'brand', dark: 'accent-1' }}
            level='2'
            size='32px'
          >
            {pageTitle}
          </StyledHeading>
        </Box>
        <StyledGrid>
          <Box>
            <SidebarContainer align='center'>
              <AboutSidebar aboutNavLinks={aboutNavLinks} />
            </SidebarContainer>
          </Box>
          <Box pad={{ vertical: 'medium' }}>
            <AboutMarkdownz content={content} />
            {isTeamPage && !!teamArray.length && (
              <MobileTeamMembersContainer pad={{ top: 'medium' }}>
                <TeamMembersList teamArray={teamArray} />
              </MobileTeamMembersContainer>
            )}
          </Box>
          <Box>
            {isTeamPage && !!teamArray.length && (
              <DesktopTeamMembersContainer>
                <TeamMembersList teamArray={teamArray} />
              </DesktopTeamMembersContainer>
            )}
          </Box>
        </StyledGrid>
      </ProjectAboutPageLayout>
    </StandardLayout>
  )
}

ProjectAboutPage.propTypes = {
  aboutPageData: object,
  inBeta: bool,
  teamArray: arrayOf(
    shape({
      avatar_src: string,
      display_name: string,
      id: string.isRequired,
      login: string,
      role: string
    })
  )
}

export { ProjectAboutPage }
export default ProjectAboutPage

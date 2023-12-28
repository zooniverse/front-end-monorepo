import { Box, Grid, Heading } from 'grommet'
import { arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
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

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

const SidebarContainer = styled(Box)`
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
      props.dark
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
  padding: 20px;

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
        <StyledList aria-labelledby='team-sidebar-heading'>
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
  teamArray = [],
  theme
}) {
  const { t } = useTranslation('screens')

  const defaultContent = {
    title: aboutPageData.title,
    content: aboutPageData.content
  }
  const { strings, title: pageType } = aboutPageData
  const { content } = strings ?? defaultContent.content

  const pageTitle = t(`About.PageHeading.title.${pageType.toLowerCase()}`)
  const isTeamPage = pageType.toLowerCase().includes('team')
  const reversedTeamArray = teamArray?.reverse()

  return (
    <StandardLayout inBeta={inBeta}>
      <ProjectAboutPageLayout>
        <DropdownContainer>
          <AboutDropdownNav aboutNavLinks={aboutNavLinks} />
        </DropdownContainer>
        <Box width='min(100%, 45rem)'>
          <StyledHeading
            color={{ light: 'brand', dark: 'accent-1' }}
            dark={theme?.dark}
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
          <AboutMarkdownz content={content} />
          <Box>
            {isTeamPage && teamArray.length && (
              <DesktopTeamMembersContainer>
                <TeamMembersList teamArray={reversedTeamArray} />
              </DesktopTeamMembersContainer>
            )}
          </Box>
        </StyledGrid>
        {isTeamPage && teamArray.length && (
          <MobileTeamMembersContainer>
            <TeamMembersList teamArray={reversedTeamArray} />
          </MobileTeamMembersContainer>
        )}
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
export default withTheme(ProjectAboutPage)

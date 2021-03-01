import { Box, Grid, Heading, Paragraph } from 'grommet'
import { arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { withResponsiveContext } from '@zooniverse/react-components'

/** Components */
import Announcements from '@components/Announcements'
import ProjectHeader from '@components/ProjectHeader'
import ZooHeaderWrapper from '@components/ZooHeaderWrapper'
import { ZooFooter, Markdownz, SpacedHeading} from '@zooniverse/react-components'
import AboutSidebar from './components/AboutSidebar'
import AboutDropdownNav from './components/AboutDropdownNav'
import TeamMember from './components/TeamMember'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
  border-width: 0 1px;
  border-style: solid;
  ${props => css`border-color: ${props.theme.global.colors['light-3']};`}
  ${props => css`background: ${props.theme.global.colors['white']};`}
`

const PageHeading = styled(Heading)`
  font-weight: normal;
`

const TeamHeading = styled(SpacedHeading)`
  margin: 0;
`

const SidebarHeading = styled(SpacedHeading)`
  padding: 5px 20px;
`

const StyledList = styled(Box)`
  padding: 0;
`

const components = {
  h1: nodeProps => <Heading children={nodeProps.children} level='1' color="#005D69" />, // darkTeal
  h2: nodeProps => <Heading children={nodeProps.children} level='2' color="#005D69" />,
  // do we need to add all 6 header levels with custom color here?
}

function ProjectAboutPage({ aboutPageData, inBeta, projectDisplayName, teamArray, screenSize }) {
  const { content = '', title = '' } = aboutPageData

  const isTeamPage = title.toLowerCase().includes('team')

  return (
    <Box>
      <ZooHeaderWrapper />
      <ProjectHeader />
      <Announcements />
      {screenSize !== 'small' && (
        <FullHeightBox
          margin={{ left: 'large', right: 'large' }}
          width={{ max: 'xxlarge' }}
          pad="large"
          alignSelf="center"
        >
          <Grid columns={['small', 'flex']} gap="8%">
            <Box>
              <SidebarHeading children="About" />
              <AboutSidebar />
            </Box>
            <Box>
              <PageHeading level="2" size="large" children={isTeamPage ? 'The Team' : title} />
              {isTeamPage ? (
                <Grid columns={['flex', 'small']} gap="8%">
                  <Box>
                    <Markdownz children={content} components={components} />
                  </Box>
                  <Box>
                    <TeamHeading children={`${projectDisplayName} TEAM`} margin='0'/>
                    {teamArray.length && (
                      <StyledList as="ul">
                        {teamArray.map(user => (
                          <TeamMember key={user.id} user={user} />
                        ))}
                      </StyledList>
                    )}
                  </Box>
                </Grid>
              ) : (
                <Markdownz children={content} components={components} />
              )}
            </Box>
          </Grid>
        </FullHeightBox>
      )}
      {screenSize === 'small' && (
        <Box background="white" pad="small">
          <AboutDropdownNav />
          <PageHeading level="2" size="medium" children={title}/>
          <Markdownz children={content} components={components} />
        </Box>
      )}
      <ZooFooter />
    </Box>
  )
}

ProjectAboutPage.defaultProps = {
  aboutPageData: {},
  inBeta: false,
  teamArray: []
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

export default withTheme(withResponsiveContext(ProjectAboutPage))

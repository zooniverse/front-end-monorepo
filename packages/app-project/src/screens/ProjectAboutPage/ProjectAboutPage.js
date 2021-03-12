import { Box, Grid, Heading, Text } from 'grommet'
import { arrayOf, bool, object, shape, string } from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { withResponsiveContext } from '@zooniverse/react-components'

/** Components */
import StandardLayout from '@shared/components/StandardLayout'
import { SpacedHeading, SpacedText } from '@zooniverse/react-components'
import AboutSidebar from './components/AboutSidebar'
import AboutDropdownNav from './components/AboutDropdownNav'
import TeamMember from './components/TeamMember'
import AboutMarkdownz from './components/AboutMarkdownz/AboutMarkdownz'

const FullHeightBox = styled(Box)`
  min-height: 98vh;
`

const PageHeading = styled(Heading)`
  font-weight: normal;
  font-size: 40px;
  margin-bottom: 30px;
`

const SidebarHeading = styled(SpacedHeading)`
  padding: 5px 20px;
`

function ProjectAboutPage({
  aboutPageData,
  inBeta,
  projectDisplayName,
  teamArray,
  screenSize
}) {
  const { content = '', title = '' } = aboutPageData

  const isTeamPage = title.toLowerCase().includes('team')

  return (
    <StandardLayout inBeta={inBeta}>
      <FullHeightBox
        background='neutral-6'
        border={{
          color: 'light-3',
          size: '1px',
          style: 'solid',
          side: 'vertical'
        }}
        height={{ min: '98vh' }}
        margin={{ left: 'large', right: 'large' }}
        width={{ min: 'fill-available', max: 'xxlarge' }}
        pad="large"
        alignSelf="center"
        flex
      >
        <Grid columns={(screenSize === 'small') ? ['auto'] : ['small', 'flex']} gap="8%">
          {(screenSize !== 'small') ? (
            <Box>
              <SidebarHeading children="About" />
              <AboutSidebar />
            </Box>) : (
              <AboutDropdownNav />
            )
          }
          <Box>
            <PageHeading
              children={isTeamPage ? 'The Team' : title}
            />
            {isTeamPage ? (
              <Grid columns={(screenSize === 'small') ? ['auto'] : ['flex', 'small']} gap="8%">
                <AboutMarkdownz content={content} />
                <Box>
                  <SpacedText margin={{ bottom: '14px' }} children={`${projectDisplayName} TEAM`} weight='bold' color='black' />
                  {teamArray.length && (
                    <Box as="ul" margin='none' pad='none'>
                      {teamArray.map(user => (
                        <TeamMember key={user.id} user={user} />
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>
            ) : (
              <AboutMarkdownz content={content} />
            )}
          </Box>
        </Grid>
      </FullHeightBox>
    </StandardLayout>
    // <StandardLayout inBeta={inBeta}>
    //   {screenSize !== 'small' && (
    //     <FullHeightBox
    //       margin={{ left: 'large', right: 'large' }}
    //       width={{ max: 'xxlarge' }}
    //       pad="large"
    //       alignSelf="center"
    //     >
    //       <Grid columns={['small', 'flex']} gap="8%">
    //         <Box>
    //           <SidebarHeading children="About" />
    //           <AboutSidebar />
    //         </Box>
    //         <Box>
    //           <PageHeading
    //             children={isTeamPage ? 'The Team' : title}
    //           />
    //           {isTeamPage ? (
    //             <Grid columns={['flex', 'small']} gap="8%">
    //               <AboutMarkdownz content={content} />
    //               <Box>
    //                 <TeamHeading children={`${projectDisplayName} TEAM`} />
    //                 {teamArray.length && (
    //                   <StyledList as="ul">
    //                     {teamArray.map(user => (
    //                       <TeamMember key={user.id} user={user} />
    //                     ))}
    //                   </StyledList>
    //                 )}
    //               </Box>
    //             </Grid>
    //           ) : (
    //             <AboutMarkdownz content={content} />
    //           )}
    //         </Box>
    //       </Grid>
    //     </FullHeightBox>
    //   )}
    //   {screenSize === 'small' && (
    //     <Box background="white" pad="small">
    //       <AboutDropdownNav />
    //       <PageHeading level="2" size="medium" children={title} />
    //       {isTeamPage ? (
    //           <Box>
    //           <AboutMarkdownz content={content} />
    //             <TeamHeading children={`${projectDisplayName} TEAM`} style={{ marginTop: '14px' }} />
    //             {teamArray.length && (
    //               <StyledList as="ul">
    //                 {teamArray.map(user => (
    //                   <TeamMember key={user.id} user={user} />
    //                 ))}
    //               </StyledList>
    //             )}
    //           </Box>
    //       ) : (
    //         <AboutMarkdownz content={content} />
    //       )}
    //     </Box>
    //   )}
    // </StandardLayout>
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

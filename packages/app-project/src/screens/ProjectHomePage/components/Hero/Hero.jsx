import { Box, Grid, ResponsiveContext } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { arrayOf, shape, string } from 'prop-types'
import { useContext } from 'react'
import styled, { useTheme } from 'styled-components'

import Background from './components/Background'
import Introduction from './components/Introduction'
import NotApproved from './components/NotApproved/NotApproved'
import OrganizationLink from './components/OrganizationLink'
import WorkflowSelector from '@shared/components/WorkflowSelector'

const StyledGrid = styled(Grid)`
  width: 100%;
  grid-template-columns: 62% 38%;

  @media (width < 769px) {
    grid-template-columns: none;
    grid-template-rows: auto;
  }
`

const Relative = styled(Box)`
  position: relative;
`

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { organization, project } = store

  const hideNotLaunchApprovedBanner =
    project?.launch_approved ||
    project?.experimental_tools?.includes('hideNotLaunchApprovedBanner')

  return {
    organization,
    hideNotLaunchApprovedBanner
  }
}

function Hero({ workflows = [] }) {
  const { organization, hideNotLaunchApprovedBanner } = useStores()
  const size = useContext(ResponsiveContext)
  const theme = useTheme()

  return (
    <StyledGrid>
      <Relative>
        <Background />
        {hideNotLaunchApprovedBanner ? null : <NotApproved />}
      </Relative>
      <Relative
        background={{
          dark: 'dark-3',
          light: 'white'
        }}
        gap='small'
        pad='medium'
        margin={
          size === 'small'
            ? { top: 'medium-neg', horizontal: 'medium' }
            : 'none'
        }
        elevation={theme?.dark ? 'xlarge' : 'none'}
      >
        <Introduction />
        {organization.id ? (
          <OrganizationLink
            slug={organization.slug}
            title={organization.title}
          />
        ) : null}
        <WorkflowSelector workflows={workflows} />
      </Relative>
    </StyledGrid>
  )
}

Hero.propTypes = {
  /** An array of workflows for the workflow menu. */
  workflows: arrayOf(
    shape({
      id: string.isRequired
    })
  )
}

export default observer(Hero)

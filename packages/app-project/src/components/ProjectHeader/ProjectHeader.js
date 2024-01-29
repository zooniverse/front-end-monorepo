import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'
import { useTranslation } from 'next-i18next'
import { useResizeDetector } from 'react-resize-detector'

import {
  ApprovedIcon,
  Avatar,
  Background,
  DropdownNav,
  LocaleSwitcher,
  OrganizationLink,
  Nav,
  ProjectTitle
} from './components/'
import { useStores } from './hooks/'

// Background component has (position: absolute)
const Relative = styled(Box)`
  position: relative;
`

const UnderReviewLabel = styled(SpacedText)`
  @media (width < 48rem) {
    text-align: center;
  }
`


function ProjectHeader({ adminMode = false, className = '' }) {
  const { width, height, ref } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 100
  })
  const {
    availableLocales,
    inBeta,
    organizationTitle,
    organizationSlug,
    title
  } = useStores()
  const hasTranslations = availableLocales?.length > 1
  const directionBreakpoint = hasTranslations ? 1000 : 900

  const direction = width < directionBreakpoint ? 'column' : 'row'
  const useDropdownNav = width < directionBreakpoint + 200

  const maxTitleWidth = '36rem'

  const { t } = useTranslation('components')

  return (
    <Relative ref={ref} className={className}>
      <Background />
      {organizationTitle && !useDropdownNav ? (
        <OrganizationLink slug={organizationSlug} title={organizationTitle} />
      ) : null}
      <Relative
        align='center'
        direction={direction}
        justify='between'
        pad={{
          bottom: 'medium',
          horizontal: 'medium',
          top: organizationTitle && !useDropdownNav ? '0' : 'medium'
        }}
      >
        <Box direction={direction} gap='small'>
          <Box align='center' direction='row' gap='medium'>
            <Box align='center' direction={direction} gap='medium'>
              <Avatar />
              <Box>
                <Box
                  direction='row'
                  gap='small'
                  align='center'
                  width={{ max: maxTitleWidth }}
                >
                  <ProjectTitle title={title} />
                  <ApprovedIcon />
                </Box>
                {inBeta && (
                  <UnderReviewLabel color='accent-1' size='small'>
                    {t('ProjectHeader.UnderReviewLabel.underReview')}
                  </UnderReviewLabel>
                )}
              </Box>
            </Box>
          </Box>
          {hasTranslations && <LocaleSwitcher />}
        </Box>
        {useDropdownNav ? (
          <DropdownNav
            adminMode={adminMode}
            organizationSlug={organizationSlug}
            organizationTitle={organizationTitle}
          />
        ) : (
          <Nav adminMode={adminMode} />
        )}
      </Relative>
    </Relative>
  )
}

ProjectHeader.propTypes = {
  /** Zooniverse admin mode */
  adminMode: bool,
  /** Optional CSS classes */
  className: string
}

export default observer(ProjectHeader)

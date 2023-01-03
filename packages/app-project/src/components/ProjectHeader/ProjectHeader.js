import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'
import { useResizeDetector } from 'react-resize-detector'

import {
  ApprovedIcon,
  Avatar,
  Background,
  DropdownNav,
  LocaleSwitcher,
  Nav,
  ProjectTitle,
  UnderReviewLabel
} from './components/'
import { useStores } from './hooks/'

const StyledBox = styled(Box)`
  position: relative;
`

function ProjectHeader({
  adminMode,
  className = ''
}) {
  const { width, height, ref } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 100
  })
  const {
    availableLocales,
    inBeta,
    title
  } = useStores()

  const hasTranslations = availableLocales?.length > 1
  const maxColumnWidth = hasTranslations ? 1000 : 900
  const isNarrow = width < maxColumnWidth
  const direction = width < maxColumnWidth ? 'column' : 'row'
  const gap = width < maxColumnWidth ? 'small' : 'medium'
  const useDropdownNav = width < maxColumnWidth + 200

  /** Widths were determined visually and can be updated as needed if ProjectHeader components are refactored */
  const maxTitleWidth = (hasTranslations && width >= 1200) ? '560px' : '600px'

  return (
    <StyledBox ref={ref} className={className}>
      <Background />
      <StyledBox
        align='center'
        direction={direction}
        justify='between'
        pad='medium'
      >
        <Box direction={direction} gap='small'>
          <Box
            align='center'
            direction='row'
            gap={gap}
          >
            <Box
              align='center'
              direction={direction}
              gap='medium'
            >
              <Avatar width={isNarrow ? '40px' : '80px'} />
              <Box align={ isNarrow ? 'center' : 'start' }>
                <Box
                  direction='row'
                  gap='small'
                  align='center'
                  width={{ max: maxTitleWidth }}
                >
                  <ProjectTitle textAlign={ isNarrow ? 'center' : 'start' } title={title} />
                  <ApprovedIcon size={isNarrow ? '20px' : 'medium'} />
                </Box>
                {inBeta && <UnderReviewLabel />}
              </Box>
            </Box>
          </Box>
          {hasTranslations && <LocaleSwitcher />}
        </Box>
        {useDropdownNav ? (
          <DropdownNav
            adminMode={adminMode}
            margin={ isNarrow ? { top: 'xsmall' } : { top : 0 }}
          />
        ) : (
          <Nav adminMode={adminMode} />
        )}
      </StyledBox>
    </StyledBox>
  )
}

ProjectHeader.propTypes = {
  /** Zooniverse admin mode */
  adminMode: bool,
  /** Optional CSS classes */
  className: string
}

export default observer(ProjectHeader)

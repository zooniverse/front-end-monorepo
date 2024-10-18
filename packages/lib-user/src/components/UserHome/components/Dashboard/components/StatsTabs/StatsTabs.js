import {
  Box,
  ResponsiveContext,
  Tab,
  Tabs as GrommetTabs,
  Text,
  ThemeContext
} from 'grommet'
import { number, shape } from 'prop-types'
import { useContext } from 'react'
import styled from 'styled-components'

import { Tip } from '@components/shared'

import tabsTheme from './tabsTheme.js'

const StyledTab = styled(Tab)`
  text-transform: uppercase;
`

function Stat({ stats }) {
  return (
    <Box direction='row'>
      <Box align='center' gap='xxsmall' width='50%'>
        <Box direction='row' align='center' gap='5px'>
          <Text
            size='0.75rem'
            color={{ dark: 'white', light: 'black' }}
            weight='bold'
          >
            Classifications
          </Text>
          <Tip contentText='Click on MORE STATS to generate a volunteer certificate' />
        </Box>
        <Text color={{ light: 'neutral-1', dark: 'accent-1' }} size='xxlarge'>
          {stats.classifications?.toLocaleString()}
        </Text>
      </Box>
      <Box align='center' gap='xxsmall' width='50%'>
        <Text
          size='0.75rem'
          color={{ dark: 'white', light: 'black' }}
          weight='bold'
        >
          Projects
        </Text>
        <Text color={{ light: 'neutral-1', dark: 'accent-1' }} size='xxlarge'>
          {stats.projects?.toLocaleString()}
        </Text>
      </Box>
    </Box>
  )
}

export default function StatsTabs({ statsPreview }) {
  const size = useContext(ResponsiveContext)

  return (
    <ThemeContext.Extend value={tabsTheme}>
      <Box width={size !== 'small' ? { min: '480px' } : { min: '350px'}}>
        <GrommetTabs gap='small' size={size}>
          <StyledTab title='This Week'>
            {statsPreview?.thisWeek && <Stat stats={statsPreview.thisWeek} />}
          </StyledTab>
          <StyledTab title='All Time'>
            {statsPreview?.allTime && <Stat stats={statsPreview.allTime} />}
          </StyledTab>
        </GrommetTabs>
      </Box>
    </ThemeContext.Extend>
  )
}

StatsTabs.propTypes = {
  statsPreview: shape({
    thisWeek: shape({
      classifications: number,
      projects: number
    }),
    allTime: shape({
      classifications: number,
      projects: number
    })
  })
}

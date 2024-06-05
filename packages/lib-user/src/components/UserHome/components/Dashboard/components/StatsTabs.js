import {
  Box,
  Button,
  ResponsiveContext,
  Tab,
  Tabs as GrommetTabs,
  Text,
  ThemeContext,
  Tip
} from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { number, shape } from 'prop-types'
import { useContext } from 'react'
import { SpacedText } from '@zooniverse/react-components'

import statsTabsTheme from './StatsTabsTheme.js'

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
          <Tip
            content={
              <Text>
                Click on MORE STATS to generate a volunteer certificate
              </Text>
            }
            plain
            dropProps={{
              align: { top: 'bottom' },
              background: 'dark-4',
              round: '5px',
              pad: '5px'
            }}
          >
            <Button plain icon={<CircleInformation size='0.75rem' />} />
          </Tip>
        </Box>
        <Text color={{ light: 'neutral-1', dark: 'accent-1' }} size='xxlarge'>
          {stats.classifications.toLocaleString()}
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
          {stats.projects.toLocaleString()}
        </Text>
      </Box>
    </Box>
  )
}

export default function StatsTabs({ statsPreview }) {
  const size = useContext(ResponsiveContext)

  return (
    <ThemeContext.Extend value={statsTabsTheme}>
      {size !== 'small' ? (
        <Box width={{ min: '480px' }}>
          <GrommetTabs gap='small' flex='grow'>
            <Tab title='THIS WEEK'>
              <Stat stats={statsPreview.thisWeek} />
            </Tab>
            <Tab title='ALL TIME'>
              <Stat stats={statsPreview.allTime} />
            </Tab>
          </GrommetTabs>
        </Box>
      ) : (
        <Box gap='medium' width={{ min: '240px' }}>
          <SpacedText
            size='0.875rem'
            color={{ dark: 'white', light: 'black' }}
            textAlign='center'
            weight='bold'
          >
            This week at a glance
          </SpacedText>
          <Stat stats={statsPreview.thisWeek} />
        </Box>
      )}
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

import { Media, SpacedText } from '@zooniverse/react-components'
import { Accordion, AccordionPanel, Box, Button,Heading, Text, ThemeContext, Tip } from 'grommet'
import { CircleInformation, Multiple } from 'grommet-icons'
import styled from 'styled-components'

const HoverContent = styled(Box)`
  // When hover is not supported, such as a touchscreen
  display: none;

  @media (hover: hover) {
    /* when hover is supported */
    display: flex;
  }
`

const TipContent = ({ message = '' }) => (
  <HoverContent
    direction='row'
    align='center'
    width={{ max: '200px' }}
    animation={{ type: 'fadeIn' }}
  >
    <Box background='dark-4' round='5px' pad='5px'>
      <Text>{message}</Text>
    </Box>
  </HoverContent>
)

function InfoTip() {
  return (
    <Tip
      content={<TipContent message={`This is ancillary data about the subject you’re viewing. For more information on this, please see the About page.`} />}
      plain
      dropProps={{ align: { bottom: 'top' } }}
    >
      <Button
        a11yTitle='More information about ancillary data'
        icon={
          <CircleInformation
            aria-hidden='true'
            color={{ dark: 'light-1', light: 'dark-4' }}
            size='16px'
          />
        }
        plain
      />
    </Tip>
  )
}

function AncillaryDatum({ datum }) {
  const headerLabel = (
    <Box
      align='center'
      direction='row'
      gap='xsmall'
      pad={{ vertical: 'small' }}
    >
      <Multiple
        aria-hidden='true'
        color={{ dark: 'light-1', light: 'dark-4' }}
        size='16px'
      />
      <Heading
        level={2}
        margin='none'
        size='1rem'
      >
        <SpacedText
          color={{
            dark: 'light-1',
            light: 'dark-4'
          }}
          size='1rem'
          weight='bold'
        >
          {'Ancillary Data'}
        </SpacedText>
      </Heading>
      <InfoTip />
    </Box>
  )

  return (
    <Box
      background={{
        dark: 'dark-3',
        light: 'neutral-6'
      }}
      border={{
        color: {
          dark: 'dark-3',
          light: 'light-3'
        },
        side: 'all',
        size: 'thin'
      }}
      pad={{ left: 'small' }}
      round='8px'
      width='460px'
    >
      <ThemeContext.Extend
        value={{
          accordion: {
            border: { color: 'none' },
            icons: { color: { dark: 'light-1', light: 'dark-5' }}
          }
        }}
      >
        <Accordion>
          <AccordionPanel label={headerLabel}>
            <Box
              align='center'
              justify='start'
              pad={{ bottom: 'small', right: 'small' }}
            >
              <Box
                height={{ max: '420px' }}
                width={{ max: '420px' }}
              >
                <Media
                  alt={datum.metadata?.filename || `Ancillary media ${datum.id}`}
                  fit='contain'
                  flex='shrink'
                  src={datum.src}
                />
              </Box>
            </Box>
          </AccordionPanel>
        </Accordion>
      </ThemeContext.Extend>
    </Box>
  )
}

export default AncillaryDatum

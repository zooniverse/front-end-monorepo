import { Media, SpacedText } from '@zooniverse/react-components'
import { Accordion, AccordionPanel, Box, Heading, ResponsiveContext, Text, ThemeContext, Tip } from 'grommet'
import { CircleInformation, Multiple } from 'grommet-icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('screens')

  return (
    <Tip
      content={<TipContent message={t('Talk.ancillaryDataTip')} />}
      plain
      dropProps={{ align: { bottom: 'top' } }}
    >
      <CircleInformation
        aria-label={t('Talk.ancillaryDataTip')}
        color={{ dark: 'light-1', light: 'dark-4' }}
        size='16px'
      />
    </Tip>
  )
}

function AncillaryDatum({ datum }) {
  const size = useContext(ResponsiveContext)
  const { t } = useTranslation('screens')

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
          {t('Talk.ancillaryData')}
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
        color: 'light-5',
        side: 'all',
        size: 'thin'
      }}
      pad={{ left: 'small' }}
      round='8px'
      width={size === 'small' ? '250px' : '420px'}
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
                  alt={`${t('Talk.ancillaryData')} ${datum.id}`}
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

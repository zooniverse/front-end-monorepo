import { Markdownz, SpacedText } from '@zooniverse/react-components'
import { Accordion, AccordionPanel, Anchor, Box, Grid, Heading, ThemeContext, Text } from 'grommet'
import { CircleInformation } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import { useSubjectMetadataPreference } from '@hooks'

import filterByLabel, { filters as defaultFilters } from './filterByLabel'

const StyledGrid = styled(Grid)`
  grid-gap: 20px 60px;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

function formatValue(value) {
  const stringValue = value?.toString()
  const trimmedStringValue = stringValue?.trim()
  if (trimmedStringValue?.startsWith('http')) {
    return (
      <Anchor
        href={value}
        target='_blank'
      >
        {value}
      </Anchor>
    )
  }
  if (trimmedStringValue) {
    return <Markdownz inline>{trimmedStringValue}</Markdownz>
  }

  if (value === null) {
    return 'null'
  }

  return ''
}

const DEFAULT_METADATA = {}

function SubjectMetadata({
  filters = defaultFilters,
  metadata = DEFAULT_METADATA,
  prefixes = defaultFilters
}) {
  const [isExpanded, handleToggle] = useSubjectMetadataPreference()

  const { t } = useTranslation('screens')
  
  const filteredMetadata = Object.keys(metadata)
    .filter((label) => filterByLabel(label, filters))
  const entries = filteredMetadata.map(label => {
    const value = formatValue(metadata[label])
    return {
      label: label.replace(RegExp(`^(${prefixes.join('|')})`), ''),
      value
    }
  })

  const headerLabel = (
    <Box
      align='center'
      direction='row'
      justify='between'
      fill='horizontal'
      pad={{ vertical: '12px' }}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
      >
        <CircleInformation
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
            {t('Talk.Metadata.subjectMetadata')}
          </SpacedText>
        </Heading>
      </Box>
      <Box
        align='center'
        direction='row'
        gap='xsmall'
      >
        <Text
          color={{ dark: 'light-1', light: 'dark-4' }}
          size='.75rem'
        >
          {isExpanded ? t('Talk.Metadata.collapse') : t('Talk.Metadata.expand')}
        </Text>
      </Box>
    </Box>
  )

  function handleActive() {
    handleToggle(!isExpanded)
  }

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
      width='full'
    >
      <ThemeContext.Extend
        value={{
          accordion: {
            border: { color: 'none' },
            icons: { color: { dark: 'light-1', light: 'dark-5' }}
          }
        }}
      >
        <Accordion
          activeIndex={isExpanded ? [0] : []}
          onActive={handleActive}
        >
          <AccordionPanel label={headerLabel}>
            <Box pad={{ right: 'small', vertical: 'small' }}>
              {entries.length === 0 ? (
                <Text
                  color={{ dark: 'light-1', light: 'dark-4' }}
                  size='1rem'
                >
                  {t('Talk.Metadata.noMetadata')}
                </Text>
              ) : (
                <StyledGrid>
                  {entries.map(({ label, value }) => (
                    <Box
                      key={label}
                      gap='xsmall'
                    >
                      <Text
                        color={{ dark: 'light-1', light: 'dark-4' }}
                        size='1rem'
                        weight='bold'
                        wordBreak='break-word'
                      >
                        {label}
                      </Text>
                      <Text
                        color={{ dark: 'light-1', light: 'dark-4' }}
                        size='1rem'
                        wordBreak='break-word'
                      >
                        {value}
                      </Text>
                    </Box>
                  ))}
                </StyledGrid>
              )}
            </Box>
          </AccordionPanel>
        </Accordion>
      </ThemeContext.Extend>
    </Box>
  )
}

export default SubjectMetadata

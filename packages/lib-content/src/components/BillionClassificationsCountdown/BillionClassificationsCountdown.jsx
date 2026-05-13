import { Box, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'

import { useTotalClassificationCount } from '../Stats/hooks.js'

const Container = styled(Box)`
  border: 1px dashed #f0c080;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
`

const Content = styled(Box)`
  background: white;
  border-radius: 1em;
  padding: 1em;
  max-width: 800px;
  margin: 0 auto 10px auto;
`


/*
  We have to manually add some legacy (static) stats to the UI.
  These numbers are not included in the fetch response for
  total volunteers or classifications.
  https://github.com/zooniverse/Panoptes-Front-End/pull/7167
*/
const PREPANOPTES_COUNT = 25284786 // classifications
const OUROBOROS_USER_COUNT = 114576 // volunteers

const TARGET_CLASSIFICATIONS = 1000000000

export default function BillionClassificationsCountdown() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const numberFontSize = size !== 'small' ? '5rem' : '2.5rem'

  const { data: classifications, error, isLoading } = useTotalClassificationCount()
  const totalClassifications = classifications + PREPANOPTES_COUNT

  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  if (error || isLoading) return null
  
  return (
    <Container>
      <Content>
        <Text textAlign='center'>
          {(classificationsToGo > 0)
            ? "We're approaching 1 billion classifications!"
            : "We've reached 1 billion classifications on the Zooniverse! Thank you!"
          }
        </Text>
        <Text
          textAlign='center'
        >
          {(classificationsToGo > 0)
            ? `Classifications to go: ${classificationsToGo?.toLocaleString()}`
            : `Classifications: ${totalClassifications?.toLocaleString()}`
          }
        </Text>
      </Content>
    </Container>
  )
}

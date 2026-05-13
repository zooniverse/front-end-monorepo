import { Button, Box, ResponsiveContext, Text } from 'grommet'
import { useContext, useState } from 'react'
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'
import { CloseButton } from '@zooniverse/react-components'

import { useTotalClassificationCount } from './hooks.js'

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 1em;
  right: 1em;
`

const Container = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 600;
`

const Content = styled(Box)`
  background: white;
  border-radius: 1em;
  box-shadow: 2px 2px 2px #808080;
  gap: 0.5em;
  max-width: 800px;
  margin: 0 auto 1em auto;
  position: relative;
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

  const previouslyClosed = window?.sessionStorage?.getItem('hideBillionClassificationsCountdown') || false
  const [ hideCountdown, setHideCountdown ] = useState(previouslyClosed)

  function onCloseButtonClick () {
    setHideCountdown(true)
    window?.sessionStorage?.setItem('hideBillionClassificationsCountdown', true)
  }

  const { data: classifications, error, isLoading } = useTotalClassificationCount()
  const totalClassifications = classifications + PREPANOPTES_COUNT

  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  if (error || isLoading) return null
  if (hideCountdown) return null
  
  return (
    <Container
      className='billion-classifications-countdown-container'
    >
      <Content
        className='billion-classifications-countdown-content'
        pad={{ vertical: 'medium', horizontal: 'large' }}
      >
        <StyledCloseButton
          closeFn={onCloseButtonClick}
        />
        <Text
          size='xlarge'
          textAlign='center'
        >
          {(classificationsToGo > 0)
            ? "We're approaching 1 billion classifications!"
            : "We've reached 1 billion classifications on the Zooniverse! Thank you!"
          }
        </Text>
        <Text
          size='large'
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

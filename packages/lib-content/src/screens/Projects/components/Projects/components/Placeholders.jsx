import { Box, Button, Paragraph } from 'grommet'
import styled from 'styled-components'
import { SpacedHeading } from '@zooniverse/react-components'

import { useTranslation, Trans } from '@translations/i18n'

export function ErrorPlaceholder() {
  const { t } = useTranslation()

  return (
    <Box fill>
      <Paragraph>{t('Projects.error')}</Paragraph>
    </Box>
  )
}

const StyledButton = styled(Button)`
  text-align: center;
  font-weight: bold;
`

export function EmptyPlaceholder({ clearFilters, message, setLanguages, setProjectState }) {
  const { t } = useTranslation()

  function HandleClearFilter() {
    if (message === 'language') {
      setLanguages('en')
    } else if (message === 'status') {
      setProjectState('all')
    } else {
      clearFilters()
    }
  }

  return (
    <Box
      fill
      align='center'
      justify='center'
      width={{ max: '320px' }}
      pad={{ vertical: '60px' }}
    >
      <SpacedHeading
        size='1.2rem'
        level={4}
        color={{ light: 'dark-4', dark: 'white' }}
      >
        {t('Projects.projects.none')}
      </SpacedHeading>
      <Paragraph textAlign='center' margin='none'>
        <Trans
          i18nKey={`Projects.projects.empty.${message}`}
          t={t}
          components={[
            <StyledButton
              key={`empty-state-${message}`}
              onClick={HandleClearFilter}
              color={{ light: 'neutral-1', dark: 'accent-1' }}
            />
          ]}
        />
      </Paragraph>
    </Box>
  )
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
`

export function LoadingPlaceholder() {
  return <StyledBox background={{ light: 'neutral-6', dark: 'dark-3' }} fill />
}

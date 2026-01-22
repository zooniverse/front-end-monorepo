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

export function EmptyPlaceholder({ clearFilters, setPage, setProjectStatus }) {
  const { t } = useTranslation()

  function setProjectStatusToAll() {
    setPage(1)
    setProjectStatus('all')
  }

  return (
    <Box
      fill
      align='center'
      justify='center'
      width={{ max: '340px' }}
      pad={{ vertical: '60px' }}
    >
      <SpacedHeading
        size='1.2rem'
        level={4}
        color={{ light: 'dark-4', dark: 'white' }}
      >
        {t('Projects.projects.none')}
      </SpacedHeading>
      <StyledButton
        onClick={clearFilters}
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        label={t('Projects.projects.empty.clear')}
        plain
      />
      <Paragraph textAlign='center' margin={{ top: 'large' }}>
        <Trans
          i18nKey={`Projects.projects.empty.status`}
          t={t}
          components={[
            <StyledButton
              key={`empty-state-status`}
              onClick={setProjectStatusToAll}
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

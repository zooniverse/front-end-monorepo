import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 20px;
`

export default function Resources() {
  const { t } = useTranslation()

  return (
    <Box>
      <Heading level={3} color={{ light: 'black', dark: 'white' }} size='1rem' margin={{ top: 'none' }}>
        {t('AIEthics.resources.first.heading')}
      </Heading>
      <StyledList>
        <li>
          <Anchor href='' label={t('AIEthics.resources.first.linkOne')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.first.linkTwo')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.first.linkThree')} size='1rem' />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.second.heading')}
      </Heading>
      <StyledList>
        <li>
          <Anchor href='' label={t('AIEthics.resources.second.linkOne')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.second.linkTwo')} size='1rem' />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.third.heading')}
      </Heading>
      <StyledList>
        <li>
          <Anchor href='' label={t('AIEthics.resources.third.linkOne')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.third.linkTwo')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.third.linkThree')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.third.linkFour')} size='1rem' />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.fourth.heading')}
      </Heading>
      <StyledList>
        <li>
          <Anchor href='' label={t('AIEthics.resources.fourth.linkOne')} size='1rem' />
        </li>
        <li>
          <Anchor href='' label={t('AIEthics.resources.fourth.linkTwo')} size='1rem' />
        </li>
      </StyledList>
    </Box>
  )
}

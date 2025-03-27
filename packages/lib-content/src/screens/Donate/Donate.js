'use client'

import { Anchor, Box, Image, Paragraph } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'
import styled from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'

const StyledBox = styled(Box)`
  overflow: hidden;
`

const StyledDonate = styled(Anchor)`
  display: flex;
  justify-content: center;
  width: 300px;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors['neutral-1']};
  font-size: 1rem;
  padding: 8px 5px;
  font-weight: normal;
  color: white;
  background-color: ${props => props.theme.global.colors['neutral-1']};

  &:hover {
    text-decoration: none;
  }
`

function Donate() {
  const { t } = useTranslation()

  return (
    <GetInvolvedLayout>
      <MobileHeading level={1} size='1.5rem'>
        {t('Donate.title')}
      </MobileHeading>
      <Box pad={{ horizontal: 'medium', bottom: 'xlarge' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <StyledHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            level={1}
            size='small'
          >
            {t('Donate.title')}
          </StyledHeading>
          <SpacedHeading
            level={2}
            align='center'
            size='1.5rem'
            margin={{ top: 'medium' }}
            textAlign='center'
          >
            {t('Donate.subheading')}
          </SpacedHeading>
          <StyledBox round='16px'>
            <Image src='https://static.zooniverse.org/fem-assets/donate-page.jpeg' />
          </StyledBox>
          <Paragraph margin={{ top: 'medium' }}>{t('Donate.paragraphs.first')}</Paragraph>
          <Paragraph margin='0'>{t('Donate.paragraphs.second')}</Paragraph>
          <Paragraph>{t('Donate.paragraphs.third')}</Paragraph>
          <StyledDonate
            margin={{ top: '15px' }}
            href='https://give.adlerplanetarium.org/give/245802/#!/donation/checkout'
            label={t('Donate.button')}
            alignSelf='center'
          />
        </MaxWidthContent>
      </Box>
    </GetInvolvedLayout>
  )
}

export default Donate

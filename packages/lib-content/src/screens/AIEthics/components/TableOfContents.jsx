import { Anchor, Box, Paragraph, Text } from 'grommet'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  list-style-type: none;
`

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;

  & > p {
    font-style: italic;
  }
`

export default function TableOfContents() {
  const { t } = useTranslation()

  return (
    <Box as='section'>
      <nav>
        <StyledList>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.third')} href='#key-principles' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.third')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.fourthext')} href='#internal-actions' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.fourth')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.fifthext')} href='#project-recommendations' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.fifth')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.sixth')} href='#5-ws' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.sixth')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.seventh')} href='#ai-ml-on-zooniverse' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.seventh')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.eighth')} href='#resources' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.eighth')}
            </Paragraph>
          </StyledItem>
          <StyledItem>
            <Anchor plain label={t('AIEthics.heading.nineth')} href='#faq' />
            <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
              {t('AIEthics.toc.descriptions.nineth')}
            </Paragraph>
            <StyledItem>
              <Anchor plain label={t('AIEthics.heading.tenth')} href='#about-this-framework' />
              <Paragraph margin={{ top: '0' }} color={{ light: 'black', dark: 'white' }}>
                {t('AIEthics.toc.descriptions.tenth')}
              </Paragraph>
            </StyledItem>
          </StyledItem>
        </StyledList>
      </nav>
    </Box>
  )
}

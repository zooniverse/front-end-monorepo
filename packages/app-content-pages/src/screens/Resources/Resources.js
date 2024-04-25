import { Anchor, Box, Image, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'next-i18next'
import styled, { css } from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import ZooniverseLogo from '@zooniverse/react-components/ZooniverseLogo'

import PageLayout from '../../shared/components/PageLayout/layout.js'
import Head from '../../shared/components/Head/index.js'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  list-style-type: none;
  margin-bottom: 30px;
`

const ResourceLogo = styled(Box)`
  height: 50px;
  min-width: 50px;
  max-width: 50px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${props =>
    props.theme.dark
      ? css`
          border: solid 1px ${props.theme.global.colors['dark-2']};
          box-shadow: 1px 1px 4px ${props.theme.global.colors['dark-2']};
        `
      : css`
          border: solid 1px ${props.theme.global.colors['light-5']};
          box-shadow: 1px 1px 4px ${props.theme.global.colors['light-4']};
        `}
`

function ResourcesPage() {
  const { t } = useTranslation('components')

  return (
    <>
      <Head
        description={t('Resources.description')}
        title={t('Resources.title')}
      />
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('Resources.title')}
        </MobileHeading>
        <Box pad={{ horizontal: 'medium' }} align='center'>
          <MaxWidthContent>
            <StyledHeading
              color={{ light: 'neutral-1', dark: 'accent-1' }}
              level='1'
              size='small'
            >
              {t('Resources.title')}
            </StyledHeading>
            <SpacedHeading
              align='center'
              size='1.5rem'
              margin={{ top: 'medium' }}
              textAlign='center'
            >
              {t('Resources.cite.heading')}
            </SpacedHeading>

            {/** FOR RESEARCHERS */}
            <Text
              size='1.13rem'
              weight='bold'
              color={{ light: 'black', dark: 'white' }}
            >
              {t('Resources.cite.subheadings.one')}
            </Text>
            <Paragraph margin={{ top: 'small', bottom: '0' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.one'
                t={t}
                components={[
                  <Anchor
                    key='lab-policies'
                    href='https://help.zooniverse.org/getting-started/lab-policies'
                  />
                ]}
              />
            </Paragraph>
            <Box
              border={{
                color: 'accent-1',
                size: 'medium',
                style: 'solid',
                side: 'left'
              }}
              margin={{ vertical: 'small' }}
            >
              <Text
                margin={{ vertical: '0', left: 'medium' }}
                weight='bold'
                size='1rem'
              >
                <Trans
                  i18nKey='Resources.cite.quote'
                  t={t}
                  components={[
                    <Anchor
                      key='zooniverse-home-page'
                      href='https://www.zooniverse.org'
                    />
                  ]}
                />
              </Text>
            </Box>
            <Paragraph margin='0'>
              <Trans
                i18nKey='Resources.cite.paragraphs.two'
                t={t}
                components={[
                  <Anchor
                    key='publications-form'
                    href='https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'
                  />,
                  <Anchor
                    key='publications-page'
                    href='https://www.zooniverse.org/about/publications'
                  />
                ]}
              />
            </Paragraph>
            <Paragraph margin={{ top: 'small', bottom: 'medium' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.three'
                t={t}
                components={[
                  <Anchor
                    key='contact-us'
                    href='https://www.zooniverse.org/about#contact'
                  />
                ]}
              />
            </Paragraph>

            {/** FOR MEDIA */}
            <Text
              size='1.13rem'
              weight='bold'
              color={{ light: 'black', dark: 'white' }}
            >
              {t('Resources.cite.subheadings.two')}
            </Text>
            <Paragraph margin={{ top: 'small', bottom: '0' }}>
              {t('Resources.cite.paragraphs.four')}
            </Paragraph>
            <Paragraph margin={{ vertical: 'small' }}>
              {t('Resources.cite.paragraphs.five')}
            </Paragraph>
            <Paragraph margin={{ top: '0', bottom: 'medium' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.six'
                t={t}
                components={[
                  <Anchor
                    key='contact-us'
                    href='https://www.zooniverse.org/about#contact'
                  />
                ]}
              />
            </Paragraph>

            {/** BRAND RESOURCES */}
            <SpacedHeading
              align='center'
              margin={{ top: '0', bottom: 'small' }}
              size='1.5rem'
            >
              {t('Resources.brand.heading')}
            </SpacedHeading>
            <StyledList>
              <Box
                as='li'
                direction='row'
                align='center'
                gap='small'
                margin={{ bottom: 'small' }}
              >
                <ResourceLogo>
                  <ZooniverseLogo
                    size='45px'
                    color='#005D69' // 'neutral-1' won't work here for some reason
                    id='link to logo brand resources'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://github.com/zooniverse/Brand/tree/master/style%20guide/logos'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.one')}</Text>
                  }
                />
              </Box>
              <Box
                as='li'
                direction='row'
                align='center'
                gap='small'
                margin={{ bottom: 'small' }}
              >
                <ResourceLogo>
                  <Image
                    alt=''
                    src='/about/assets/brand-links-two.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://github.com/zooniverse/Brand/tree/master/style%20guide/downloads'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.two')}</Text>
                  }
                />
              </Box>
              <Box
                as='li'
                direction='row'
                align='center'
                gap='small'
                margin={{ bottom: 'small' }}
              >
                <ResourceLogo>
                  <Image
                    alt=''
                    src='/about/assets/brand-links-three.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://www.figma.com/proto/HUWCyrjkwgPsGKLXhLGb21/Design-System'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.three')}</Text>
                  }
                />
              </Box>
              <Box as='li' direction='row' align='center' gap='small'>
                <ResourceLogo>
                  <Image
                    alt=''
                    src='/about/assets/brand-links-four.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://zooniverse.github.io/front-end-monorepo/'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.four')}</Text>
                  }
                />
              </Box>
            </StyledList>
          </MaxWidthContent>
        </Box>
      </PageLayout>
    </>
  )
}

export default ResourcesPage

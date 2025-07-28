'use client'

import { Anchor, Box, Image, Paragraph, Text } from 'grommet'
import styled, { css } from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import ZooniverseLogo from '@zooniverse/react-components/ZooniverseLogo'

import { Trans, useTranslation } from '@translations/i18n'
import AboutLayout from '@components/PageLayout/AboutLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import {
  MobileHeading,
  StyledHeading
} from '@components/SharedStyledComponents/SharedStyledComponents'

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

function Resources() {
  const { t } = useTranslation()

  return (
    <>
      <AboutLayout>
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
              {t('Resources.cite.subheadings.first')}
            </Text>
            <Paragraph margin={{ top: 'small', bottom: '0' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.first'
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
                color={{ light: 'black', dark: 'white' }}
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
                i18nKey='Resources.cite.paragraphs.second'
                t={t}
                components={[
                  <Anchor
                    key='publications-form'
                    href='https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'
                  />,
                  <Anchor
                    key='publications-page'
                    href='/about/publications'
                  />
                ]}
              />
            </Paragraph>
            <Paragraph margin={{ top: 'small', bottom: 'medium' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.third'
                t={t}
                components={[
                  <Anchor
                    key='contact-us'
                    href='/about#contact'
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
              {t('Resources.cite.subheadings.second')}
            </Text>
            <Paragraph margin={{ top: 'small', bottom: '0' }}>
              {t('Resources.cite.paragraphs.fourth')}
            </Paragraph>
            <Paragraph margin={{ vertical: 'small' }}>
              {t('Resources.cite.paragraphs.fifth')}
            </Paragraph>
            <Paragraph margin={{ top: '0', bottom: 'medium' }}>
              <Trans
                i18nKey='Resources.cite.paragraphs.sixth'
                t={t}
                components={[
                  <Anchor
                    key='contact-us'
                    href='/about#contact'
                  />
                ]}
              />
            </Paragraph>

            {/** BRAND RESOURCES */}
            <SpacedHeading
              align='center'
              margin={{ top: '0', bottom: 'small' }}
              size='1.5rem'
              textAlign='center'
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
                    id='zooniverse-logo-brand-resources'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://github.com/zooniverse/Brand/tree/master/style%20guide/logos'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.first')}</Text>
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
                    src='https://static.zooniverse.org/fem-assets/brand-links-two.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://github.com/zooniverse/Brand/tree/master/style%20guide/downloads'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.second')}</Text>
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
                    src='https://static.zooniverse.org/fem-assets/brand-links-three.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://www.figma.com/proto/HUWCyrjkwgPsGKLXhLGb21/Design-System'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.third')}</Text>
                  }
                />
              </Box>
              <Box as='li' direction='row' align='center' gap='small'>
                <ResourceLogo>
                  <Image
                    alt=''
                    src='https://static.zooniverse.org/fem-assets/brand-links-four.png'
                    fit='cover'
                  />
                </ResourceLogo>
                <Anchor
                  href='https://zooniverse.github.io/front-end-monorepo/'
                  label={
                    <Text size='1rem'>{t('Resources.brand.links.fourth')}</Text>
                  }
                />
              </Box>
            </StyledList>
          </MaxWidthContent>
        </Box>
      </AboutLayout>
    </>
  )
}

export default Resources

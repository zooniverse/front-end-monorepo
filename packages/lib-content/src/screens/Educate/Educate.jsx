'use client'

import {
  Anchor,
  Box,
  Heading,
  Paragraph,
  ResponsiveContext,
  Text
} from 'grommet'
import styled from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import { BarChart, Certificate, Workshop } from 'grommet-icons'
import { useContext } from 'react'

import { Trans, useTranslation } from '@translations/i18n.jsx'
import GetInvolvedLayout from '@components/PageLayout/GetInvolvedLayout.jsx'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent.jsx'
import {
  MobileHeading,
  StyledHeading
} from '@components/SharedStyledComponents/SharedStyledComponents.jsx'
import Article from '@components/Article/Article.jsx'

const StyledAnchor = styled(Anchor)`
  border-radius: 8px;
  color: white;
  background: url('${props => props.imgSrc}') no-repeat center;
  background-size: cover;
  font-weight: normal;
  min-height: 120px;
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    font-weight: bold;
    text-decoration: none;
  }

  // For Grommet breakpoint 'small'
  @media (width < 769px) {
    width: 100%;
  }
`

const StyledBox = styled(Box)`
  align-items: center;
`

const headingColor = { light: 'black', dark: 'white' }

function Educate() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  const articleExcerptSize = size === 'small' ? 120 : 250

  return (
    <GetInvolvedLayout>
      <MobileHeading level={1} size='1.5rem'>
        {t('Educate.title')}
      </MobileHeading>
      <Box pad={{ horizontal: 'medium', bottom: 'large' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <StyledHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            level={1}
            size='small'
          >
            {t('Educate.title')}
          </StyledHeading>
          <SpacedHeading
            level={2}
            align='center'
            size='1.5rem'
            margin={{ top: 'medium' }}
            textAlign='center'
          >
            {t('Educate.subheading')}
          </SpacedHeading>
          <Paragraph margin='0'>{t('Educate.introduction')}</Paragraph>

          <Box
            direction={size === 'small' ? 'column' : 'row'}
            fill
            gap='small'
            margin={{ vertical: 'medium' }}
          >
            <StyledAnchor
              href='https://blog.zooniverse.org/2020/03/18/zooniverse-remote-online-learning-resources'
              label={t('Educate.buttons.first')}
              imgSrc='https://static.zooniverse.org/fem-assets/educate-btn1.jpg'
            />
            <StyledAnchor
              href='https://classroom.zooniverse.org/#/zooniverse-in-schools'
              label={t('Educate.buttons.second')}
              imgSrc='https://static.zooniverse.org/fem-assets/educate-btn2.jpg'
            />
            <StyledAnchor
              href='https://classroom.zooniverse.org/#/activities-for-undergraduates'
              label={t('Educate.buttons.third')}
              imgSrc='https://static.zooniverse.org/fem-assets/educate-btn3.jpg'
            />
          </Box>

          {/** Resources for Educators */}
          <Box
            direction='row'
            justify='between'
            align='center'
            margin={{ bottom: '15px' }}
          >
            <Heading
              level={3}
              size='1.13rem'
              weight='bold'
              color={headingColor}
            >
              {t('Educate.forEducators.heading')}
            </Heading>
            <Anchor
              size='1rem'
              label={t('Educate.forEducators.classrooms')}
              href='https://classroom.zooniverse.org'
            />
          </Box>
          <Box gap='medium'>
            <StyledBox direction='row' gap='small'>
              <BarChart size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'black', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.first')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.first'
                    t={t}
                    components={[
                      <Anchor
                        key='group-stats-blog'
                        href='https://blog.zooniverse.org/2024/09/17/launch-news-community-building-pages'
                      />
                    ]}
                  />
                </Paragraph>
              </Box>
            </StyledBox>
            <StyledBox direction='row' gap='small'>
              <Workshop size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'black', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.second')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.second'
                    t={t}
                    components={[
                      <Anchor
                        key='project-education-page'
                        href='https://www.zooniverse.org/projects/zooniverse/snapshot-wisconsin/about/education'
                      />
                    ]}
                  />
                </Paragraph>
              </Box>
            </StyledBox>
            <StyledBox direction='row' gap='small'>
              <Certificate size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'black', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.third')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.third'
                    t={t}
                    components={[
                      <Anchor
                        key='stats-in-classrooms-blog'
                        href='https://blog.zooniverse.org/2024/10/01/fulfilling-service-hour-requirements-through-zooniverse-2'
                      />
                    ]}
                  />
                </Paragraph>
              </Box>
            </StyledBox>
          </Box>

          {/** Articles */}
          <Heading
            level={3}
            size='1.13rem'
            weight='bold'
            color={headingColor}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            {t('Educate.articles.heading')}
          </Heading>
          <Box gap='small'>
            <Article
              date={t('Educate.articles.first.datePublished')}
              excerpt={
                t('Educate.articles.first.excerpt').slice(0, articleExcerptSize) +
                '...'
              }
              title={t('Educate.articles.first.title')}
              url='https://astroedjournal.org/index.php/ijae/article/view/43'
            />
            <Article
              date={t('Educate.articles.second.datePublished')}
              excerpt={
                t('Educate.articles.second.excerpt').slice(0, articleExcerptSize) +
                '...'
              }
              title={t('Educate.articles.second.title')}
              url='https://blog.zooniverse.org/2019/08/14/uscientist-and-the-galaxy-zoo-touch-table-at-adler-planetarium'
            />
            <Article
              date={t('Educate.articles.third.datePublished')}
              excerpt={
                t('Educate.articles.third.excerpt').slice(
                  0,
                  articleExcerptSize
                ) + '...'
              }
              title={t('Educate.articles.third.title')}
              url='https://www.bpl.org/blogs/post/8th-graders-in-missouri-transcribe-anti-slavery-documents-and-learn-about-the-abolitionist-movement'
            />
            <Article
              date={t('Educate.articles.fourth.datePublished')}
              excerpt={
                t('Educate.articles.fourth.excerpt').slice(
                  0,
                  articleExcerptSize
                ) + '...'
              }
              title={t('Educate.articles.fourth.title')}
              url='https://blog.zooniverse.org/2015/04/29/floating-forests-teaching-young-children-about-kelp'
            />
          </Box>

          <Heading
            level={3}
            size='1.13rem'
            weight='bold'
            color={headingColor}
            margin={{ top: '30px' }}
          >
            {t('Educate.takePart.heading')}
          </Heading>
          <Paragraph pad='0' margin='0'>
            <Trans
              i18nKey='Educate.takePart.paragraph'
              t={t}
              components={[
                <Anchor
                  key='zooniverse-blog'
                  href='https://blog.zooniverse.org'
                />,
                <Anchor
                  key='Talk-education'
                  href='https://www.zooniverse.org/talk/16'
                />
              ]}
            />
          </Paragraph>
        </MaxWidthContent>
      </Box>
    </GetInvolvedLayout>
  )
}

export default Educate

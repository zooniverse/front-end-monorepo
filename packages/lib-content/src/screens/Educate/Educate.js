'use client'

import {
  Anchor,
  Box,
  Heading,
  Paragraph,
  ResponsiveContext,
  Text
} from 'grommet'
import { Trans, useTranslation } from '../../translations/i18n.js'
import styled from 'styled-components'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import { BarChart, Certificate, Workshop } from 'grommet-icons'
import { useContext } from 'react'

import GetInvolvedLayout from '../../components/PageLayout/GetInvolvedLayout'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import {
  MobileHeading,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'
import Article from '../../components/Article/Article.js'

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
              label={t('Educate.buttons.one')}
              imgSrc='https://static.zooniverse.org/fem-assets/educate-btn1.jpg'
            />
            <StyledAnchor
              href='https://classroom.zooniverse.org/#/zooniverse-in-schools'
              label={t('Educate.buttons.two')}
              imgSrc='https://static.zooniverse.org/fem-assets/educate-btn2.jpg'
            />
            <StyledAnchor
              href='https://blog.zooniverse.org/2022/07/13/zooniverse-based-activities-for-undergraduates-are-here'
              label={t('Educate.buttons.three')}
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
              size='0.75rem'
              weight='normal'
              color={{
                dark: 'light-4',
                light: 'dark-5'
              }}
              label={t('Educate.forEducators.classrooms')}
              href='https://classroom.zooniverse.org'
            />
          </Box>
          <Box gap='medium'>
            <StyledBox direction='row' gap='small'>
              <BarChart size='50px' color={{ light: 'neutral-1', dark: 'accent-1' }} />
              <Box>
                <Text
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.one')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.one'
                    t={t}
                    components={[
                      <Anchor
                        key='group-stats-announcement'
                        href='' // Need url after blog post,
                        // Add the sentence "Read our annoucement for more details, and tag <0>annoucement</0>"
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
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.two')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.two'
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
                  color={{ light: 'neutral-1', dark: 'white' }}
                  weight='bold'
                  size='1rem'
                >
                  {t('Educate.forEducators.subheadings.three')}
                </Text>
                <Paragraph pad='0' margin='0'>
                  <Trans
                    i18nKey='Educate.forEducators.paragraphs.three'
                    t={t}
                    // Updated blog post text coming in October
                    // "See this <0>blog post</0> for details."
                    components={[
                      <Anchor
                        key='group-stats-announcement'
                        href='' // Need url after blog post
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
              date={t('Educate.articles.one.datePublished')}
              excerpt={
                t('Educate.articles.one.excerpt').slice(0, articleExcerptSize) +
                '...'
              }
              title={t('Educate.articles.one.title')}
              url='https://astroedjournal.org/index.php/ijae/article/view/43'
            />
            <Article
              date={t('Educate.articles.two.datePublished')}
              excerpt={
                t('Educate.articles.two.excerpt').slice(0, articleExcerptSize) +
                '...'
              }
              title={t('Educate.articles.two.title')}
              url='https://blog.zooniverse.org/2019/08/14/uscientist-and-the-galaxy-zoo-touch-table-at-adler-planetarium'
            />
            <Article
              date={t('Educate.articles.three.datePublished')}
              excerpt={
                t('Educate.articles.three.excerpt').slice(
                  0,
                  articleExcerptSize
                ) + '...'
              }
              title={t('Educate.articles.three.title')}
              url='https://www.bpl.org/blogs/post/8th-graders-in-missouri-transcribe-anti-slavery-documents-and-learn-about-the-abolitionist-movement'
            />
            <Article
              date={t('Educate.articles.four.datePublished')}
              excerpt={
                t('Educate.articles.four.excerpt').slice(
                  0,
                  articleExcerptSize
                ) + '...'
              }
              title={t('Educate.articles.four.title')}
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

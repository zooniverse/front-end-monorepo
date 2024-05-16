import { Anchor, Box, Heading } from 'grommet'
import { useTranslation } from '../../../translations/i18n.js'
import { SpacedHeading } from '@zooniverse/react-components'
import styled from 'styled-components'

import Article from '../../../components/Article/Article.js'
import SubHeading from '../../../components/HeadingForAboutNav/SubHeading.js'

export default function Community({ blogPosts = [] }) {
  const { t } = useTranslation()

  return (
    <Box
      round='xsmall'
      pad={{ vertical: 'small', horizontal: 'medium' }}
      border={{ color: { light: 'light-1', dark: 'dark-1' } }}
    >
      <SpacedHeading
        color={{ light: 'neutral-1', dark: 'accent-1' }}
        level={2}
        size='1.5rem'
        alignSelf='center'
      >
        {t('Home.Community.heading')}
      </SpacedHeading>
      <SubHeading>{t('Home.Community.subheading')}</SubHeading>

      {/* The Daily Zooniverse */}
      <Box
        border={{
          side: 'bottom',
          color: { light: 'light-4', dark: 'black' },
          size: 'xsmall'
        }}
        direction='row'
        justify='between'
        align='center'
        margin={{ vertical: 'small' }}
      >
        <Heading level={3} size='1rem'>
          {t('Home.Community.feedOne')}
        </Heading>
        <Anchor href='https://daily.zooniverse.org' size='1rem'>
          {t('Home.Community.seeAll')}
        </Anchor>
      </Box>
      <Box gap='small' margin={{ bottom: 'medium' }}>
        {blogPosts.slice(0, 4).map(item => (
          <Article key={item.id} {...item} />
        ))}
      </Box>

      {/* The Zooniverse Blog */}
      <Box
        direction='row'
        justify='between'
        align='center'
        border={{
          position: 'bottom',
          color: { light: 'light-1', dark: 'dark-1' }
        }}
      >
        <Heading level={3} size='1rem'>
          {t('Home.Community.feedTwo')}
        </Heading>
        <Anchor href='https://blog.zooniverse.org' size='1rem'>
          {t('Home.Community.seeAll')}
        </Anchor>
      </Box>
      <Box gap='small'>
        {blogPosts.slice(4).map(item => (
          <Article key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  )
}

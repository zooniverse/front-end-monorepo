import { Anchor, Box, Heading, Paragraph, ResponsiveContext } from 'grommet'
import { string } from 'prop-types'
import { useTranslation } from '../../translations/i18n.js'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'
import { useContext } from 'react'

const StyledParagraph = styled(Paragraph)`
  line-height: 1.2;
`

export default function Article({
  date = '',
  excerpt = '',
  imageSrc = '',
  title = '',
  url = ''
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  return (
    <Box
      direction='row'
      elevation='small'
      pad='small'
      gap='small'
      background={{ light: 'light-1', dark: 'dark-1' }}
      round='xxsmall'
      border={{ color: { light: 'light-5', dark: 'black' }, size: 'xsmall' }}
      data-testid='community-article'
    >
      {imageSrc.length && size !== 'small' ? (
        <Box
          alignSelf='center'
          background={`url('${imageSrc}')`}
          flex='grow'
          height={{ max: '120px', min: '120px' }}
          width={{ max: '120px', min: '120px' }}
        />
      ) : null}
      <Box>
        <SpacedText
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          size='0.75rem'
          margin={{ bottom: 'xxsmall' }}
          weight='bold'
        >
          {date}
        </SpacedText>
        <Heading
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          level={4}
          size={size !== 'small' ? '1.5rem' : '1.2rem'}
          margin='0'
          weight='bold'
          fill
        >
          <Anchor href={url}>{title}</Anchor>
        </Heading>
        <StyledParagraph color={{ light: 'black', dark: 'white' }}>
          {size !== 'small' ? excerpt : excerpt.slice(0, 160) + '...'}
        </StyledParagraph>
        <Anchor
          href={url}
          size='1rem'
          alignSelf='end'
          color={{ light: 'dark-5', dark: 'white' }}
          weight='normal'
        >
          {t('Article.url')}
        </Anchor>
      </Box>
    </Box>
  )
}

Article.propTypes = {
  date: string,
  excerpt: string,
  imageSrc: string,
  title: string,
  url: string
}

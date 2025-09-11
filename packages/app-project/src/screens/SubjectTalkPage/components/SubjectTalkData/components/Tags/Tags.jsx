import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Button, Heading } from 'grommet'
import { Add, Tag as TagIcon } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import Tag from './components/Tag'

const StyledHeading = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

const StyledOrderedList = styled(Box)`
  list-style: none;
`

const StyledBox = styled(Box)`
  &::before,
  &::after {
    content: "";
    flex: 1 1 auto;
    height: 1px;
    background: ${props => props.theme.dark ? props.theme.global.colors['accent-1'] : props.theme.global.colors['neutral-1']};
  }
`

const StyledAddTagButton = styled(Button)`
  &:focus,
  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    text-decoration: none;
  }
`

const DEFAULT_HANDLER = () => true

function Tags({
  error = undefined,
  loading = false,
  onTagClick = DEFAULT_HANDLER,
  tags = undefined,
  userId = undefined
}) {
  const { t } = useTranslation('screens')

  const tagHeading = tags?.length > 0 ? t('Talk.tags') : t('Talk.noTags')

  return (
    <Box
      gap='small'
      height={{ min: 'auto' }}
      pad='small'
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
      >
        <TagIcon />
        <StyledHeading
          color={{ dark: 'light-1', light: 'dark-4' }}
          level={3}
          size='1rem'
        >
          {tagHeading}
        </StyledHeading>
      </Box>
      {error ? (
        <Box align='center' justify='center' fill pad='medium'>
          <SpacedText uppercase={false}>
            {error?.message}
          </SpacedText>
        </Box>
      ) : loading ? (
        <Box align='center' justify='center' fill pad='medium'>
          <Loader />
        </Box>
      ) : tags?.length > 0 ? (
        <StyledOrderedList
          forwardedAs='ol'
          direction='row'
          margin='none'
          pad='none'
          wrap
        >
          {tags?.map(tag => (
            <li
              key={`${tag.id}-${tag.name}`}
              style={{ margin: '0 10px 10px 0' }}
            >
              <Tag
                disabled={!userId || loading}
                name={tag.name}
                onClick={() => onTagClick(tag)}
                userVoted={tag.userVoted}
                voteCount={tag.vote_count}
              />
            </li>
          ))}
        </StyledOrderedList>
      ) : (
        <StyledBox
          align='center'
          direction='row'
        >
          <StyledAddTagButton
            label={(
              <Box
                align='center'
                direction='row'
                gap='xsmall'
                justify='center'
              >
                <TagIcon
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='18px'
                />
                <SpacedText
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='18px'
                  weight={600}
                >
                  {t('Talk.addATag')}
                </SpacedText>
                <Add
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='18px'
                />
              </Box>
            )}
            margin={{ horizontal: 'xsmall' }}
            plain
          />
        </StyledBox>
      )}
    </Box>
  )
}

Tags.propTypes = {
  error: shape({ message: string }),
  loading: bool,
  onTagClick: func,
  tags: arrayOf(
    shape({
      id: string,
      name: string,
      userVoted: bool,
      vote_count: number
    })
  ),
  userId: string
}

export default Tags

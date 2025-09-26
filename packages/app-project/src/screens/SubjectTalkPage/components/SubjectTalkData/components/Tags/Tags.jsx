import { Loader, SpacedHeading, SpacedText } from '@zooniverse/react-components'
import { Box, Button } from 'grommet'
import { Add, Tag as TagIcon } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import Tag from './components/Tag'

const StyledOrderedList = styled(Box)`
  list-style: none;
  row-gap: 10px;
  column-gap: 10px;
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
  onAddTagClick = DEFAULT_HANDLER,
  onTagClick = DEFAULT_HANDLER,
  tags = undefined,
  userId = undefined,
  voteUpdating = false
}) {
  const { t } = useTranslation('screens')

  const tagHeading = tags?.length > 0 ? t('Talk.Tags.tags') : t('Talk.Tags.noTags')

  return (
    <Box
      gap='small'
      height={{ min: 'auto' }}
      pad='small'
    >
      <Box
        direction='row'
        justify='between'
      >
        <Box
          align='center'
          direction='row'
          gap='xsmall'
        >
          <TagIcon />
          <SpacedHeading
            color={{ dark: 'light-1', light: 'dark-4' }}
            level={3}
            margin='none'
            size='1rem'
          >
            {tagHeading}
          </SpacedHeading>
        </Box>
        <Box
          align='center'
          direction='row'
          gap='xsmall'
        >
          {(tags?.length > 0 && userId) ? (
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
                    size='16px'
                  />
                  <SpacedText
                    color={{ dark: 'accent-1', light: 'neutral-1' }}
                    size='1rem'
                  >
                    {t('Talk.Tags.addATag')}
                  </SpacedText>
                </Box>
              )}
              margin={{ horizontal: 'xsmall' }}
              onClick={onAddTagClick}
              plain
            />
          ) : !userId ? (
            <SpacedText uppercase={false}>
              {t('Talk.Tags.signInToTag')}
            </SpacedText>
          ) : null}
        </Box>
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
            >
              <Tag
                disabled={!userId || voteUpdating}
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
            disabled={!userId}
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
                  size='1.125rem'
                  weight={600}
                >
                  {t('Talk.Tags.addATag')}
                </SpacedText>
                <Add
                  color={{ dark: 'accent-1', light: 'neutral-1' }}
                  size='18px'
                />
              </Box>
            )}
            margin={{ horizontal: 'xsmall' }}
            onClick={onAddTagClick}
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

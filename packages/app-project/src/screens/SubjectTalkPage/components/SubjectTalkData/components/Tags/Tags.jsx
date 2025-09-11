import { Box, Heading } from 'grommet'
import { Tag as TagIcon } from 'grommet-icons'
import { arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import Tag from './components/Tag'

const StyledHeading = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

const DEFAULT_HANDLER = () => true

function Tags({
  error = '',
  loading = false,
  onTagClick = DEFAULT_HANDLER,
  tags = undefined,
  userId = undefined
}) {
  return (
    <Box
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
          Tags
        </StyledHeading>
      </Box>
      <Box
        as='ol'
        direction='row'
        wrap
        style={{ listStyleType: 'none', paddingLeft: 0 }}
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
      </Box>
    </Box>
  )
}

Tags.propTypes = {
  error: string,
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

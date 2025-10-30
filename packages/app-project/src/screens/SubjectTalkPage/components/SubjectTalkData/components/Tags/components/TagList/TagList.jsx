import { Box } from 'grommet'
import { arrayOf, bool, func, shape, string } from 'prop-types'
import styled from 'styled-components'

import Tag from '../Tag'

const StyledOrderedList = styled(Box)`
  list-style: none;
  row-gap: 10px;
  column-gap: 10px;
`

const DEFAULT_HANDLER = () => true

function TagList({
  disabled = false,
  onTagClick = DEFAULT_HANDLER,
  tags = []
}) {
  return (
    <StyledOrderedList
      forwardedAs='ol'
      direction='row'
      margin='none'
      pad='2px'
      wrap
    >
      {tags.map(tag => (
        <li key={`${tag.id}-${tag.name}`}>
          <Tag
            disabled={disabled}
            onClick={onTagClick}
            tag={tag}
          />
        </li>
      ))}
    </StyledOrderedList>
  )
}

TagList.propTypes = {
  disabled: bool,
  onTagClick: func,
  tags: arrayOf(
    shape({
      id: string,
      name: string
    })
  )
}

export default TagList  

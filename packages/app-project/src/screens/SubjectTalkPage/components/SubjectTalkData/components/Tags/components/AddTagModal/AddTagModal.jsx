import { Modal, SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { useState } from 'react'
import styled from 'styled-components'

import {
  createVotableTag
} from '@helpers'

import {
  usePopularTags
} from'@hooks'

import Tag from '../Tag'

const StyledOrderedList = styled(Box)`
  list-style: none;
  row-gap: 10px;
  column-gap: 10px;
`

function AddTagModal({
  active = false,
  combinedTags = [],
  handleClose,
  projectDisplayName = '',
  projectId,
  subjectId,
}) {
  const [loading, setLoading] = useState(false)

  const popularTagsQuery = {
    limit: 20,
    page_size: 20,
    section: `project-${projectId}`
  }

  const {
    data: popularTags,
    error: popularTagsError,
    isLoading: popularTagsIsLoading
  } = usePopularTags(popularTagsQuery)

  const filteredPopularTags = popularTags?.filter(tag => !combinedTags.some(combinedTag => combinedTag.name === tag.name))

  async function handleClick(name) {
    const newVotableTag = {
      name: name,
      section: `project-${projectId}`,
      taggable_id: subjectId,
      taggable_type: 'Subject'
    }

    try {
      setLoading(true)
      await createVotableTag(newVotableTag)
      setLoading(false)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      active={active}
      closeFn={handleClose}
      headingBackground='transparent'
      role='dialog'
      round='8px'
      title='Add a Tag'
      titleColor='black'
    >
      <Box
        gap='small'
      >
        <SpacedText>
          {`From ${projectDisplayName}`}
        </SpacedText>
        <StyledOrderedList
          forwardedAs='ol'
          direction='row'
          margin='none'
          pad='none'
          wrap
        >
          {filteredPopularTags?.map(tag => (
            <li
              key={`${tag.id}-${tag.name}`}
            >
              <Tag
                disabled={loading}
                name={tag.name}
                onClick={() => handleClick(tag.name)}
              />
            </li>
          ))}
        </StyledOrderedList>
      </Box>
    </Modal>
  )
}

export default AddTagModal

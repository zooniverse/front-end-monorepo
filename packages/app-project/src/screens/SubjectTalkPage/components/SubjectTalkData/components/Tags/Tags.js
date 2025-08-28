import { Box, Heading } from 'grommet'
import { Tag as TagIcon } from 'grommet-icons'
import { string } from 'prop-types'
import styled from 'styled-components'

import {
  addTagVote,
  createVotableTag,
  removeTagVote
} from '@helpers'

import {
  useTags,
  useTagVotes,
  useVotableTags
} from '@hooks'

import Tag from './components/Tag'

const StyledHeading = styled(Heading)`
  letter-spacing: 0.8px;
  text-transform: uppercase;
`

function Tags({
  projectId,
  subjectId,
  userId
}) {
  const tagsQuery = {
    limit: 10,
    page_size: 10,
    section: `project-${projectId}`,
    taggable_type: 'Subject',
    taggable_id: subjectId,
  }
  
  const {
    data: tags,
    error,
    isLoading
  } = useTags(tagsQuery)

  const votableTagsQuery = {
    page_size: 10,
    section: `project-${projectId}`,
    taggable_type: 'Subject',
    taggable_id: subjectId
  }

  const {
    data: votableTags,
    error: votableTagsError,
    isLoading: votableTagsIsLoading,
    mutate: mutateVotableTags
  } = useVotableTags(votableTagsQuery)

  const tagVotesQuery = {
    page_size: 100, // TODO: implement getAll ?
    section: `project-${projectId}`,
    taggable_id: subjectId,
    taggable_type: 'Subject',
    user_id: userId
  }

  const {
    data: tagVotes,
    error: tagVotesError,
    isLoading: tagVotesIsLoading,
    mutate: mutateTagVotes
  } = useTagVotes(tagVotesQuery)

  let combinedTags = []
  if (tags && votableTags) {
    const votableTagNames = votableTags.map(tag => tag.name)
    const filteredTags = tags.filter(tag => !votableTagNames.includes(tag.name))
    combinedTags = [...votableTags, ...filteredTags]

    // Add userVoted property to votableTags
    combinedTags = combinedTags.map(tag => {
      if (votableTags.some(votableTag => votableTag.id === tag.id)) {
        return {
          ...tag,
          userVoted: tag.userVoted || tagVotes?.some(vote => vote.votable_tag_id === tag.id) || false
        }
      }
      return tag
    })
  } else if (votableTags) {
    combinedTags = votableTags.map(tag => ({
      ...tag,
      userVoted: tag.userVoted || tagVotes?.some(vote => vote.votable_tag_id === tag.id) || false
    }))
  } else if (tags) {
    combinedTags = tags
  }

  function handleAddVote(tag) {
    const newTagVote = {
      votable_tag_id: tag.id
    }

    mutateVotableTags(
      prevData => {
        if (!prevData) {
          const modifiedTag = {
            ...tag,
            userVoted: true,
            vote_count: 1,
          }

          return [modifiedTag]
        } else {
          const newData = prevData.map(t => {
            if (t.id === tag.id) {
              return {
                ...t,
                userVoted: true,
                vote_count: t.vote_count + 1
              }
            }
            return t
          })
          return newData
        }
      },
      {
        revalidate: false
      }
    )

    mutateTagVotes(
      prevData => {
        if (!prevData) {
          return [newTagVote]
        } else {
          const newData = [...prevData, newTagVote]
          return newData
        }
      },
      {
        revalidate: false
      }
    )

    try {
      addTagVote(newTagVote)
    } catch (error) {
      console.error(error)
    }
  }

  function handleCreateVotableTag(tag) {
    const newVotableTag = {
      name: tag.name,
      section: `project-${projectId}`,
      taggable_id: subjectId,
      taggable_type: 'Subject'
    }

    mutateVotableTags(
      prevData => {
        if (!prevData) {
          const modifiedTag = {
            ...newVotableTag,
            userVoted: true,
            vote_count: 1,
          }

          return [modifiedTag]
        } else {
          const newData = [...prevData, modifiedTag]
          return newData
        }
      },
      {
        revalidate: false
      }
    )

    try {
      createVotableTag(newVotableTag)
    } catch (error) {
      console.error(error)
    }
  }

  function handleRemoveVote(tag) {
    const tagVoteToRemove = tagVotes?.find(vote => vote.votable_tag_id === tag.id)
    if (!tagVoteToRemove) return

    mutateVotableTags(
      prevData => {
        if (!prevData) {
          return []
        } else {
          const newData = prevData.map(t => {
            if (t.id === tag.id) {
              return {
                ...t,
                userVoted: false,
                vote_count: t.vote_count > 0 ? t.vote_count - 1 : 0
              }
            }
            return t
          })
          return newData
        }
      },
      {
        revalidate: false
      }
    )

    mutateTagVotes(
      prevData => {
        if (!prevData) {
          return []
        } else {
          const newData = prevData.filter(vote => vote.votable_tag_id !== tag.id)
          return newData
        }
      },
      {
        revalidate: false
      }
    )

    try {
      removeTagVote(tagVoteToRemove.id)
    } catch (error) {
      console.error(error)
    }
  }

  function handleClick(tag) {
    if (!tag.vote_count) {
      handleCreateVotableTag(tag)
    } else if (tag.userVoted) {
      handleRemoveVote(tag)
    } else {
      handleAddVote(tag)
    }
  }

  return (
    <Box
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
        direction='row-wrap'
        gap='small'
        style={{ listStyleType: 'none', paddingLeft: 0 }}
      >
        {combinedTags?.map(tag => (
          <li key={`${tag.id}-${tag.name}`}>
            <Tag
              disabled={!userId}
              name={tag.name}
              onClick={() => handleClick(tag)}
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
  projectId: string,
  subjectId: string,
  userId: string
}

export default Tags

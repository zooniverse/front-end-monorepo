import { Box, Heading } from 'grommet'
import { Tag as TagIcon } from 'grommet-icons'
import { string } from 'prop-types'
import { useState } from 'react'
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
  const [loading, setLoading] = useState(false)

  const tagsQuery = {
    limit: 10,
    page_size: 10,
    section: `project-${projectId}`,
    taggable_type: 'Subject',
    taggable_id: subjectId,
  }
  
  const {
    data: tags,
    error: tagsError,
    isLoading: tagsIsLoading,
    mutate: mutateTags
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

  const votableTagNames = votableTags?.map(tag => tag.name) || [];
  const filteredTags = tags?.filter(tag => !votableTagNames.includes(tag.name)) || [];
  const combinedTags = [...(votableTags || []), ...filteredTags]
    .map(tag => ({
      ...tag,
      userVoted: tag.userVoted ?? tagVotes?.some(vote => vote.votable_tag_id === tag.id)  
    }))

  async function handleAddVote(tag) {
    const newTagVote = { votable_tag_id: tag.id }

    mutateVotableTags(
      prevData => {
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
      },
      { revalidate: false }
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
      { revalidate: false }
    )
    
    try {
      setLoading(true)
      await addTagVote({ votable_tag_id: tag.id })
    } catch (error) {
      console.error(error)
    } finally {
      await mutateTagVotes()
      setLoading(false)
    }
  }

  async function handleCreateVotableTag(tag) {
    const newVotableTag = {
      name: tag.name,
      section: `project-${projectId}`,
      taggable_id: subjectId,
      taggable_type: 'Subject'
    }

    mutateTags(
      prevData => {
        const modifiedTag = {
          ...tag,
          userVoted: true,
          vote_count: 1
        }
        
        if (!prevData) {
          return [modifiedTag]
        } else {
          const newData = prevData.map(t => {
            if (t.name === tag.name) {
              return modifiedTag
            }
            return t
          })
          return newData
        }
      },
      { revalidate: false }
    )
    
    try {
      setLoading(true)
      await createVotableTag(newVotableTag)
    } catch (error) {
      console.error(error)
    } finally {
      await mutateTagVotes()
      setLoading(false)
    }
  }

  function handleRemoveVote(tag) {
    const tagVoteToRemove = tagVotes?.find(vote => vote.votable_tag.name === tag.name)
    if (!tagVoteToRemove || !tagVoteToRemove.id) return

    if (tag.usages) {
      mutateTags(
        prevData => {
          if (!prevData) {
            return []
          } else {
            const newData = prevData.map(t => {
              if (t.name === tag.name) {
                return {
                  ...t,
                  userVoted: false,
                  vote_count: 0
                }
              }
              return t
            })
            return newData
          }
        },
        { revalidate: false }
      )
    } else {
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
        { revalidate: false }
      )
    }

    mutateTagVotes(
      prevData => {
        if (!prevData) {
          return []
        } else {
          const newData = prevData.filter(vote => vote.id !== tagVoteToRemove.id)
          return newData
        }
      },
      { revalidate: false }
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
        direction='row'
        wrap
        style={{ listStyleType: 'none', paddingLeft: 0 }}
      >
        {combinedTags?.map(tag => (
          <li
            key={`${tag.id}-${tag.name}`}
            style={{ margin: '0 10px 10px 0' }}
          >
            <Tag
              disabled={!userId || loading}
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

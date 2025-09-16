import { string } from 'prop-types'
import { useState } from 'react'

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

import Tags from './Tags'

function TagsContainer({
  projectId,
  subjectId,
  userId
}) {
  const [voteUpdating, setVoteUpdating] = useState(false)

  // Fetch popular tags for the subject, unrelated to the user
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

  // Fetch votable tags for the subject, unrelated to the user
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

  // Fetch the user's tag votes for the subject
  const tagVotesQuery = {
    page_size: 100,
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

  // Combine popular tags and votable tags, ensuring no duplicates, based on tag name.
  // If a tag appears in both lists, use the votable tag (which has vote counts),
  // add a userVoted property to each tag based on whether the user has voted for it.
  const votableTagNames = votableTags?.map(tag => tag.name) || []
  const filteredTags = tags?.filter(tag => !votableTagNames.includes(tag.name)) || []
  const combinedTags = [...(votableTags || []), ...filteredTags]
    .map(tag => ({
      ...tag,
      userVoted: tag.userVoted ?? tagVotes?.some(vote => vote.votable_tag_id === tag.id)  
    }))

  async function handleAddVote(tag) {
    const newTagVote = { votable_tag_id: tag.id }

    // Optimistically update the UI, add or update a votable tag
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

    // Optimistically update the UI, add a tag vote from the user
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
    
    // Send the request to create the tag vote, then revalidate the tag votes
    // Set a loading state while the request is in progress to prevent an attempt to delete the tag vote before it's created
    try {
      setVoteUpdating(true)
      await addTagVote({ votable_tag_id: tag.id })
      await mutateTagVotes()
      setVoteUpdating(false)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleCreateVotableTag(tag) {
    const newVotableTag = {
      name: tag.name,
      section: `project-${projectId}`,
      taggable_id: subjectId,
      taggable_type: 'Subject'
    }

    // Optimistically update the UI,
    // add a new tag to the popular tags list, that has the properties of a votable tag,
    // to appear as a votable tag and prevent a shift in the tags list
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
    
    // Send the request to create the votable tag, then revalidate the tag votes
    // Set a loading state while the request is in progress to prevent an attempt to delete the votable tag and related tag vote before they are created
    try {
      setVoteUpdating(true)
      await createVotableTag(newVotableTag)
      await mutateTagVotes()
      setVoteUpdating(false)
    } catch (error) {
      console.error(error)
    }
  }

  function handleRemoveVote(tag) {
    const tagVoteToRemove = tagVotes?.find(vote => vote.votable_tag.name === tag.name)
    if (!tagVoteToRemove || !tagVoteToRemove.id) return

    // Optimistically update the UI
    if (tag.usages) {
      // A tag with property 'usages' is a popular tag,
      // if the user is removing their vote from a popular tag, they must have just voted on a popular tag that had no votes,
      // it's still a popular tag, so update the tag to show no user vote and zero votes
      mutateTags(
        prevData => {
          if (!prevData) {
            return []
          } else {
            const newData = prevData.map(t => {
              if (t.id === tag.id) {
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
      // To remove a vote from a votable tag,
      // update the votable tag to show no user vote and decrement the vote count
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

    // Remove the tag vote from the user's tag votes
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
    <Tags
      loading={tagsIsLoading || votableTagsIsLoading || tagVotesIsLoading}
      error={tagsError || votableTagsError || tagVotesError}
      tags={combinedTags}
      onTagClick={handleClick}
      userId={userId}
      voteUpdating={voteUpdating}
    />
  )
}

TagsContainer.propTypes = {
  projectId: string,
  subjectId: string,
  userId: string
}

export default TagsContainer

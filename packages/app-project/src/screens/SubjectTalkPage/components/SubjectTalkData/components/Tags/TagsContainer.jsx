import { string } from 'prop-types'
import { useState } from 'react'

import {
  addTagVote,
  createVotableTag,
  removeTagVote
} from '@helpers'

import {
  usePopularTags,
  useTagVotes,
  useVotableTags
} from '@hooks'

import AddTagModal from './components/AddTagModal'
import Tags from './Tags'

function TagsContainer({
  projectDisplayName,
  projectId,
  subjectId,
  userId
}) {
  const [addTagModalActive, setAddTagModalActive] = useState(false)
  const [voteUpdating, setVoteUpdating] = useState(false)

  // Fetch popular tags for the subject, unrelated to the user
  const popularTagsQuery = {
    limit: 10,
    page_size: 10,
    section: `project-${projectId}`,
    taggable_type: 'Subject',
    taggable_id: subjectId,
  }

  const {
    data: popularTags,
    error: popularTagsError,
    isLoading: popularTagsIsLoading,
    mutate: mutatePopularTags
  } = usePopularTags(popularTagsQuery)

  // Fetch popular tags for the project, for the AddTagModal, unrelated to the user
  const popularProjectTagsQuery = {
    limit: 20,
    page_size: 20,
    section: `project-${projectId}`
  }

  const {
    data: popularProjectTags,
    error: popularProjectTagsError,
    isLoading: popularProjectTagsIsLoading,
    mutate: mutatePopularProjectTags
  } = usePopularTags(addTagModalActive ? popularProjectTagsQuery : null)
  
  // Fetch votable tags for the subject, unrelated to the user
  const votableTagsQuery = {
    page_size: 100,
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
    isValidating: tagVotesIsValidating,
    mutate: mutateTagVotes
  } = useTagVotes(tagVotesQuery)

  /*
    Combine popular tags and votable tags, ensuring no duplicates, based on tag name.
    If a tag appears in both lists, use the votable tag (which has vote_count).
    Add a userVoted property to each tag based on whether the signed-in user has voted for it.
    The rendered array (combinedTags) is ordered in most votes --> least votes.
  */
  const votableTagNames = votableTags?.map(tag => tag.name) || []
  const filteredTags = popularTags?.filter(tag => !votableTagNames.includes(tag.name)) || []
  
  /* combined votable tags and popular tags for the Tags section */
  const combinedTags = [...(votableTags || []), ...filteredTags].map(tag => ({
    ...tag,
    userVoted: tagVotes?.some(vote => vote.votable_tag.name === tag.name)
  }))
  
  /* popular project tags for the AddTagModal, excluding tags already in the Tags section */
  const filteredProjectTags = popularProjectTags?.filter(tag => !combinedTags.some(t => t.name === tag.name)) || []

  /*
    This function runs when a user clicks a "votable tag" to add their vote
  */
  async function handleAddVote(tag) {
    // optimistically increment vote_count of the votableTag
    mutateVotableTags(
        prevData => {
          if (!prevData) {
            return []
          } else {
            return prevData.map(t => {
              if (t.id === tag.id) {
                return {
                  ...t,
                  vote_count: t.vote_count + 1
                }
              }
              return t
            })
          }
        },
        { revalidate: false } // don't need to revalidate votableTags because optimistic data is enough
    )

    mutateTagVotes(
      async () => {
        // Set a loading state while the request is in progress to prevent an attempt to delete the tagVote before it's created in the database.
        setVoteUpdating(true)
        const newTagVote = await addTagVote({ votable_tag_id: tag.id })
        setVoteUpdating(false)
        // this function returns newTagVote as the first arg in populateCache
        return newTagVote
      },
      {
        // optimistically add the tagVote to the tagVotes array before network request happens
        optimisticData: prevData => {
          if (!prevData) {
            return [{ votable_tag: { ...tag } }]
          } else {
            return [...prevData, { votable_tag: { ...tag } }]
          }
        },
        populateCache: (newTagVote, prevData) => {
          // if network request failed in addTagVote()
          if (!newTagVote) {
            return prevData
          // else update tagVotes array with the newTagVote from addTagVote()
          // this replaces optimistic data in the tagVotes array
          } else {
            return [...prevData, newTagVote]
          }
        },
        // don't need to revalidate tagVotes because populateCache updates tagVotes as needed
        revalidate: false,
        // rollbackOnError responds to an error thrown by addTagVote()
        // This could be improved to handle rollback of all mutations in handleAddVote()
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  /*
    This function is called when a user clicks on a popular tag to add their vote.
  */
  function handleCreateVotableTagMutatePopularTags(tag) {
    // Note: Don't mutate votableTags in this function in order to preserve the order of combinedTags

    // Mutate popularTags by adding a new tag object that has vote_count (a property of a votable tag),
    // so it prevents a shift in the tags list. This is purely an optimistic UI strategy, no network requests.
    const modifiedTag = {
      ...tag,
      vote_count: 1
    }
    mutatePopularTags(
      prevData => {
        if (!prevData) {
          return [modifiedTag]
        } else {
          return prevData.map(t => {
            if (t.name === tag.name) {
              return modifiedTag
            }
            return t
          })
        }
      },
      { revalidate: false } // don't need to revalidate any request to /tags/popular
    )

    mutateTagVotes(
        async (prevData) => {
          const newVotableTag = {
            name: tag.name,
            section: `project-${projectId}`,
            taggable_id: subjectId,
            taggable_type: 'Subject'
          }
          // Set a loading state while the request is in progress to prevent an attempt to delete the tagVote before it's created in the database.
          setVoteUpdating(true)
          await createVotableTag(newVotableTag)
          setVoteUpdating(false)

          // whatever is returned from this async function replaces tagVotes
          // so optimistically update the tagVotes array before revalidation
          if (!prevData) {
            return [{ votable_tag: { ...tag } }]
          } else {
            return [...prevData, { votable_tag: { ...tag } }]
          }
        },
        {
        // optimistically update the tagVotes array before revalidation
        // this tagVote object will be missing votable_tag_id until tagVotes is revalidated
        optimisticData: prevData => {
          if (!prevData) {
            return [{ votable_tag: { ...tag } }]
          } else {
            return [...prevData, { votable_tag: { ...tag } }]
          }
        },
        // revalidate tagVotes once the async function createVotableTag() is successful
        // this will replace the optimisticData in tagVotes, and we see the newly created tagVote
        // from the database with votable_tag_id necessary for removeTagVote()
        revalidate: true,
        // rollbackOnError will respond to an error thrown in createVotableTag()
        // This could be improved to handle rollback of all mutations in handleCreateVotableTag()
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  /*
    This function is called when a user clicks on a popular project tag from the AddTagModal.
    This creates a votable tag with the same name as the popular tag, and mutates tagVotes and votableTags accordingly.
  */
  function handleCreateVotableTagMutateVotableTags(tag) {
    // given a popular tag, create a votable tag with the same name
    const newVotableTag = {
      name: tag.name,
      section: `project-${projectId}`,
      taggable_id: subjectId,
      taggable_type: 'Subject'
    }

    // Mutate votableTags by adding a new tag object that has vote_count (a property of a votable tag),
    // this is purely an optimistic UI strategy, no network requests.
    const modifiedTag = {
      ...newVotableTag,
      vote_count: 1
    }
    mutateVotableTags(
      prevData => {
        if (!prevData) {
          return [modifiedTag]
        } else {
          return [...prevData, modifiedTag]
        }
      },
      { revalidate: false } // don't need to revalidate votableTags because optimistic data is enough
    )
    
    mutateTagVotes(
        async (prevData) => {
          // Set a loading state while the request is in progress to prevent an attempt to delete the tagVote before it's created in the database.
          setVoteUpdating(true)
          await createVotableTag(newVotableTag)
          setVoteUpdating(false)  
          // whatever is returned from this async function replaces tagVotes
          // so optimistically update the tagVotes array before revalidation
          if (!prevData) {
            return [{ votable_tag: { ...modifiedTag } }]
          } else {
            return [...prevData, { votable_tag: { ...modifiedTag } }]
          }
        },
        {
        // optimistically update the tagVotes array before revalidation
        // this tagVote object will be missing votable_tag_id until tagVotes is revalidated
        optimisticData: prevData => {
          if (!prevData) {
            return [{ votable_tag: { ...modifiedTag } }]
          } else {
            return [...prevData, { votable_tag: { ...modifiedTag } }]
          }
        },
        // revalidate tagVotes once the async function createVotableTag() is successful
        // this will replace the optimisticData in tagVotes, and we see the newly created tagVote
        // from the database with votable_tag_id necessary for removeTagVote()
        revalidate: true,
        // rollbackOnError will respond to an error thrown in createVotableTag()
        // This could be improved to handle rollback of all mutations in handleCreateVotableTag()
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }

  /*
    When this function is called, we can assume the clicked Tag is a "votable tag"
    and therefore exists in tagVotes and votableTags.
  */
  function handleRemoveVote(tag) {
    const tagVoteToRemove = tagVotes?.find(vote => vote.votable_tag.name === tag.name)
    if (!tagVoteToRemove || !tagVoteToRemove.id) return

    // if the user is removing their vote from a popular tag, they must have just voted on a
    // popular tag that intially had no votes,
    // it's still in the popularTags array, so update the tag to show zero votes
    if (tag.usages) {
      mutatePopularTags(
        prevData => {
          if (!prevData) {
            return []
          } else {
            return prevData.map(t => {
              if (t.id === tag.id) {
                return {
                  ...t,
                  vote_count: 0
                }
              }
              return t
            })
          }
        },
        { revalidate: false } // don't need to revalidate any request to /tags/popular
      )
    } else {
      // Modify vote_count of the tag in the votableTags array
      mutateVotableTags(
        prevData => {
          if (!prevData) {
            return []
          } else {
            return prevData.map(t => {
              if (t.id === tag.id) {
                return {
                  ...t,
                  vote_count: t.vote_count > 0 ? t.vote_count - 1 : 0
                }
              }
              return t
            })
          }
        },
        { revalidate: false } // don't need to revalidate votableTags because optimistic data is enough
      )
    }

    mutateTagVotes(
      async (prevData) => {
        setVoteUpdating(true)
        // remove the "tag vote" from the database and the database changes the relevant votableTag's vote_count to 0
        await removeTagVote(tagVoteToRemove.id)
        setVoteUpdating(false)

        // this async function must return something to put into the tagVotes data array
        // so remove the tag vote from the tagVotes array
        if (!prevData) {
          return []
        } else {
          return prevData.filter(
            vote => vote.id !== tagVoteToRemove.id
          )
        }
      },
      {
        // optimistically remove the tag vote from the tagVotes array before the network request happens
        optimisticData: prevData => {
          if (!prevData) {
            return []
          } else {
            return prevData.filter(
              vote => vote.id !== tagVoteToRemove.id
            )
          }
        },
        // don't need to revalidate tagVotes because optimisticData is enough
        revalidate: false,
        // rollbackOnError will respond to an error thrown by removeTagVote()
        // tagVotes will be rolled back, but the above mutations to popularTags or votableTags will not,
        // this could be improved to rollback all mutations in handleRemoveVote()
        rollbackOnError(err) {
          console.error(err)
          return true
        }
      }
    )
  }
  
  function handleAddTagModalActive() {
    setAddTagModalActive(!addTagModalActive)
  }
  
  function handleAddTagModalTagClick(tag) {
    // this is a popular tag
    // check if there's already a votable tag with the popular tag's name
    const existingVotableTag = votableTags?.find(t => t.name === tag.name)
    if (existingVotableTag) {
      // if there's an existing votable tag, add a vote to the existing votable tag
      handleAddVote(existingVotableTag)
      setAddTagModalActive(false) // close the modal
    } else {
      // if not, create a new votable tag with the popular tag's name
      handleCreateVotableTagMutateVotableTags(tag)
      setAddTagModalActive(false) // close the modal
    }
  }

  function handleTagClick(tag) {
    if (tag.userVoted) {
      handleRemoveVote(tag) // remove vote is the same process regardless of tag type
    } else if (tag.vote_count) {
      handleAddVote(tag) // this is a votable tag, so add a vote
    } else {
      handleCreateVotableTagMutatePopularTags(tag) // this is a popular tag, so create a votable tag with the popular tag's name
    }
  }

  return (
    <>
      <AddTagModal
        active={addTagModalActive}
        disabled={!userId || voteUpdating || tagVotesIsValidating}
        onClose={handleAddTagModalActive}
        onTagClick={handleAddTagModalTagClick}
        projectDisplayName={projectDisplayName}
        tags={filteredProjectTags}
      />
      <Tags
        disabled={!userId || voteUpdating || tagVotesIsValidating}
        error={popularTagsError || votableTagsError || tagVotesError}
        loading={popularTagsIsLoading || votableTagsIsLoading || tagVotesIsLoading}
        onAddTagClick={handleAddTagModalActive}
        onTagClick={handleTagClick}
        tags={combinedTags}
      />
    </>
  )
}

TagsContainer.propTypes = {
  projectId: string,
  subjectId: string,
  userId: string
}

export default TagsContainer

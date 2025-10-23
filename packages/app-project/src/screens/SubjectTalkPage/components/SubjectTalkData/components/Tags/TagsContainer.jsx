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
    limit: 20,
    page_size: 20,
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
  
  /* show up to 10 votable tags */
  const votableTagsToShow = votableTags?.slice(0, 10) || []
  
  /* show up to 10 popular tags that aren't already in votableTagsToShow */
  const votableTagsToShowNames = votableTagsToShow.map(tag => tag.name)
  const popularTagsToShow = popularTags?.filter(tag => !votableTagsToShowNames.includes(tag.name)).slice(0, 10) || []

  /* combine votable tags and popular tags for the Tags section */
  const combinedTags = [...votableTagsToShow, ...popularTagsToShow].map(tag => ({
    ...tag,
    userVoted: tagVotes?.some(vote => vote.votable_tag.name === tag.name)
  }))
  
  /* popular project tags for the AddTagModal, excluding tags already in the Tags section */
  const filteredProjectTags = popularProjectTags?.filter(tag => !combinedTags.some(t => t.name === tag.name)) || []

  /*
    This function runs when a user clicks a "votable tag" to add their vote
  */
  function handleAddVote(tag) {
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
  function handleCreateVotableTag(tag) {
    const modifiedTag = {
      ...tag,
      vote_count: 1
    }

    // To avoid combinedTags shifting, determine if the tag is shown as a popular tag,
    // then mutate the appropriate data array.
    // This is purely an optimistic UI strategy, no network requests.
    const shownAsPopularTag = popularTagsToShow.find(t => t.name === tag.name)
    if (shownAsPopularTag) {
      // i.e. a popular tag from the Tags section
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
    } else {
      // i.e. a popular tag or new tag from the AddTagModal
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
    }

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
    This function runs when a user clicks a tag they've already voted for to remove their vote
  */
  function handleRemoveVote(tag) {
    const tagVoteToRemove = tagVotes?.find(vote => vote.votable_tag.name === tag.name)
    if (!tagVoteToRemove || !tagVoteToRemove.id) return

    // To avoid combinedTags shifting, determine if the tag is shown as a popular tag,
    // then mutate the appropriate data array
    const shownAsPopularTag = popularTagsToShow.find(t => t.name === tag.name)
    if (shownAsPopularTag) {
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
      handleCreateVotableTag(tag)
      setAddTagModalActive(false) // close the modal
    }
  }

  function handleTagClick(tag) {
    if (tag.userVoted) {
      handleRemoveVote(tag) // remove vote is the same process regardless of tag type
    } else if (tag.href.includes('votable_tags')) {
      handleAddVote(tag) // this is a votable tag, so add a vote
    } else {
      handleCreateVotableTag(tag) // this is a popular tag, so create a votable tag with the popular tag's name
    }
  }

  return (
    <>
      <AddTagModal
        active={addTagModalActive}
        disabled={!userId || voteUpdating || tagVotesIsValidating}
        error={popularProjectTagsError}
        loading={popularProjectTagsIsLoading}
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
  projectDisplayName: string,
  projectId: string,
  subjectId: string,
  userId: string
}

export default TagsContainer

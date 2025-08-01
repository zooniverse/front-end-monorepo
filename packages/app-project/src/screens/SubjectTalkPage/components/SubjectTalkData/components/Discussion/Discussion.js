import { Box } from 'grommet'
import { useState } from 'react'

import { useComments } from '@hooks'

function Discussion({ discussion }) {
  const [sort, setSort] = useState('created_at')

  const query = {
    discussion_id: discussion.id,
    sort
  }
  
  const {
    data: comments,
    isLoading,
    error
  } = useComments(query)

  return (
    <Box>
      <h4>{discussion.title}</h4>
      <input
        type='checkbox'
        checked={sort === 'created_at'}
        onChange={() => setSort(sort === 'created_at' ? '-created_at' : 'created_at')}
      />
      <Box
        as='ol'
        gap='small'
        style={{ listStyle: 'none', margin: 0, padding: 0 }}

      >
        {comments?.map((comment) => (
          <div>
            <h4>{comment.id}</h4>
            <p>{comment.body}</p>
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default Discussion

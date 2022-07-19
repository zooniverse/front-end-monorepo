/*
TODO:
- [ ] add isDeleted style
 */

import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'

import UserAvatar from './UserAvatar'
import UserRole from './UserRole'
import getFormattedTimestamp from '../helpers/getFormattedTimestamp'

function Comment ({
  author,
  comment,
  roles,
}, ref) {
  return (
    <Box
      as='li'
      background={{ dark: 'dark-1', light: 'light-1' }}
      margin={{ horizontal: 'none', 'vertical': 'xsmall' }}
      ref={ref}
    >
      <Box
        direction='row'
        justify='start'
        pad={{ top: 'xsmall', bottom: 'none', horizontal: 'xsmall' }}
      >
        <UserAvatar
          src={author?.avatar_src}
          displayName={author?.display_name}
        />
        <Box pad={{ vertical: 'none', horizontal: 'xsmall' }}>
          <Text weight='bold'>
            {author?.display_name}
          </Text>
          <Text size='small'>
            (@{author?.login})
          </Text>
          {roles?.map(role =>
            <UserRole key={`quicktalk-role-${comment.id}-${role.name}`} role={role} />
          )}
          <Text size='xsmall'>{getFormattedTimestamp(comment?.created_at)}</Text>
        </Box>
      </Box>
      <Box pad='xsmall'>
        <Markdownz>
          {comment?.body}
        </Markdownz>
      </Box>
    </Box>
  )
}

export default forwardRef(Comment)

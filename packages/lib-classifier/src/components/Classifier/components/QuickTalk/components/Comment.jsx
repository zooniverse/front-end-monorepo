/*
TODO:
- [ ] add avatar-side style
- [ ] add isDeleted style
 */

import PropTypes from 'prop-types';
import { Box, Text } from 'grommet'
import { Markdownz } from '@zooniverse/react-components'

import UserAvatar from './UserAvatar'
import UserRole from './UserRole'

function Comment ({
  author,
  comment,
  roles,
}) {
  return (
    <Box
      as='li'
      background={{ dark: 'dark-1', light: 'light-1' }}
      direction='row'
      margin={{ horizontal: 'none', 'vertical': 'xsmall' }}
    >
      <Box
        margin='xsmall'
        pad='xsmall'
        width='small'
      >
        <UserAvatar
          src={author?.avatar_src}
          displayName={author?.display_name}
        />
        <Text textAlign='center' weight='bold'>
          {author?.display_name}
        </Text>
        <Text textAlign='center'>
          (@{author?.login})
        </Text>
        {roles?.map(role =>
          <UserRole key={`quicktalk-role-${comment.id}-${role.name}`} role={role} />
        )}
      </Box>
      <Box
        flex={true}
        pad='xsmall'
        width='medium'
      >
        <Markdownz>
          {comment?.body}
        </Markdownz>
      </Box>
    </Box>
  )
}

Comment.propTypes = {
  author: PropTypes.object,
  comment: PropTypes.object,
  role: PropTypes.object,
}

export default Comment

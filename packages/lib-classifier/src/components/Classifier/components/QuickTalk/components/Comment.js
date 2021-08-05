/*
isDeleted = if @props.data.is_deleted then 'deleted' else ''
profile_link = "/users/#{@props.author?.login}"
if @props.project?
  profile_link = "/projects/#{@props.project.slug}#{profile_link}"
author_login = if @props.author?.login then "@#{@props.author.login}" else ""
<div className="talk-comment #{activeClass} #{isDeleted}">
  <div className="talk-comment-author">
    {<Avatar user={@props.author} /> if @props.author?}
    <div>
      {if @props.author?.login
        <Link to={profile_link}>{@props.data.user_display_name}</Link>
      else
        @props.data.user_display_name}
      <div className="user-mention-name">{author_login}</div>
    </div>
    <DisplayRoles roles={@props.roles} section={@props.data.section} />
  </div>
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
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
      direction='row'
    >
      <Box
        width='small'
      >
        <UserAvatar
          src={author?.avatar_src}
          displayName={author?.display_name}
        />
        {author?.display_name} (@{author?.login})
        {roles?.map(role =>
          <UserRole key={`quicktalk-role-${comment.id}-${role.name}`} role={role} />
        )}
      </Box>
      <Box
        flex={true}
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

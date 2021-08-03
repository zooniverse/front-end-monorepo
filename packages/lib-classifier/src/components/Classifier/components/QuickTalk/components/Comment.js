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

import UserRole from './UserRole'

function Comment ({
  author,
  comment,
  roles,
}) {
  return (
    <li>
      <h5>
        {author?.display_name} (@{author?.login})
        {roles?.map(role =>
          <UserRole key={`quicktalk-role-${comment.id}-${role.name}`} role={role} />
        )}
      </h5>
      <p>
        {comment?.body}
      </p>
    </li>
  )
}

Comment.propTypes = {
  author: PropTypes.object,
  comment: PropTypes.object,
  role: PropTypes.object,
}

export default Comment

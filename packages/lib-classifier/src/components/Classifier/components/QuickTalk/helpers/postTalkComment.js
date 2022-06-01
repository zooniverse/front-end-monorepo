import { talkAPI } from '@zooniverse/panoptes-js'

export default async function postTalkComment (text, discussion, user, authorization) {
  if (!text || !discussion || !user || !authorization) return undefined

  const data = {
    user_id: user.id,
    body: text,
    discussion_id: +discussion.id,
  }

  /*
  Example payload should be something like
  { "http_cache":true,
    "comments":{
      "user_id":"1325361",
      "body":"Testing this to see the shape of a POST action",
      "discussion_id":357
  }}
   */

  console.log('+++ data: ', data)

  return talkAPI.post('/comments', { comments: data }, { authorization })
    .then(response => response)
}

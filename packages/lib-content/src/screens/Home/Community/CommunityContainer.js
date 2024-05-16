import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Community from './Community.js'

function stripTags(html){
  if (typeof window === 'undefined') return
  let doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

export default function CommunityContainer ({ blogPosts = [] }) {
  if (!blogPosts.length) return

  const formattedBlogPosts = blogPosts.map(post => {
    return {
      ...post,
      date: dayjs(post.created_at).fromNow(),
      excerpt: stripTags(post.excerpt),
      title: stripTags(post.title),
    }
  })

  return <Community blogPosts={formattedBlogPosts} />
}

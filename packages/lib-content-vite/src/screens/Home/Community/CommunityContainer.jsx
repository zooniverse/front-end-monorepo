import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Community from './Community.jsx'

function stripTags(html) {
  if (typeof window === 'undefined') return
  let doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

function formatPosts(feed) {
  if (feed.length === 0) return []

  const newFeed = feed.map(post => {
    return {
      ...post,
      date: dayjs(post.created_at).fromNow(),
      excerpt: stripTags(post.excerpt),
      title: stripTags(post.title)
    }
  })
  return newFeed
}

export default function CommunityContainer({
  dailyZooPosts = [],
  zooBlogPosts = []
}) {
  const formattedDailyZooPosts = formatPosts(dailyZooPosts)
  const formattedZooBlogPosts = formatPosts(zooBlogPosts)

  return (
    <Community
      dailyZooPosts={formattedDailyZooPosts}
      zooBlogPosts={formattedZooBlogPosts}
    />
  )
}


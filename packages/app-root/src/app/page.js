import HomePageContainer from '@/components/HomePageContainer'

// daily.zooniverse.org most recent 4 posts
const DAILY_ZOO_FEED =
  'https://public-api.wordpress.com/rest/v1.1/sites/57182749/posts?number=4'
// blog.zooniverse.org most recent 4 posts
const ZOO_BLOG_FEED =
  'https://public-api.wordpress.com/rest/v1.1/sites/36711287/posts?number=4'

export const fetchCache = 'default-cache'

/** Grab the data we want from each post */
function parseFeedPost(post) {
  return {
    id: post.ID, // number
    title: post.title, // string
    excerpt: post.excerpt, // string but text is wrapped in <p></p>
    created_at: new Date(post.date), // string such as '2024-02-02T15:00:00+00:00'
    url: post.URL, // string
    imageSrc: post.featured_image // src string
  }
}

async function fetchBlogFeed(url) {
  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }) // revalidate at most every hour
    if (response.ok) {
      const feed = await response.json()
      return feed.posts
    }
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getBlogPosts(url) {
  let posts = []
  try {
    const feed = await fetchBlogFeed(url)
    posts = feed.map(post => parseFeedPost(post))

    return posts
  } catch (error) {
    console.error(error)
  }
  return posts
}

export default async function HomePage() {
  const dailyZooPosts = await getBlogPosts(DAILY_ZOO_FEED)
  const zooBlogPosts = await getBlogPosts(ZOO_BLOG_FEED)

  return (
    <HomePageContainer
      dailyZooPosts={dailyZooPosts}
      zooBlogPosts={zooBlogPosts}
    />
  )
}

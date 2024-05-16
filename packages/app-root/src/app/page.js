import HomePageContainer from '@/components/HomePageContainer'

const BLOG_FEEDS = [
  // daily.zooniverse.org
  'https://public-api.wordpress.com/rest/v1.1/sites/57182749/posts',
  // blog.zooniverse.org
  'https://public-api.wordpress.com/rest/v1.1/sites/36711287/posts'
]

/** Grab the data we want from each post (modeled after PFE) */
function parseFeedPost(post) {
  return {
    id: post.ID, // number
    title: post.title, // string
    excerpt: post.excerpt, // string but text is wrapped in <p></p>
    created_at: new Date(post.date), // string such as '2024-02-02T15:00:00+00:00'
    link: post.URL, // string
    image: post.featured_image // ?? these are always '', might need to grab attached image instead
  }
}

/** url is one of BLOG_FEEDS */
async function fetchBlogFeed(url) {
  try {
    const response = await fetch(url)
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

/** Grab the three most recent posts from both BLOG_FEEDS */
async function getBlogPosts() {
  let posts = []
  try {
    const feeds = await Promise.all(BLOG_FEEDS.map(fetchBlogFeed))
    feeds.forEach(feed => {
      posts = posts.concat(feed.slice(0, 3))
    })
    return posts.map(parseFeedPost).sort((a, b) => b.created_at - a.created_at)
  } catch (error) {
    console.error(error)
  }
  return posts
}

export default async function HomePage() {
  const blogPosts = await getBlogPosts() // can be fetched serverside bc doesn't matter if a user exists

  return (
    <HomePageContainer blogPosts={blogPosts}/>
  )
}

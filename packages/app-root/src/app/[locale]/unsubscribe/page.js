import { Unsubscribe } from '@zooniverse/content'

export const metadata = {
  title: 'Unsubscribe',
  description: ''
}

export default async function UnsubscribePage (props) {

  // Check if there's a ?processed=true in the URL's query string
  // If yes, it means the user was redirected straight from the Panoptes
  // /unsubscribe route.

  const searchParams = await props.searchParams
  const processed = searchParams?.processed === 'true'

  return (
    <Unsubscribe
      processed={processed}
    />
  )
}

'use client'
// TODO: 👆 is this correct? Or should this be in the UnsubscribeForm subcomponent? 🤔
// https://nextjs.org/docs/app/api-reference/directives/use-client

import { Box } from 'grommet'
import UnsubscribeForm from './components/UnsubscribeForm/UnsubscribeForm'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool } from 'prop-types'

const isBrowser = typeof window !== 'undefined'

function Unsubscribe ({
  processed = false,  // Passed straight to the Unsubscribe Form. This component param is only used for debugging, as the page actually looks for the ?processed=true query param.
}) {

  // Check if there's a ?processed=true in the URL's query string
  // If yes, it means the user was redirected straight from the Panoptes
  // /unsubscribe route.
  const searchQuery = (isBrowser) ? window?.location?.search : ''
  const searchParams = new URLSearchParams(searchQuery)
  const _processed = processed || searchParams.get('processed') === 'true'

  return (
    <OtherLayout>
      <Box
        align='center'
        className='Unsubscribe-Page'
        pad={{ horizontal: 'medium', top: 'large', bottom: 'large' }}
      >
        <MaxWidthContent
          color={{ light: 'black', dark: 'white' }}
        >
          <UnsubscribeForm
            processed={_processed}
          />
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

Unsubscribe.propTypes = {
  processed: bool
}

export default Unsubscribe

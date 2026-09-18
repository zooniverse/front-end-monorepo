'use client'

import { Box } from 'grommet'
import UnsubscribeForm from './components/UnsubscribeForm/UnsubscribeForm'
import ContentLayout from '@components/PageLayout/ContentLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool } from 'prop-types'

function Unsubscribe ({
  processed = false,   // If processed is true, it means user was sent here from the Panoptes /unsubscribe route
}) {
  return (
    <ContentLayout>
      <MaxWidthContent
        className='Unsubscribe-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        <UnsubscribeForm
          processed={processed}
        />
      </MaxWidthContent>
    </ContentLayout>
  )
}

Unsubscribe.propTypes = {
  processed: bool
}

export default Unsubscribe

'use client'

import { Box } from 'grommet'
import UnsubscribeForm from './components/UnsubscribeForm/UnsubscribeForm'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import { bool } from 'prop-types'

function Unsubscribe ({
  processed = false,   // If processed is true, it means user was sent here from the Panoptes /unsubscribe route
}) {
  return (
    <OtherLayout>
      <MaxWidthContent
        className='Unsubscribe-Page'
        color={{ light: 'black', dark: 'white' }}
      >
        <UnsubscribeForm
          processed={processed}
        />
      </MaxWidthContent>
    </OtherLayout>
  )
}

Unsubscribe.propTypes = {
  processed: bool
}

export default Unsubscribe

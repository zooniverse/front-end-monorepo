'use client'
// TODO: 👆 is this correct? Or should this be in the UnsubscribeForm subcomponent? 🤔
// https://nextjs.org/docs/app/api-reference/directives/use-client

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
      <Box
        align='center'
        className='Unsubscribe-Page'
        pad={{ horizontal: 'medium', top: 'large', bottom: 'large' }}
      >
        <MaxWidthContent
          color={{ light: 'black', dark: 'white' }}
        >
          <UnsubscribeForm
            processed={processed}
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

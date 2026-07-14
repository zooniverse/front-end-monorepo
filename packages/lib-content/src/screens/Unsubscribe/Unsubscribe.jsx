'use client'
// TODO: 👆 is this correct? Or should this be in the UnsubscribeForm subcomponent? 🤔
// https://nextjs.org/docs/app/api-reference/directives/use-client

import { Box } from 'grommet'

import UnsubscribeFrom from './components/UnsubscribeForm/UnsubscribeForm'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'

function Unsubscribe () {

  return (
    <OtherLayout>
      <Box
        align='center'
        className='Unsubscribe'
        pad={{ horizontal: 'medium', top: 'large', bottom: 'large' }}
      >
        <MaxWidthContent
          color={{ light: 'black', dark: 'white' }}
        >
          <UnsubscribeFrom />
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

export default Unsubscribe

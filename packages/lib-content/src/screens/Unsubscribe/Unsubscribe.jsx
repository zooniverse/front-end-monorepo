'use client'
// TODO: 👆 is this correct? Or should this be in the UnsubscribeForm subcomponent? 🤔
// https://nextjs.org/docs/app/api-reference/directives/use-client

import { Box } from 'grommet'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'

import { Trans, useTranslation } from '@translations/i18n'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import {
  MobileHeading,
  StyledHeading
} from '@components/SharedStyledComponents/SharedStyledComponents'

function Unsubscribe() {
  const { t } = useTranslation()

  return (
    <OtherLayout>
      <MobileHeading level={1} size='1.5rem'>
        Unsubscribe
      </MobileHeading>
      <Box pad={{ horizontal: 'medium', bottom: 'large' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <StyledHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            level={1}
            size='small'
          >
            Unsubscribe
          </StyledHeading>
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

export default Unsubscribe

import { withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import React from 'react'
import { Chat } from 'grommet-icons'
import { Box, Grid, Paragraph } from 'grommet'
import { string } from 'prop-types'

import en from './locales/en'
import ContentBox from '@shared/components/ContentBox'
import WidgetHeading from '@shared/components/WidgetHeading'
import JoinInButton from './components/JoinInButton'
import RecentSubjects from './components/RecentSubjects'

counterpart.registerTranslations('en', en)

function ZooniverseTalk (props) {
  const columns = props.screenSize === 'small' ? ['1fr'] : ['1fr', '3fr']

  return (
    <ContentBox direction='row' gap='large'>
      <Grid
        className={props.className}
        columns={columns}
        fill
        gap='large'
      >
        <Box width='full' gap='small' justify='between'>
          <Box gap='small'>
            <WidgetHeading>
              <Box direction='row' gap='xsmall' align='center'>
                <Chat size='20px' />
                <span>{counterpart('ZooniverseTalk.title')}</span>
              </Box>
            </WidgetHeading>
            <Paragraph
              children={counterpart('ZooniverseTalk.message')}
              margin='none'
              size='xlarge'
            />
          </Box>
          <JoinInButton />
        </Box>
        <Box fill='horizontal'>
          <RecentSubjects carousel={props.screenSize === 'small'} />
        </Box>
      </Grid>
    </ContentBox>
  )
}

ZooniverseTalk.propTypes = {
  className: string,
  screenSize: string
}

ZooniverseTalk.defaultProps = {
  className: undefined,
  screenSize: 'medium'
}

export default withResponsiveContext(ZooniverseTalk)
export {
  ZooniverseTalk
}

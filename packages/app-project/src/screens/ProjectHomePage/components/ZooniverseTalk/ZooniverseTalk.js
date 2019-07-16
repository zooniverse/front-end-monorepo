import { withResponsiveContext } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import React from 'react'
import { Chat } from 'grommet-icons'
import { Box, Paragraph } from 'grommet'

import en from './locales/en'
import ContentBox from '../../../../shared/components/ContentBox'
import WidgetHeading from '../.././../../shared/components/WidgetHeading'
import JoinInButton from './components/JoinInButton'
import RecentSubjects from './components/RecentSubjects'

counterpart.registerTranslations('en', en)

function ZooniverseTalk (props) {
  const showSubjects = props.screenSize !== 'small'
  const width = showSubjects ? '18%' : 'full'

  return (
    <ContentBox direction='row' gap='large'>
      <Box width={width} gap='small' justify='between'>
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
        <RecentSubjects show={showSubjects} />
      </Box>
    </ContentBox>
  )
}

ZooniverseTalk.propTypes = {
}

ZooniverseTalk.defaultProps = {
}

export default withResponsiveContext(ZooniverseTalk)
export {
  ZooniverseTalk
}

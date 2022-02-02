import { withResponsiveContext } from '@zooniverse/react-components'
import { Chat } from 'grommet-icons'
import { Box, Grid, Paragraph } from 'grommet'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'
import WidgetHeading from '@shared/components/WidgetHeading'
import JoinInButton from './components/JoinInButton'
import RecentSubjects from './components/RecentSubjects'

function ZooniverseTalk (props) {
  const { t } = useTranslation('screens')
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
                <span>{t('Home.ZooniverseTalk.title')}</span>
              </Box>
            </WidgetHeading>
            <Paragraph
              children={t('Home.ZooniverseTalk.message')}
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

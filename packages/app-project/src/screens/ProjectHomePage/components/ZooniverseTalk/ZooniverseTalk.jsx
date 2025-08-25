import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'
import { Chat } from 'grommet-icons'
import { Box, Grid, Paragraph, ResponsiveContext } from 'grommet'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'

import ContentBox from '@shared/components/ContentBox'
import WidgetHeading from '@shared/components/WidgetHeading'
import JoinInButton from './components/JoinInButton/JoinInButton'
import RecentSubjects from './components/RecentSubjects'

function ZooniverseTalk ({ className = undefined }) {
  const { t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)
  const columns = size === 'small' ? ['1fr'] : ['1fr', '3fr']

  return (
    <ContentBox direction='row' gap='large'>
      <Grid
        className={className}
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
              margin='none'
              size='xlarge'
            >
              {t('Home.ZooniverseTalk.message')}
            </Paragraph>
          </Box>
          <JoinInButton />
        </Box>
        <Box fill='horizontal'>
          <RecentSubjects carousel={size === 'small'} />
        </Box>
      </Grid>
    </ContentBox>
  )
}

ZooniverseTalk.propTypes = {
  className: string
}

export default withResponsiveContext(ZooniverseTalk)
export {
  ZooniverseTalk
}

import { Layer, Link, SettingsOption } from 'grommet-icons'

import { getThisWeekDateRange } from '@utils'
import Layout from './Layout'
import HeaderLink from '../HeaderLink'
import ContentBox from '../ContentBox'
import MainContent from '../MainContent'
import HeaderToast from '../HeaderToast'
import HeaderButton from '../HeaderButton'

export default {
  title: 'Components / Shared / Layout',
  component: Layout
}

const selectedDateRange = getThisWeekDateRange()
const pageContent = <MainContent selectedDateRange={selectedDateRange} />

export const Default = {
  args: {
    children: pageContent,
    primaryHeaderItem: (
      <HeaderLink
        href={`https://www.zooniverse.org/users/zootester1`}
        label='back to profile'
        primaryItem={true}
      />
    )
  }
}

export const WithGroupHeaderItems = {
  args: {
    children: pageContent,
    primaryHeaderItem: (
      <HeaderLink
        href={`https://www.zooniverse.org/users/zootester1`}
        label='back to profile'
        primaryItem={true}
      />
    ),
    secondaryHeaderItems: [
      <HeaderToast
        key='copy-join-link-toast'
        icon={<Link color='white' size='small' />}
        label='Copy Join Link'
        message='Join Link Copied!'
        textToCopy={`https://www.zooniverse.org/groups/1234?join_token=4321`}
      />,
      <HeaderToast
        key='share-group-toast'
        icon={<Layer color='white' size='small' />}
        label='Share Group'
        message='Group Link Copied!'
        textToCopy={`https://www.zooniverse.org/groups/1234`}
      />,
      <HeaderButton
        key='manage-group-button'
        icon={<SettingsOption color='white' size='small' />}
        label='Manage Group'
        onClick={() => alert('See the GroupModal Stories')}
      />
    ]
  }
}

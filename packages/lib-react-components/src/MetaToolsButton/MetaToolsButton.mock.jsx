import { Add } from 'grommet-icons'

export const MetaToolsButtonMock = {
  disabled: false,
  icon: (<Add size='small' />),
  text: 'Add'
}

export const MetaToolsButtonLinkMock = {
  ...MetaToolsButtonMock,
  href: '/mypage',
}

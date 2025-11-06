import MetaToolsButton from './'
import {
  MetaToolsButtonMock,
  MetaToolsButtonLinkMock
} from './MetaToolsButton.mock'

export default {
  title: 'Components / MetaToolsButton',
  component: MetaToolsButton
}

export const Button = () => (
  <MetaToolsButton {...MetaToolsButtonMock} />
)

export const Link = () => (
  <MetaToolsButton {...MetaToolsButtonLinkMock} />
)

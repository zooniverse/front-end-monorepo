import MetaToolsButton from './'
import {
  MetaToolsButtonMock,
  MetaToolsButtonLinkMock
} from './MetaToolsButton.mock'

// import readme from './README.md'

export default {
  title: 'Components / MetaToolsButton',
  component: MetaToolsButton,
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export const Button = () => (
  <MetaToolsButton {...MetaToolsButtonMock} />
)

export const Link = () => (
  <MetaToolsButton {...MetaToolsButtonLinkMock} />
)

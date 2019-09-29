import { withActions } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import React from 'react'

import AdminCheckbox from './AdminCheckbox'
import readme from './README.md'

const config = {
  notes: {
    markdown: readme
  }
}

const darkZooTheme = { ...zooTheme, dark: true }

storiesOf('ZooFooter/AdminCheckbox', module)
  .addDecorator(withActions('change #admin-checkbox'))

  .add('Light theme (default)', () => (
    <AdminCheckboxStoryExample />
  ), config)

  .add('Dark theme', () => (
    <AdminCheckboxStoryExample colorTheme='dark' />
  ), config)

class AdminCheckboxStoryExample extends React.Component {
  constructor () {
    super()
    this.onChange = this.onChange.bind(this)
    this.state = {
      checked: false
    }
  }

  onChange (event) {
    this.setState(prevState => ({
      checked: !prevState.checked
    }))
  }

  render () {
    return (
      <Grommet theme={(this.props.colorTheme === 'dark') ? darkZooTheme : zooTheme}>
        <AdminCheckbox
          checked={this.state.checked}
          onChange={this.onChange}
        />
      </Grommet>
    )
  }
}

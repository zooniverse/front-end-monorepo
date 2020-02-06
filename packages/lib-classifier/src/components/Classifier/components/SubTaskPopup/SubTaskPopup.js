import React from 'react'
import counterpart from 'counterpart'
import { Box } from 'grommet'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import {} from 'prop-types'  // TODO

import styled from 'styled-components'  // TODO: check what's the best way to style this component
import zooTheme from '@zooniverse/grommet-theme'

const StyledBox = styled(Box)``

import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper (stores) {
  return {}
}

class SubTaskPopup extends React.Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Rnd
        minWidth={200}
        minHeight={100}
        style={{
          border: `2px solid ${zooTheme.global.colors['light-2']}`,
          backgroundColor: zooTheme.global.colors['light-1'],
        }}
      >
        <StyledBox pad="medium">
          HELLO WORLD
        </StyledBox>
      </Rnd>
    )
  }
}

SubTaskPopup.propTypes = {}

SubTaskPopup.defaultProps = {}

/*
  Enzyme doesn't support the context API properly yet, so using @withTheme as
  recommended currently doesn't work. So instead, we're exporting the unwrapped
  component for testing, and using the HOC function syntax to export the wrapped
  component.

  https://github.com/styled-components/jest-styled-components/issues/191#issuecomment-465020345
*/
export default inject(storeMapper)(observer(SubTaskPopup))
export { SubTaskPopup }

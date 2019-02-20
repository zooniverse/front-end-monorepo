import counterpart from 'counterpart'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import theme from 'styled-theming'
import zooTheme from '@zooniverse/grommet-theme'
import { PlainButton } from '@zooniverse/react-components'
import CollectionsIcon from './CollectionsIcon'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export const Collect = styled(CollectionsIcon)`
  stroke: ${theme('mode', {
    dark: zooTheme.dark.colors.font,
    light: zooTheme.light.colors.font
  })};
  width: 1em;
`

export default function CollectionsButton (props) {
  const { onClick } = props
  return (
    <PlainButton
      icon={<Collect />}
      margin={{ vertical: 'small', left: 'none', right: 'medium' }}
      text={counterpart('CollectionsButton.add')}
      onClick={onClick}
    />
  )
}

CollectionsButton.propTypes = {
  onClick: PropTypes.func
}

CollectionsButton.defaultProps = {
  onClick: () => false
}

import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Button, Box } from 'grommet'
import React from 'react'
import { Markdownz } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

export default function FieldGuide ({ items }) {
  return (
    <Box>
      {items.map((item) => {
        return (
          <Markdownz>
            {item.content}
          </Markdownz>
        )
      })}
    </Box>
  )
}
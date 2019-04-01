import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Button, Box, Grid } from 'grommet'
import React from 'react'
import { Markdownz, Media } from '@zooniverse/react-components'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

function Icon ({ icon }) {
  if (icon && Object.keys(icon).length > 0) {
    return (
      <Media src={icon.src} />
    )
  }

  return (
    <svg viewBox='0 0 100 100'>
      <rect fill={zooTheme.global.colors['accent-2']} height='100' width='100' />
    </svg>
  )
}

export default function FieldGuide ({ icons, items }) {
  return (
    <Grid gap='small' rows='small'>
      {items.map((item) => {
        console.log('item', item)
        const icon = icons.get(item.icon)
        return (
          <Box align='center' key={item.title} direction='column' width='100px'>
            <Icon icon={icon} />
            <Markdownz>
              {item.title}
            </Markdownz>
          </Box>
        )
      })}
    </Grid>
  )
}
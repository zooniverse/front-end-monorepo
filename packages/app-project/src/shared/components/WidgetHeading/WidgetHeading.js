import { SpacedText } from '@zooniverse/react-components'
import { Box, Heading } from 'grommet'
import { string } from 'prop-types'
import React from 'react'

function WidgetHeading (props) {
  const { level, text } = props
  return (
    <Heading level={level} margin='none'>
      <SpacedText
        color={{
          dark: 'light-1',
          light: 'black'
        }}
        size='medium'
        weight='bold'
      >
        {text}
      </SpacedText>
    </Heading>
  )
}

WidgetHeading.propTypes = {
  level: string,
  text: string
}

WidgetHeading.defaultProps = {
  level: '2'
}

export default WidgetHeading

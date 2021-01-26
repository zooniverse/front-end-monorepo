import { Box, Button, Stack } from 'grommet'
import { FormClose } from 'grommet-icons'
import PropTypes from 'prop-types'
import React from 'react'
import { Media } from '@zooniverse/react-components'

export default function FilterButton (props) {
  const {
    characteristicId,
    checked,
    radioHover,
    onFilter,
    value,
    valueId,
    valueImageSrc
  } = props

  const backgroundColor = checked ? 'brand' : 'neutral-6'

  return (
    <Box
      background={{ color: backgroundColor }}
      height='40px'
      round='full'
      width='40px'
    >
      <Stack
        fill
      >
        <Media
          height='25'
          src={valueImageSrc}
          width='25'
        />
        {checked && (
          <Button
            alignSelf='center'
            fill
            onClick={() => onFilter(characteristicId, '')}
            plain
          >
            {({ disabled, hover, focus }) => {
              const showClose = radioHover || hover || focus
              if (showClose) {
                return (
                  <FormClose />
                )
              }
            }}
          </Button>
        )}
      </Stack>
    </Box>
  )
}

FilterButton.defaultProps = {
  value: {},
  valueId: '',
  valueImageSrc: ''
}

FilterButton.propTypes = {
  value: PropTypes.object,
  valueId: PropTypes.string,
  valueImageSrc: PropTypes.string
}

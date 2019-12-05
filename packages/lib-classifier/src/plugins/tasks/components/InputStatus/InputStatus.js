import PropTypes from 'prop-types'
import React from 'react'
import counterpart from 'counterpart'
import { Text } from 'grommet'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import en from './locales/en'

counterpart.registerTranslations('en', en)

export const StyledInputStatus = styled(Text)`
  flex-grow: 1;
`

export default function InputStatus ({ count, tool }) {
  let status = counterpart('InputStatus.drawn', { count })
  const hasMin = tool.min && tool.min > 0
  const hasMax = tool.max && tool.max < Infinity
  if (hasMin && hasMax) {
    status = counterpart('InputStatus.maxAndMin', { count, max: tool.max, min: tool.min })
  } else if (hasMax) {
    status = counterpart('InputStatus.max', { count, max: tool.max })
  } else if (hasMin) {
    status = counterpart('InputStatus.min', { count, min: tool.min })
  }

  return (
    <StyledInputStatus textAlign='end'>
      <Markdownz>{status}</Markdownz>
    </StyledInputStatus>
  )
}

InputStatus.defaultProps = {
  count: 0,
  tool: {}
}

InputStatus.propTypes = {
  count: PropTypes.number,
  tool: PropTypes.shape({
    min: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    max: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  })
}

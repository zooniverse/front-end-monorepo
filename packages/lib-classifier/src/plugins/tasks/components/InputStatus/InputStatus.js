import PropTypes from 'prop-types'
import React from 'react'
import { Text } from 'grommet'
import styled from 'styled-components'
import { Markdownz } from '@zooniverse/react-components'
import { useTranslation } from 'react-i18next'

export const StyledInputStatus = styled(Text)`
  flex-grow: 1;
  padding-right: 15px;
`

export default function InputStatus ({ count, tool }) {
  const { t } = useTranslation('plugins')
  let status = t('InputStatus.drawn', { count })
  const hasMin = tool.min && tool.min > 0
  const hasMax = tool.max && tool.max < Infinity
  if (hasMin && hasMax) {
    status = t('InputStatus.maxAndMin', { count, max: tool.max, min: tool.min })
  } else if (hasMax) {
    status = t('InputStatus.max', { count, max: tool.max })
  } else if (hasMin) {
    status = t('InputStatus.min', { count, min: tool.min })
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

import { Box } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledBox = styled.div`
  background-color: #FFC0CB;
  height: 200px;
  width: 300px;
`

function SingleTextViewer(props) {
  const {
    children,
    title
  } = props

  return (
    <StyledBox>
      {title?.id && title?.text && (
        <title id={title.id}>{title.text}</title>
      )}
      {children}
    </StyledBox>
  )
}

SingleTextViewer.defaultProps = {}

SingleTextViewer.propTypes = {}

export default SingleTextViewer

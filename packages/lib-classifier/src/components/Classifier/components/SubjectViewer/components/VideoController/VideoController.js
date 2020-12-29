import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PlayFill } from 'grommet-icons'

const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`

const VideoController = ({ onPlayPause }) => (
  <div>
    <Button onClick={onPlayPause}>
      <PlayFill />
    </Button>
  </div>
)

VideoController.propTypes = {
  onPlayPause: PropTypes.func
}
VideoController.defaultProps = {
  onPlayPause: () => {}
}

export default VideoController

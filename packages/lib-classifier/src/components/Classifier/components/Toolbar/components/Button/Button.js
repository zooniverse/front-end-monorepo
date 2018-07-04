import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: 0;
  padding: 0;
  cursor: pointer;
`

const StyledCircle = styled.circle`
  fill: ${props => props.hover ? 'red' : 'green' }
`

class Button extends React.Component {
  constructor (props) {
    super(props)
    this.fn = props.fn.bind(this)
    this.toggleHover = this.toggleHover.bind(this)
    this.state = {
      hover: false
    }
  }

  toggleHover () {
    const currentState = this.state.hover
    this.setState({ hover: !currentState })
  }

  render () {
    const { hover } = this.state
    return (
      <StyledButton
        onClick={this.fn}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="50" hover={hover && hover} />
        </svg>
      </StyledButton>
    )
  }
}

Button.propTypes = {
  label: PropTypes.string,
  fn: PropTypes.func,
  icon: PropTypes.any,
}

Button.defaultProps = {
  label: 'Button',
  icon: '',
  fn: () => console.info('button')
}

export default Button

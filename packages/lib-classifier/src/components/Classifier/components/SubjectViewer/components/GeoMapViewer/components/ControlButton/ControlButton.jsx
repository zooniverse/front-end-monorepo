import { Button } from 'grommet'
import { node, func, string } from 'prop-types'
import styled from 'styled-components'

const StyledControlButton = styled(Button)`
  margin: 1px;
  padding: 0;
  height: 24.75px;
  width: 24.75px;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 2px;
  text-align: center;
  
  &:hover {
    border-color: black;
  }
`

function ControlButton({
  a11yTitle,
  icon,
  onClick,
  title,
  ...rest
}) {
  return (
    <StyledControlButton
      a11yTitle={a11yTitle}
      icon={icon}
      onClick={onClick}
      title={title}
      {...rest}
    />
  )
}

ControlButton.propTypes = {
  a11yTitle: string.isRequired,
  icon: node.isRequired,
  onClick: func.isRequired,
  title: string.isRequired
}

export default ControlButton

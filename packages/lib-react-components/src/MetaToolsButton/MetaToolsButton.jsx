import { bool, func, node, object, oneOfType, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import PlainButton from '../PlainButton'

export const StyledPlainButton = styled(PlainButton)`
  > div {
    justify-content: flex-start;
    ${props => css`padding: ${props.padding};`}
    ${props => css`line-height: ${props.theme.paragraph.small.height};`}
  }

  span {
    ${props => props.active && css`font-weight: bold;`}
  }
`

const DEFAULT_HANDLER = () => {}

function MetaToolsButton ({ disabled = false, icon = null, onClick = DEFAULT_HANDLER, text = '', ...rest }) {
	return (
		<StyledPlainButton
			data-testid="test-meta-tools-button"
			disabled={disabled}
			icon={icon}
			labelSize='small'
			text={text}
			onClick={onClick}
			{...rest}
		/>
	)
}

MetaToolsButton.propTypes = {
  disabled: bool,
  icon: oneOfType([node, object]),
  onClick: func,
  text: string,
  theme: shape({
    dark: bool,
    paragraph: object
  })
}


export default MetaToolsButton

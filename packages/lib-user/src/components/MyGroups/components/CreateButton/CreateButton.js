import { PlainButton } from '@zooniverse/react-components'
import { Add } from 'grommet-icons'
import { func, string } from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled(PlainButton)`
  width: fit-content;

  span {
    font-weight: 600;
  }
`

function CreateButton({
  onClick,
  text = 'create new group'
}) {
  return (
    <StyledButton
      a11yTitle={text}
      color={{
        dark: 'neutral-6',
        light: 'dark-5'
      }}
      gap='xsmall'
      icon={<Add size='1rem' />}
      labelSize='1rem'
      onClick={onClick}
      text={text}
    />
  )
}

CreateButton.propTypes = {
  onClick: func.isRequired,
  text: string
}

export default CreateButton

import { PlainButton } from '@zooniverse/react-components'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import AddIcon from './AddIcon'

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
      color='dark-5'
      gap='xsmall'
      icon={<AddIcon size='15px' />}
      labelSize='16px'
      onClick={onClick}
      text={text}
    />
  )
}

CreateButton.propTypes = {
  onClick: func,
  text: string
}

export default CreateButton

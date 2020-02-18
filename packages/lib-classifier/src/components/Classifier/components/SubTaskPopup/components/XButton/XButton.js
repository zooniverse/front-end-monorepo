import React from 'react'
import { func, string } from 'prop-types'
import { Button } from 'grommet'
import { FormClose } from 'grommet-icons'

function XButton (props) {
  const { alignSelf, onClick } = props
  return (
    <Button
      alignSelf={alignSelf}
      icon={<FormClose />}
      onClick={onClick}
      type='button'
      plain={true}
    />
  )
}

XButton.defaultProps = {
  alignSelf: 'end',
}

XButton.propTypes = {
  onClick: func.isRequired,
  alignSelf: string,
}

export default XButton

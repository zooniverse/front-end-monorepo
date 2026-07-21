import { string } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '../translations/i18n'
import styled, { css } from 'styled-components'

const StatusMessageContainer = styled(Box)`
`

function StatusMessage ({
  text = '',
  type = '',
}) {
  const { t } = useTranslation()
  let _type = (text?.length > 0 && ['success', 'error', 'warning'].includes(type)) ? type : ''

  return (
    <StatusMessageContainer
      className='statusMessage'
      role='status'
      type={_type}
    >
      {text}
    </StatusMessageContainer>
  )
}

StatusMessage.propTypes = {
  text: string,
  type: string,
}

export default StatusMessage

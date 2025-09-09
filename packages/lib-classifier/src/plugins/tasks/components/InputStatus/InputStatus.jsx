import { number, shape, oneOfType, string } from 'prop-types'
import { Text } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

export const StyledInputStatus = styled(Text)`
  display: flex;
  justify-content: end;
  align-items: center;
  flex-grow: 1;
`

export default function InputStatus ({ count = 0, tool = {} }) {
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
    <StyledInputStatus>
      {status}
    </StyledInputStatus>
  )
}

InputStatus.propTypes = {
  count: number,
  tool: shape({
    min: oneOfType([
      number,
      string
    ]),
    max: oneOfType([
      number,
      string
    ])
  })
}

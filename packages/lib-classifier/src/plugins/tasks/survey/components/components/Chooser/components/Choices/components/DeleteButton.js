import { Box, Button } from 'grommet'
import { FormClose } from 'grommet-icons'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

const StyledButton = styled(Button)`
  height: 40px;
  margin-left: 10px;
  padding: 0;
  width: 20px;

  &:disabled {
    cursor: not-allowed;
  }
`

function DeleteButton ({
  choiceLabel = '',
  deleteFn,
  disabled = false
}) {
  const { t } = useTranslation()

  return (
    <StyledButton
      a11yTitle={t('SurveyTask.DeleteButton.delete', { choiceLabel })}
      disabled={disabled}
      icon={
        <Box
          background='brand'
          round={true}
        >
          <FormClose
            color='neutral-6'
            size='20px'
          />
        </Box>
      }
      onClick={deleteFn}
    />
  )
}

DeleteButton.propTypes = {
  choiceLabel: string,
  deleteFn: func.isRequired,
  disabled: bool
}

export default DeleteButton

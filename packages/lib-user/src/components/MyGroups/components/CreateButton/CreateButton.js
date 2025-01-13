import { PlainButton } from '@zooniverse/react-components'
import { Add } from 'grommet-icons'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from '../../../../translations/i18n.js'

const StyledButton = styled(PlainButton)`
  width: fit-content;

  span {
    font-weight: 600;
  }
`

function CreateButton({
  onClick,
  text = ''
}) {
  const { t } = useTranslation()
  const labelText = text.length ? text : t('MyGroups.createNew')

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
      text={labelText}
    />
  )
}

CreateButton.propTypes = {
  onClick: func.isRequired,
  text: string
}

export default CreateButton

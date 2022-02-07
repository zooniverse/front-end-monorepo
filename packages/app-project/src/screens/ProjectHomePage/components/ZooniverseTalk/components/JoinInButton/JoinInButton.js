import { Button } from 'grommet'
import Link from 'next/link'
import { object } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const StyledButton = styled(Button)`
  text-align: center;
`

function JoinInButton (props) {
  const { t } = useTranslation('screens')
  const { linkProps } = props
  const label = t('Home.ZooniverseTalk.button')
  return (
    <Link {...linkProps} passHref>
      <StyledButton label={label} />
    </Link>
  )
}

JoinInButton.propTypes = {
  linkProps: object
}

export default JoinInButton

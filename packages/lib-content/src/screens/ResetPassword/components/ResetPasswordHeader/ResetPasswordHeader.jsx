import { Heading } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from '@translations/i18n'

const DecoDivider = styled('div')`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #ffffff 0%, #A6A7A9 50%, #ffffff 100%);
`

export default function ResetPasswordHeader () {
  const { t } = useTranslation()
  return (
    <>
        <Heading
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          level={1}
          textAlign='center'
        >
          {t('ResetPassword.common.header')}
        </Heading>
        <DecoDivider />
    </>
  )

}
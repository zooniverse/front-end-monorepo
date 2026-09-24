import { Heading } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const DecoDivider = styled('div')`
  width: 100%;
  height: 2px;
  ${props => props.theme.dark
    ? 'background: linear-gradient(90deg, #333333 0%, #A6A7A9 50%, #333333 100%);'
    : 'background: linear-gradient(90deg, #ffffff 0%, #A6A7A9 50%, #ffffff 100%);'
  }
`

export default function SettingsHeading ({ section = 'AccountSettings' }) {
  const { t } = useTranslation()

  const title = t(`Settings.${section}.title`)

  return (
    <>
        <Heading
          color={{ light: 'neutral-1', dark: 'accent-1' }}
          level={1}
          textAlign='center'
        >
          {title}
        </Heading>
        <DecoDivider />
    </>
  )

}

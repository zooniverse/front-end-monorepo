import { node, string } from 'prop-types'
import { useContext } from 'react'
import { ResponsiveContext } from 'grommet'
import { PlainButton } from '@zooniverse/react-components'
import { Blank } from 'grommet-icons'

function Icon({ icon, text = '' }) {
  return (
    <Blank role='img' aria-label={text} aria-hidden='false' size='1.5rem'>
      {icon}
    </Blank>
  )
}

export default function DashboardLink({ href = '', icon, text = '' }) {
  const size = useContext(ResponsiveContext)
  return (
    <>
      {size !== 'small' ? (
        <PlainButton href={href} text={text} icon={icon} />
      ) : (
        <Icon text={text} icon={icon} />
      )}
    </>
  )
}

DashboardLink.propTypes = {
  href: string,
  icon: node,
  text: string
}

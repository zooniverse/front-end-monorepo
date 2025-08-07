import { node, string } from 'prop-types'
import { useContext } from 'react'
import { ResponsiveContext } from 'grommet'
import { PlainButton } from '@zooniverse/react-components'
import { Blank } from 'grommet-icons'

function Icon({ icon, text = '', size = 'medium' }) {
  return (
    <Blank
      role='img'
      aria-label={size === 'small' ? text : null}
      aria-hidden={size === 'small' ? 'false' : 'true'}
      size={size === 'small' ? '1.5rem' : '1rem'}
    >
      {icon}
    </Blank>
  )
}

export default function DashboardLink({ href = '', icon, text = '' }) {
  const size = useContext(ResponsiveContext)
  return (
    <PlainButton
      href={href}
      icon={<Icon text={text} icon={icon} size={size} />}
      text={size !== 'small' ? text : null}
    />
  )
}

DashboardLink.propTypes = {
  href: string,
  icon: node,
  text: string
}

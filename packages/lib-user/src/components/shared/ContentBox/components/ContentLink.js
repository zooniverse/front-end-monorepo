import { SpacedText } from '@zooniverse/react-components'
import { Anchor } from 'grommet'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

const StyledAnchor = styled(Anchor)`
  font-size: 1rem;
  line-height: normal;
`

const DEFAULT_LINK = {
  as: 'a',
  href: '#',
  text: ''
}

function ContentLink ({
  link = DEFAULT_LINK
}) {
  return (
    <StyledAnchor
      color={{
        dark: 'light-4',
        light: 'dark-5'
      }}
      download={link.download || false}
      forwardedAs={link.as || 'a'}
      href={link.href}
      label={
        <SpacedText
          size='inherit'
          uppercase={false}
        >
          {link.text}
        </SpacedText>
      }
      onClick={link.onClick}
    />
  )
}

ContentLink.propTypes = {
  link: shape({
    as: string,
    href: string,
    text: string
  })
}

export default ContentLink

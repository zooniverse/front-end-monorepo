import { useEffect, useRef } from 'react'
import { SpacedHeading } from '@zooniverse/react-components'
import styled from 'styled-components'
import { Box } from 'grommet'
import { func, object, number, oneOfType, string } from 'prop-types'

import { mobileBreakpoint } from '../SharedStyledComponents/SharedStyledComponents.jsx'

const HeadingForNav = styled(SpacedHeading)`
  margin: 0;

  @media (width <= ${mobileBreakpoint}) {
    border-top: 70px solid transparent; // Handles navigation to an h2 without the sticky dropdown covering it
    margin-top: -70px;
  }
`

const defaultPad = { vertical: '30px' }

export default function HeadingForAboutNav({
  color = 'black',
  pad = defaultPad,
  sectionIndex = 0,
  sectionName = '',
  setActiveSection = () => {},
  slug = ''
}) {
  const headingRef = useRef()

  /**
   * Observe the headings of each navigable section
   * When a heading is fully visible in the top third of a viewport,
   * highlight the sidebar and update the url hash.
   */
  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root element
      rootMargin: '0px 0px -70% 0px', // observe visibility in the top third of the viewport
      threshold: 1 // callback when target is fully visible
    }

    const intersectionObserver = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setActiveSection(sectionIndex)

        /* Change the has in the url without doing a navigation event */
        const location = window.location.toString().split('#')[0]
        const oldHash = window.location.hash
        const hash = '#' + slug

        if (sectionIndex === 0) {
          history.replaceState(null, null, location)
        } else if (oldHash !== slug) {
          history.replaceState(null, null, location + hash)
        }
      }
    }, options)

    intersectionObserver.observe(headingRef.current)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [headingRef.current])

  return (
    <Box ref={headingRef} pad={pad}>
      <HeadingForNav
        id={slug}
        color={color}
        level={2}
        size='1.5rem'
        tabIndex={-1}
        textAlign='center'
      >
        {sectionName}
      </HeadingForNav>
    </Box>
  )
}

HeadingForAboutNav.propTypes = {
  color: oneOfType([object, string]),
  sectionIndex: number,
  sectionName: string,
  setActiveSection: func,
  slug: string
}

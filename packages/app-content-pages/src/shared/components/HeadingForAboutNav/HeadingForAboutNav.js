import { useEffect, useRef } from 'react'
import SpacedHeading from '@zooniverse/react-components/SpacedHeading'
import styled from 'styled-components'
import { func, number, string } from 'prop-types'

import { mobileBreakpoint } from '@shared/components/SharedStyledComponents/SharedStyledComponents.js'

const HeadingForNav = styled(SpacedHeading)`
  margin: 0;

  @media (width <= ${mobileBreakpoint}) {
    border-top: 70px solid transparent; // Handles navigation to an h2 without the sticky dropdown covering it
    margin-top: -70px;
  }
`

export default function HeadingForAboutNav({
  color,
  sectionIndex,
  sectionName,
  setActiveSection,
  slug
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
        // Note that we are not updating the window.location hash here yet
        // Manipulating the hash causes the page to jump to the corresponding
        // heading id, and hashes in the url are mainly used to direct
        // volunteers to #contact from external pages
      }
    }, options)

    intersectionObserver.observe(headingRef.current)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [headingRef.current])

  return (
    <div ref={headingRef}>
      <HeadingForNav
        id={slug}
        color={color}
        level={2}
        size='1.5rem'
        tabIndex={-1}
        textAlign='center'
        style={{ padding: '30px 0 10px 0' }}
      >
        {sectionName}
      </HeadingForNav>
    </div>
  )
}

HeadingForAboutNav.propTypes = {
  // color: object or string for Grommet theme,
  sectionIndex: number,
  sectionName: string,
  setActiveSection: func,
  slug: string
}

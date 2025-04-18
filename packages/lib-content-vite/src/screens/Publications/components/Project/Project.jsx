import { Box, Heading } from 'grommet'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'

import Publication from '../Publication/Publication.jsx'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

const Placeholder = ({ title }) => {
  return (
    <Box
      align='center'
      justify='center'
      background='brand'
      height='100%'
      width='100%'
    >
      <ZooniverseLogo size='50%' id={title} />
    </Box>
  )
}

const DEFAULT_HANDLER = () => true
const DEFAULT_PUBLICATIONS = []

function slugify(string) {
  return string
    // convert letters to lowercase
    .toLowerCase()
    // replace any spaces with Z
    .replace(/\s/g, 'Z')
    // remove all punctuation and whitespace
    .replace(/\W/g, '')
    // replace any Zs with a single dash
    .replace(/Z+/g, '-')
}

const intersectionOptions = {
  rootMargin: '0px 0px -70% 0px', // observe visibility in the top 30% of the viewport
}

function Project({
  avatarSrc = null,
  id = null,
  title = '',
  publications = DEFAULT_PUBLICATIONS,
  sectionIndex = 0,
  setActiveSection = DEFAULT_HANDLER
}) {
  const slug = slugify(title)
  const sectionRef = useRef()

  useEffect(() => {
    const intersectionObserver = new window.IntersectionObserver(entries => {
      if (entries[0].intersectionRatio > 0) {
        setActiveSection(sectionIndex)
      }
    }, intersectionOptions)

    intersectionObserver.observe(sectionRef.current)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [sectionRef.current])

  return (
    <Box
      as='section'
      key={id}
      ref={sectionRef}
      aria-labelledby={slug}
    >
      <Box
        direction='row'
        align='center'
        alignContent='center'
        gap='xsmall'
        margin={{ bottom: 'xsmall' }}
      >
        <StyledBox height='50px' width='50px'>
          {!avatarSrc && <Placeholder title={title} />}
          {avatarSrc && (
            <Media
              width={50}
              height={50}
              src={avatarSrc}
              placeholder={<Placeholder title={title} />}
            />
          )}
        </StyledBox>
        <Heading
          id={slug}
          tabIndex={-1}
          color={{ light: 'black', dark: 'white' }}
          level='3'
          size='small'
        >
          {title} ({publications.length})
        </Heading>
      </Box>
      {publications.map((publication, i) => (
        <Publication
          avatarSrc={avatarSrc}
          key={`${publication.url}${i}`}
          {...publication}
        />
      ))}
    </Box>
  )
}

Project.propTypes = {
  avatarSrc: string,
  projectId: string,
  publications: arrayOf(
    shape({
      authors: string,
      title: string,
      url: string,
      year: string
    })
  ),
  sectionIndex: number,
  setActiveSection: func,
  title: string,
}

export default Project

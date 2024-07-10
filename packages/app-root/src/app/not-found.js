'use client'

import {
  Anchor,
  Box,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
  ThemeContext
} from 'grommet'
import styled from 'styled-components'
import { useContext } from 'react'

const ContainerBox = styled(Box)`
  position: relative;
  background-color: #000;
`

const Overlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
`

const PageContent = styled(Box)`
  z-index: 1;
`

const StyledAnchor = styled(Anchor)`
  text-decoration: underline;
`

const randomImage = Math.round(Math.random() * 8) + 1 // 1-9

export default function Error404() {
  const backgroundURL = `/assets/404/background${randomImage}.jpg`
  const size = useContext(ResponsiveContext)

  return (
    <ThemeContext.Extend value={customTheme}>
      <ContainerBox width='100%' height='80vh' justify='center'>
        <Overlay background={`url("${backgroundURL}")`} fill />
        <PageContent justify='center' align='center'>
          <Image
            id='404-logo'
            width={size === 'small' ? '82px' : '132px'}
            alt='404 logo'
            src='/assets/404/logoWhite404.png'
            margin={{ bottom: 'xxsmall' }}
          />
          <Heading level='1' textAlign='center' fill color='white'>
            Nothing here.
          </Heading>
          <Paragraph textAlign='center' color='white'>
            <em>The page you're looking for no longer exists.</em>
          </Paragraph>
          <Box as='ul' fill align='center' margin='0' pad='0' gap='10px'>
            <StyledAnchor
              forwardedAs='li'
              color='white'
              href='/'
              label='Return to the homepage'
              size='1rem'
            />
            <StyledAnchor
              forwardedAs='li'
              color='white'
              href='https://www.zooniverse.org/projects'
              label='Find a new project to explore'
              size='1rem'
            />
          </Box>
        </PageContent>
      </ContainerBox>
    </ThemeContext.Extend>
  )
}

const customTheme = {
  heading: {
    level: {
      1: {
        small: {
          size: '2rem'
        },
        medium: {
          size: '3rem'
        },
        large: {
          size: '5rem'
        }
      }
    }
  }
}

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
import { useTranslation } from '@translations/i18n'

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

const ListItem = styled.li`
  color: white;
`

const StyledAnchor = styled(Anchor)`
  text-decoration: underline;
`

const logoSize = size => {
  switch (size) {
    case 'small':
      return '82px'
    case 'medium':
      return '102px'
    case 'large':
      return '132px'
    default:
      return '102px'
  }
}

const randomImage = Math.round(Math.random() * 8) + 1 // 1-9

function Default404() {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)
  const backgroundURL = `https://static.zooniverse.org/fem-assets/404/background${randomImage}.jpg`

  return (
    <ThemeContext.Extend value={customTheme}>
      <ContainerBox width='100%' height='80vh' justify='center'>
        <Overlay background={`url("${backgroundURL}")`} fill />
        <PageContent justify='center' align='center'>
          <Image
            id='404-logo'
            width={logoSize(size)}
            alt='404 logo'
            src='https://static.zooniverse.org/fem-assets/404/logoWhite404.png'
            margin={{ bottom: 'xxsmall' }}
          />
          <Heading level='1' textAlign='center' fill color='white' size={size}>
            {t('404.Default404.heading')}
          </Heading>
          <Paragraph textAlign='center' color='white'>
            <em>{t('404.Default404.message')}</em>
          </Paragraph>
          <Box as='ul' fill align='center' margin='0' pad='0' gap='10px'>
          <ListItem>
              <StyledAnchor
                color='white'
                href='https://www.zooniverse.org'
                label={t('404.Default404.returnHome')}
                size='1rem'
              />
            </ListItem>
            <ListItem>
              <StyledAnchor
                color='white'
                href='https://www.zooniverse.org/projects'
                label={t('404.Default404.findNewProject')}
                size='1rem'
              />
            </ListItem>
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

export default Default404

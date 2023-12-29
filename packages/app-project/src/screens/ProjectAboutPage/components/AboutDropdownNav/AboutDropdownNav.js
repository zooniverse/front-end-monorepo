import { useState } from 'react'
import { arrayOf, string } from 'prop-types'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled, { css } from 'styled-components'
import Link from 'next/link'

import addQueryParams from '@helpers/addQueryParams'
import { Box, Button, DropButton, Nav } from 'grommet'
import { FormDown } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'

// Same styling as content pages' dropdown
const StyledDropButton = styled(DropButton)`
  position: relative;
  border-radius: 2em;
  min-width: 16rem;

  &:hover,
  &:focus {
    ${props =>
      css`
        background: ${props.theme.global.colors['neutral-1']};
      `}

    & > div > span {
      color: white;
    }

    & > div > [aria-label='FormDown'] {
      stroke: white;
    }
  }

  ${props =>
    props.open &&
    css`
      background: ${props.theme.global.colors['neutral-1']};

      & > div > span {
        color: white;
      }

      & > div > [aria-label='FormDown'] {
        stroke: white;
      }
    `}
`

const StyledUl = styled.ul`
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`

const StyledLi = styled.li`
  list-style-type: none;
  display: flex;
  width: 100%;
`

const StyledButton = styled(Button)`
  text-decoration: none;
  padding: 10px 15px;
  width: 100%;
  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.22);

  &:hover,
  :focus {
    ${props =>
      css`
        background: ${props.theme.global.colors['neutral-1']};
      `}
  }

  &[aria-current='true'] {
    & > span {
      border-bottom: 2px solid white;
    }
  }
`

const AboutDropdownNav = ({ aboutNavLinks }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const { t } = useTranslation('screens')

  const router = useRouter()

  const { owner, project } = router.query
  const baseUrl = `/${owner}/${project}/about`

  const routerPath = router?.asPath.split('/')
  const aboutPagePath = routerPath[4] // ['', owner, project, about, page]

  const dropContent = (
    <Nav aria-label={t('About.PageNav.title')} width='100%' background='brand'>
      <StyledUl>
        {aboutNavLinks.map(link => (
          <StyledLi key={link}>
            <StyledButton
              as={Link}
              aria-current={
                addQueryParams(link) === aboutPagePath ? 'true' : 'false'
              }
              href={`${baseUrl}/${addQueryParams(link)}`}
              onClick={handleClose}
            >
              <SpacedText size='0.875rem' color='white' weight='bold'>
                {t(`About.PageHeading.title.${link}`)}
              </SpacedText>
            </StyledButton>
          </StyledLi>
        ))}
      </StyledUl>
    </Nav>
  )

  return (
    <StyledDropButton
      alignSelf='center'
      aria-label={t('About.SidebarHeading')}
      dropAlign={{ top: 'bottom' }}
      dropProps={{ inline: true }}
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
      margin={{ top: '30px' }}
      dropContent={dropContent}
    >
      <Box
        align='center'
        direction='row'
        gap='xsmall'
        justify='center'
        pad={{ horizontal: '20px', vertical: '10px' }}
      >
        <SpacedText weight='bold' color={{ light: 'brand', dark: 'white' }}>
          {t('About.SidebarHeading')}
        </SpacedText>
        <FormDown color={{ light: 'brand', dark: 'white' }} />
      </Box>
    </StyledDropButton>
  )
}

AboutDropdownNav.propTypes = {
  aboutNavLinks: arrayOf(string)
}

export default AboutDropdownNav

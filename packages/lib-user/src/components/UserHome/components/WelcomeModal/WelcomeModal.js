import { Anchor, Box, Button, Layer, Paragraph } from 'grommet'
import {
  CloseButton,
  SpacedText,
  ZooniverseLogo
} from '@zooniverse/react-components'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const textColor = { light: 'black', dark: 'white' }

const StyledAnchor = styled(Anchor)`
  width: max-content;
  height: max-content;
  border-radius: 5px;
  font-size: 1rem;
  padding: 8px;
  text-align: center;
  color: white;
  font-weight: normal;
  background-color: ${props => props.theme.global.colors['neutral-1']};

  &:hover {
    text-decoration: none;
  }
`

const StyledDismiss = styled(Button)`
  width: max-content;
  height: max-content;
  border-radius: 5px;
  border: solid 1px ${props => props.theme.global.colors.brand};
  font-size: 1rem;
  padding: 8px;
  text-align: center;
  color: black;

  &:hover {
    text-decoration: none;
  }
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`

function WelcomeModal() {
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    if (window.localStorage) {
      const modalDismissed =
        window.localStorage.getItem('welcome-modal-dismissed') === 'true'
      if (modalDismissed) setDismissed(true)
      else setDismissed(false)
    }
  }, [])

  const handleClose = () => {
    window.localStorage?.setItem('welcome-modal-dismissed', 'true')
    setDismissed(true)
  }

  return (
    <>
      {!dismissed ? (
        <Layer
          modal
          animate={false}
          position='center'
          closeFn={handleClose}
          onEsc={handleClose}
          background='transparent'
        >
          <Box
            background={{
              dark: 'dark-1',
              light: 'light-1'
            }}
            round='8px'
            width='1280px'
            pad='large'
            align='center'
          >
            <StyledCloseButton closeFn={handleClose} />
            <ZooniverseLogo
              color='#00979d' // 'brand won't work here for some reason
              id='homepage-welcome-modal'
              size='100px'
            />
            <SpacedText
              margin={{ top: '30px' }}
              size='1.5rem'
              weight='bold'
              color={{ light: 'neutral-1', dark: 'accent-1' }}
              textAlign='center'
            >
              Welcome to your new homepage experience!
            </SpacedText>
            <Paragraph
              color={textColor}
              margin={{ vertical: '30px' }}
              textAlign='center'
            >
              We are excited to introduce several changes to the Zooniverse
              homepage. They are designed to enhance your overall experience.{' '}
            </Paragraph>
            <Box
              as='ul'
              margin='0'
              pad='medium'
              round='8px'
              border={{ side: 'all', color: 'light-5', size: '2px' }}
              background={{ light: 'light-3', dark: 'dark-3' }}
              overflow='scroll'
              style={{ listStyle: 'none' }}
            >
              <Paragraph as='li' color={textColor} margin={{ bottom: '0' }}>
                <strong>Fresh look and feel</strong> - Your homepage has been
                curated to you, with a more modern and user-friendly interface!
              </Paragraph>
              <Paragraph as='li' color={textColor}>
                <strong>Statistics</strong> - More accurate and detailed than
                ever. Jump into your personal stats to get an overview of your
                progress on the site. Then, download the data to explore
                further.
              </Paragraph>
              <Paragraph
                as='li'
                color={textColor}
                margin={{ top: '0', bottom: '15px' }}
              >
                <strong>Volunteer certificate</strong> - That’s right, now you
                can generate a certificate for your contributions to real
                science! The timeframe and projects represented can be as
                specific or general as you’d like.
              </Paragraph>
              <Paragraph
                as='li'
                color={textColor}
                margin={{ top: '0', bottom: '30px' }}
              >
                <strong>Streamlined navigation</strong> - You may notice some
                redundancies have been eliminated. Click on the Zooniverse logo
                on any page to be directed to your homepage.
              </Paragraph>
              <SpacedText
                size='1rem'
                color={{ light: 'neutral-1' }}
                weight='bold'
              >
                COMING SOON
              </SpacedText>
              <Paragraph as='li' color={textColor}>
                <strong>Favorite projects</strong> - Add projects which you
                return to frequently; all grouped on your homepage!
              </Paragraph>
              <Paragraph as='li' color={textColor} margin='0'>
                <strong>Group stats</strong> - A place to organize your friends
                or fellow participants’ statistics. Work towards shared goals
                and see each others’ progress.
              </Paragraph>
              <Paragraph as='li' color={textColor}>
                <strong>A redesigned public profile</strong> - A place to
                explore and interact with fellow participants.
              </Paragraph>
            </Box>
            <Box direction='row' pad={{ top: 'large' }} gap='small'>
              <StyledAnchor href='https://www.zooniverse.org'>
                Read about the changes
              </StyledAnchor>
              <StyledDismiss onClick={handleClose}>
                Great, take me there!
              </StyledDismiss>
            </Box>
          </Box>
        </Layer>
      ) : null}
    </>
  )
}

export default WelcomeModal

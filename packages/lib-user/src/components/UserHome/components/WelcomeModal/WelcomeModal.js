import { Anchor, Box, Button, Layer, Paragraph, ResponsiveContext } from 'grommet'
import {
  CloseButton,
  SpacedText,
  ZooniverseLogo
} from '@zooniverse/react-components'
import { useContext, useEffect, useState } from 'react'
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
  const size = useContext(ResponsiveContext)
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
          margin={size !== 'small' ? 'medium' : '0' }
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
              color='#00979d' // 'brand' won't work here for some reason
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
              It&apos;s been a while since we updated the homepage, so we&apos;ve
              freshened things up. This has also let us improve:
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
                <strong>Statistics</strong> - More accurate and detailed
                personal stats. Check them out to get a feel for your
                participation across Zooniverse.
              </Paragraph>
              <Paragraph as='li' color={textColor}>
                <strong>Volunteer Certificates</strong> - We’ve had many
                requests for certificates over the years. If you want, now you
                can show off what you’ve done, use the certificates to fulfill
                service hour requirements, and more.
              </Paragraph>
              <Paragraph
                as='li'
                color={textColor}
                margin={{ top: '0', bottom: '15px' }}
              >
                <strong>Group Engagement</strong> - A new way to create and
                share group goals and tell the story of your collective impact.
              </Paragraph>
              <Paragraph as='li' color={textColor} margin='0'>
                <strong>Navigation</strong> - Enjoy an easier flow, including
                simply clicking the Zooniverse logo on any page to return here
                to your homepage.
              </Paragraph>
            </Box>
            <Box direction='row' pad={{ top: 'large' }} gap='small'>
              <StyledAnchor href='https://blog.zooniverse.org/2024/09/10/coming-soon-freshening-up-the-zooniverse-homepage'>
                Read about the changes
              </StyledAnchor>
              <StyledDismiss
                onClick={handleClose}
                color={{ light: 'black', dark: 'white' }}
              >
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

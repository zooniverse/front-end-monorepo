import { useRef, useState, useEffect } from 'react'
import { Button, Box, Text } from 'grommet'
import styled from 'styled-components'

const Container = styled(Box)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
  box-shadow: 0px 2px 20px 5px #00000033;
  overflow: hidden;
  height: 500px;
`

const BackgroundDeco1 = styled(Box)`
  background: url('https://panoptes-uploads.zooniverse.org/project_attached_image/3369c5fa-8d4a-4538-8f92-0c1c799235d9.jpeg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 50%;
`

const BackgroundDeco2 = styled(Box)`
  background: #005d69;
  background: linear-gradient(0deg,rgba(0, 93, 105, 1) 0%, rgba(0, 93, 105, 0) 100%);
  width: 100%;
  height: 100%;
`

const Content = styled(Box)`
  width: 100%;
  height: 500px;
  flex: 0 0 auto;
  justify-content: center;
`

const WhiteText = styled(Text)`
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 0px 8px #005d69;
  text-transform: uppercase;
`

const TealText = styled(Text)`
  color: #005D69;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  text-transform: uppercase;
`

const BlackText = styled(Text)`
  color: #404040;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  text-transform: uppercase;
`

const HR = styled('div')`
  margin: 1em auto;
  width: 50%;
  height: 1px;
  background: #000000;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(203, 204, 203, 1) 50%, rgba(0, 0, 0, 0) 100%);
`

const TARGET_CLASSIFICATIONS = 1000000000

const MESSAGES = [
  'discovering gravitational waves',
  'mapping the universe',
  'discovering the universe\'s hidden black holes',
  'digitizing historical documents',
  'rediscovering extinct animals'
]

const MESSAGE_TIMER = 6000

export default function BillionsCountdown ({
  totalClassifications = 0,
  error,
  isLoading = true,
}) {
  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  // Set a timer that changes the message every
  const [ messageIndex, setMessageIndex ] = useState(Math.floor(Math.random() * MESSAGES.length))
  const message = MESSAGES[messageIndex]
  const timerId = useRef(null)

  function nextMessage () {
    setMessageIndex((messageIndex + 1) % MESSAGES.length)
  }

  useEffect(function onLoadOnce () {
    timerId.current = setInterval(nextMessage, MESSAGE_TIMER)
    return () => { clearInterval(timerId.current) }
  }, [])

  if (error || isLoading) return null
  
  return (
    <Container className='billions-countdown-container'>
      <BackgroundDeco1 className='billions-countdown-deco-1'>
        <BackgroundDeco2 className='billions-countdown-deco-1'>
          <a id='zooniverse-1-billion'></a>
          <Content
            className='billions-countdown-content'
            padding={{ vertical: '0', horizontal: 'large' }}
          >
            <Box margin={{ top: '20px' }}>
              {(classificationsToGo > 0) && (
              <WhiteText
                size='72px'
                textAlign='center'
              >
                {classificationsToGo?.toLocaleString()}
              </WhiteText>
              )}
            </Box>
            <WhiteText
              size='20px'
              textAlign='center'
            >
              {(classificationsToGo > 0)
              ? "until we reach"
              : "thanks to our millions of volunteers, we've reached"
              }
            </WhiteText>
            <img
              aria-label='1 billion'
              src='https://panoptes-uploads.zooniverse.org/project_attached_image/bd65e25b-2e31-4a44-a864-4e5d2bc66d78.png'
            />
            <TealText size='24px'>
              classifications
            </TealText>
            <HR />
            <BlackText size='20px'>
              every classification on Zooniverse brings us one step closer to
            </BlackText>
            <TealText size='37px' margin={{ top: '20px' }}>
              {message}
            </TealText>
          </Content>
        </BackgroundDeco2>
      </BackgroundDeco1>
    </Container>
  )
}

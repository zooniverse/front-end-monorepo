import { useRef, useState, useEffect } from 'react'
import { Box, Paragraph, Text } from 'grommet'
import styled from 'styled-components'

const Container = styled(Box)`
  background: rgba(255, 255, 255, 1);
  border-radius: 1em;
  box-shadow: 0px 2px 20px 5px #00000033;
  overflow: hidden;
  width: 100%;
  height: 500px;
  position: relative;
`

const BackgroundDeco1 = styled(Box)`
  background: url('https://panoptes-uploads.zooniverse.org/project_attached_image/3369c5fa-8d4a-4538-8f92-0c1c799235d9.jpeg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  height: 50%;
  position: relative;
`

const BackgroundDeco2 = styled(Box)`
  background: linear-gradient(0deg, rgb(0, 82, 93) 0%, rgba(0, 62, 70, 0) 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const ClassificationsNumber = styled(Text)`
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 0px 8px #005d69;
  text-transform: uppercase;
  font-size: 72px;

  @media (width < 769px) {
    font-size: 60px;
  }
`

const WhiteText = styled(Text)`
  color: #ffffff;
  text-align: center;
  text-shadow: 0px 0px 8px #005d69;
  text-transform: uppercase;
  font-size: 20px;
  position: absolute;
  top: 68%;
`

const BillionImg = styled.img`
  display: flex;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const Content = styled(Box)`
  width: 100%;
  justify-content: center;
  height: 50%;
`

const UpperTealText = styled(Text)`
  color: #005d69;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  letter-spacing: 4.8px;
  text-transform: uppercase;
  font-size: 24px;
`
const LowerTealText = styled(Text)`
  color: #005d69;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  font-size: 32px;
  margin-top: 20px;

  @media (width < 769px) {
    font-size: 20px;
  }
`
const BlackText = styled(Paragraph)`
  color: #404040;
  text-align: center;
  text-shadow: 0px 0px 8px #ffffff;
  text-transform: uppercase;
  font-size: 20px;
  margin: 0 10px;

  @media (width < 769px) {
    font-size: 1rem;
  }
`

const HR = styled('div')`
  margin: 1em auto;
  width: 50%;
  height: 1px;
  background: #000000;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(203, 204, 203, 1) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`

const TARGET_CLASSIFICATIONS = 1000000000

const MESSAGES = [
  'discovering gravitational waves',
  'mapping the universe',
  'discovering hidden black holes',
  'digitizing historical documents',
  'everglades restoration',
  'mapping humanitarian need'
]

const MESSAGE_TIMER = 6000

export default function BillionsCountdown({ totalClassifications = 0, error, isLoading = true }) {
  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  // Set a timer that changes the message every 6 seconds
  const messageIndex = useRef(Math.floor(Math.random() * MESSAGES.length))
  const [message, setMessage] = useState(MESSAGES[messageIndex.current])
  const timerId = useRef(null)

  function nextMessage() {
    const newIndex = (messageIndex.current + 1) % MESSAGES.length
    setMessage(MESSAGES[newIndex])
    messageIndex.current = newIndex
  }

  useEffect(function onLoadOnce() {
    timerId.current = setInterval(nextMessage, MESSAGE_TIMER)
    return () => {
      clearInterval(timerId.current)
    }
  }, [])

  return (
    <Container className='billions-countdown-container'>
      <BackgroundDeco1 className='billions-countdown-deco-1'>
        <BackgroundDeco2 className='billions-countdown-deco-1'>
          {isLoading || error?.length ? null : classificationsToGo > 0 ? (
            <ClassificationsNumber>{classificationsToGo?.toLocaleString()}</ClassificationsNumber>
          ) : null}
          <WhiteText>
            {classificationsToGo > 0
              ? 'until we reach'
              : "thanks to our millions of volunteers, we've reached"}
          </WhiteText>
        </BackgroundDeco2>
      </BackgroundDeco1>
      <BillionImg
        aria-label='1 billion'
        src='https://panoptes-uploads.zooniverse.org/project_attached_image/bd65e25b-2e31-4a44-a864-4e5d2bc66d78.png'
      />
      <Content className='billions-countdown-content'>
        <UpperTealText>classifications</UpperTealText>
        <HR />
        <BlackText>every classification on Zooniverse brings us one step closer to</BlackText>
        <LowerTealText>{message}</LowerTealText>
      </Content>
    </Container>
  )
}

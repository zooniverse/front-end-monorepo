import { Button, Box, Text } from 'grommet'
import styled from 'styled-components'

const Content = styled(Box)`
  background: #ffffe0;
  border-radius: 1em;
  box-shadow: 0px 1px 3px #808080;
  gap: 0.5em;
`

const TARGET_CLASSIFICATIONS = 1000000000

export default function BillionsCountdown ({
  totalClassifications = 0,
  error,
  isLoading = true,
}) {
  const classificationsToGo = TARGET_CLASSIFICATIONS - totalClassifications

  if (error || isLoading) return null
  
  return (
    <Content
      className='billions-countdow-content'
      pad={{ vertical: 'medium', horizontal: 'large' }}
    >
      <Text
        size='xlarge'
        textAlign='center'
      >
        {(classificationsToGo > 0)
          ? "We're approaching 1 billion classifications!"
          : "We've reached 1 billion classifications on the Zooniverse! Thank you!"
        }
      </Text>
      {(classificationsToGo > 0) && (
      <Text
        size='large'
        textAlign='center'
      >
        Classifications to go: {classificationsToGo?.toLocaleString()}
      </Text>
      )}
    </Content>
  )
}

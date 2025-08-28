import { Box, Button, Text, Tip } from 'grommet'
import { useTranslation } from 'next-i18next'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  background: ${props => props.$userVoted ?
    'linear-gradient(180deg, #4D2A8E 0%, #3C2F53 100%);'
    : props.theme.dark ? 
      props.theme.global.colors['dark-4'] 
      : props.theme.global.colors['neutral-6']
    };
  border: none;
  border-radius: 32px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  color: ${props => props.$userVoted ?
    props.theme.global.colors['neutral-6']
    : props.theme.dark ?
      props.theme.global.colors['neutral-6']
      : props.theme.global.colors['dark-3']
    };
  width: fit-content;

  &:hover,
  &:focus-visible {
    background: ${props => props.$userVoted ?
      'linear-gradient(180deg, #4D2A8E 0%, #3C2F53 100%);'
      : '#E0D4F6'
    };
    border: none;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    color: ${props => props.theme.global.colors['neutral-6']};
  }
`

const StyledText = styled(Text)`
  display: none;

  ${StyledButton}:hover &,
  ${StyledButton}:focus-visible & {
    display: inline;
    margin-left: 10px;
  }
`

const StyledVoteCount = styled(Text)`
  margin-left: 10px;

  ${StyledButton}:hover &,
  ${StyledButton}:focus-visible & {
    display: none;
  }
`

const HoverContent = styled(Box)`
  // When hover is not supported, such as a touchscreen
  display: none;

  @media (hover: hover) {
    /* when hover is supported */
    display: flex;
  }
`

const TipContent = ({ message = '' }) => (
  <HoverContent
    direction='row'
    align='center'
    width='100%'
    animation={{ delay: 250, duration: 200, type: 'fadeIn' }}
  >
    <Box background='dark-4' round='5px' pad='5px'>
      <Text>{message}</Text>
    </Box>
  </HoverContent>
)

const DEFAULT_HANDLER = () => true

function Tag({
  disabled = false,
  name = '',
  onClick = DEFAULT_HANDLER,
  userVoted = false,
  voteCount = 0,
}) {
  const { t } = useTranslation('screens')

  let message = t('Talk.logInToVote')
  if (userVoted) {
    message = t('Talk.removeVote')
  } else if (!disabled) {
    message = t('Talk.addVote')
  }

  return (
    <Tip
      content={<TipContent message={message} />}
      plain
      dropProps={{ align: { bottom: 'top' } }}
    >
      <StyledButton
        align='center'
        fill={false}
        gap='xsmall'
        justify='center'
        label={(
          <>
            <Text
              size='16px'
              weight={500}
              >
              {name}
            </Text>
            <StyledText
              size='16px'
              weight='bold'
              >
              {userVoted ? 'x' : '+'}
            </StyledText>
            {voteCount ? (
              <StyledVoteCount
                size='16px'
                weight='bold'
              >
                {voteCount}
              </StyledVoteCount>
            ) : null}
          </>
        )}
        onClick={disabled ? null : onClick}
        pad={{ horizontal: '15px', vertical: '14px' }}
        $userVoted={userVoted}
      />
    </Tip>
  )
}

Tag.propTypes = {
  name: string,
  onClick: func,
  userVoted: bool,
  voteCount: number,
}

export default Tag

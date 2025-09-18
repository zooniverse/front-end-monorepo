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


  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: ${props => props.$userVoted ?
      'linear-gradient(180deg, #4D2A8E 0%, #3C2F53 100%);'
      : '#E0D4F6'
      };
    border: none;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
    color: ${props => props.$userVoted ?
      props.theme.global.colors['neutral-6']
      : props.theme.global.colors['dark-3']};
    padding: 14px 15px;
  }
`

const StyledText = styled(Text)`
  display: none;
  min-width: 10px;

  ${StyledButton}:hover:not(:disabled) &,
  ${StyledButton}:focus:not(:disabled) & {
    display: inline-block;
    margin-left: 10px;
  }
`

const StyledVoteCount = styled(Text)`
  display: inline-block;
  margin-left: 10px;
  min-width: 10px;

  ${StyledButton}:hover:not(:disabled) &,
  ${StyledButton}:focus:not(:disabled) & {
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
    animation={{ type: 'fadeIn' }}
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

  let message
  if (!userVoted && disabled) {
    message = t('Talk.Tags.logInToVote')
  } else if (userVoted) {
    message = t('Talk.Tags.removeVote')
  } else if (!disabled) {
    message = t('Talk.Tags.addVote')
  }

  const padHorizontal = voteCount > 0 ? '15px' : '25px'

  return (
    <Tip
      content={<TipContent message={message} />}
      plain
      dropProps={{ align: { bottom: 'top' } }}
    >
      <StyledButton
        align='center'
        disabled={disabled}
        gap='xsmall'
        justify='center'
        label={(
          <>
            <Text
              size='1rem'
              weight={500}
              >
              {name}
            </Text>
            <StyledText
              size='1rem'
              weight='bold'
              >
              {userVoted ? 'x' : '+'}
            </StyledText>
            {voteCount ? (
              <StyledVoteCount
                size='1rem'
                weight='bold'
              >
                {voteCount}
              </StyledVoteCount>
            ) : null}
          </>
        )}
        onClick={onClick}
        pad={{ horizontal: padHorizontal, vertical: '14px' }}
        $userVoted={userVoted}
      />
    </Tip>
  )
}

Tag.propTypes = {
  disabled: bool,
  name: string,
  onClick: func,
  userVoted: bool,
  voteCount: number,
}

export default Tag

import { Box, Text } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import SpacedText from '../SpacedText'

const StyledProjectCard = styled(Box)`
  text-decoration: none;
  font-size: ${props => props.cardFontSize};
`

const StyledProjectContent = styled(Box)`
  position: static;
  bottom: 0;
  height: 20%;
  transition: height 0.5s ease;

  ${StyledProjectCard}:hover &,
  ${StyledProjectCard}:focus & {
    height: 60%;
  }
`

const StyledProjectName = styled(SpacedText)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const StyledProjectDescription = styled(SpacedText)`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  height: 0;
  margin-top: 0px;
  overflow: hidden;

  ${StyledProjectCard}:hover &,
  ${StyledProjectCard}:focus & {
    height: auto;
    margin-top: 10px;
  }
`

const StyledBadge = styled(Text)`
  display: flex;
  margin: 5px 5px 5px auto;
  border-radius: 0.5rem;
  padding: 2px 3px;
  background: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  min-width: 0.75rem;
  height: auto;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
`

function cardWidth(size) {
  switch (size) {
    case 'small':
      return 157
    case 'medium':
      return 189
    case 'large':
      return 220
    case 'xlarge':
      return 252
    default:
      return 189
  }
}

function cardFontSize(size) {
  switch (size) {
    case 'small':
      return '0.625rem'
    case 'medium':
      return '0.656rem'
    case 'large':
      return '0.688rem'
    case 'xlarge':
      return '0.8rem'
    default:
      return '0.656rem'
  }
}

function ProjectCard({
  badge = undefined,
  description = '',
  displayName = '',
  href = '',
  imageSrc = '',
  size = 'medium'
}) {
  return (
    <StyledProjectCard
      elevation='small'
      flex={false}
      forwardedAs='a'
      href={href}
      round='8px'
      cardFontSize={cardFontSize(size)}
      height={`${(cardWidth(size) * 14) / 11}px`}
      width={`${cardWidth(size)}px`}
    >
      <Box
        className='project-image'
        background={{
          image: `url(${imageSrc})`,
          position: 'top',
          size: 'cover'
        }}
        height={`${cardWidth(size)}px`}
        round={{ corner: 'top', size: '8px' }}
      >
        {badge !== undefined ? <StyledBadge color='black' size='0.75rem' weight='bold' elevation='small'>
          {badge}
        </StyledBadge> : null}
      </Box>
      <StyledProjectContent
        flex='grow'
        justify='center'
        pad={{ horizontal: 'xsmall' }}
        round={{ corner: 'bottom', size: '8px' }}
      >
        <StyledProjectName
          color={{ dark: 'neutral-6', light: 'dark-5' }}
          size='inherit'
          textAlign='center'
          weight='bold'
        >
          {displayName}
        </StyledProjectName>
        <StyledProjectDescription
          color={{ dark: 'neutral-6', light: 'dark-5' }}
          size='inherit'
          textAlign='center'
          uppercase={false}
        >
          {description}
        </StyledProjectDescription>
      </StyledProjectContent>
    </StyledProjectCard>
  )
}

ProjectCard.propTypes = {
  badge: number,
  description: string,
  displayName: string,
  href: string,
  imageSrc: string,
  size: string
}

export default ProjectCard

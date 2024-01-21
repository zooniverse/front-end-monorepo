import { Box } from 'grommet'
import { bool, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

const StyledProjectCard = styled(Box)`
  font-size: 10px;
  height: 200px;
  text-decoration: none;
  width: 157px;

  > .project-image {
    height: 157px;
  }

  ${props => !props.small && css`
    @media (768px < width <= 1280px) {
      font-size: 10.5px;
      height: 240px;
      width: 189px;

      > .project-image {
        height: 189px;
      }
    }

    @media (width > 1280px) {
      font-size: 11px;
      height: 280px;
      width: 220px;

      > .project-image {
        height: 220px;
      }
    }
  `}
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

function ProjectCard ({
  description = '',
  displayName = '',
  href = '',
  imageSrc = '',
  small = false
}) {
  return (
    <StyledProjectCard
      elevation='small'
      flex={false}
      forwardedAs='a'
      href={href}
      round='8px'
      small={small}
    >
      <Box
        className='project-image'
        background={{
          image: `url(${imageSrc})`,
          position: 'top',
          size: 'cover',
        }}
        round={{ corner: 'top', size: '8px' }}
      >
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
  description: string,
  displayName: string,
  href: string,
  imageSrc: string,
  small: bool
}

export default ProjectCard

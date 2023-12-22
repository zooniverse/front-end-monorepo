import { Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

const StyledProjectCard = styled(Box)`
  font-size: 11px;
  height: 280px;
  text-decoration: none;
  width: 220px;

  @media (768px < width < 1280px) {
    font-size: 10.5px;
    height: 240px;
    width: 189px;
  }

  @media (width <= 768px) {
    font-size: 10px;
    height: 200px;
    width: 157px;
  }
`

const StyledProjectImage = styled(Box)`
  height: 220px;

  @media (768px < width < 1280px) {
    height: 189px;
  }

  @media (width <= 768px) {
    height: 157px;
  }
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
  imageSrc = ''
}) {
  return (
    <StyledProjectCard
      elevation='small'
      forwardedAs='a'
      href={href}
      round='xxsmall'
    >
      <StyledProjectImage
        background={{
          image: `url(${imageSrc})`,
          position: 'top',
          size: 'cover',
        }}
        round={{ corner: 'top', size: 'xxsmall' }}
      >
      </StyledProjectImage>
      <StyledProjectContent
        flex='grow'
        justify='center'
        pad={{ horizontal: 'xsmall' }}
        round={{ corner: 'bottom', size: 'xxsmall' }}
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
  imageSrc: string
}

export default ProjectCard

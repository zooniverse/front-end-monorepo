import { Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

const StyledProjectCard = styled(Box)`
  font-size: 12px;
  height: 280px;
  text-decoration: none;
  width: 220px;

  @media (768px < width < 1280px) {
    font-size: 11.5px;
    height: 240px;
    width: 189px;
  }

  @media (width <= 768px) {
    font-size: 11px;
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
  height: 22%;
  transition: height 0.5s ease;

  ${StyledProjectCard}:hover &,
  ${StyledProjectCard}:focus & {
    height: 65%;
  }
`

const StyledSpacedText = styled(SpacedText)`
  height: 0;
  margin: 5px 0 0 0;
  overflow: auto;

  ${StyledProjectCard}:hover &,
  ${StyledProjectCard}:focus & {
    height: auto;
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
          position: 'absolute',
          size: 'cover',
        }}
        round={{ corner: 'top', size: 'xxsmall' }}
      >
      </StyledProjectImage>
      <StyledProjectContent
        flex='grow'
        justify='center'
        pad='xsmall'
        round={{ corner: 'bottom', size: 'xxsmall' }}
      >
        <SpacedText
          color={{ dark: 'neutral-6', light: 'dark-5' }}
          size='inherit'
          textAlign='center'
          weight='bold'
        >
          {displayName}
        </SpacedText>
        <StyledSpacedText
          color={{ dark: 'neutral-6', light: 'dark-5' }}
          size='inherit'
          tabIndex='0'
          textAlign='center'
          uppercase={false}
        >
          {description}
        </StyledSpacedText>
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

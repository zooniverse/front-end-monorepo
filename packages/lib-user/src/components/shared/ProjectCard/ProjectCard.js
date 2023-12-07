import { Box } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { SpacedText } from '@zooniverse/react-components'

const StyledDescription = styled(SpacedText)`
  left: -9999px;
  opacity: 0;
  position: absolute;
`

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

  &:hover ${StyledDescription},
  &:focus ${StyledDescription} {
    left: 0;
    opacity: 1;
    position: static;
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
      <Box
        background={{
          image: `url(${imageSrc})`,
          position: 'absolute',
          size: 'cover',
        }}
        height='78%'
        round={{ corner: 'top', size: 'xxsmall' }}
      >
      </Box>
      <Box
        flex='grow'
        justify='center'
        height={{ min: '22%' }}
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
        <StyledDescription
          color={{ dark: 'neutral-6', light: 'dark-5' }}
          margin={{ top: 'xxsmall' }}
          size='inherit'
          textAlign='center'
          uppercase={false}
        >
          {description}
        </StyledDescription>
      </Box>
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

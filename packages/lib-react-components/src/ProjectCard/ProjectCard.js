import { Box } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../translations/i18n'
import SpacedText from '../SpacedText'
import CardHeader from './components/CardHeader'

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
  size = 'medium',
  state = 'live'
}) {
  const { t } = useTranslation()

  let cardTitle = `${displayName}, ${description}`
  if (state === 'paused') {
    cardTitle = cardTitle + `, ${t('ProjectCard.state')}: ${t('ProjectCard.paused')}`
  } else if (state === 'finished') {
    cardTitle = cardTitle + `, ${t('ProjectCard.state')}: ${t('ProjectCard.finished')}`
  }
  if (badge) {
    cardTitle = cardTitle + `, ${t('ProjectCard.classifications')}: ${badge}`
  }

  return (
    <StyledProjectCard
      a11yTitle={cardTitle}
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
        <CardHeader
          badge={badge}
          state={state}
        />
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
  size: string,
  state: string
}

export default ProjectCard

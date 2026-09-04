import { Box, Text } from 'grommet'
import { Group, Lock } from 'grommet-icons'
import { object, string } from 'prop-types'
import styled from 'styled-components'

const StyledCollectionCard = styled(Box)`
  overflow: hidden;
  position: relative;
  text-decoration: none;
`

const CollectionDetails = styled(Box)`
  bottom: 0;
  height: 45px;
  position: absolute;
  transition: height 0.5s ease;
  width: 100%;
  z-index: 1;

  ${StyledCollectionCard}:hover &,
  ${StyledCollectionCard}:focus & {
    height: 115px;
  }
`

const CollectionDescription = styled(Text)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: 0;
  overflow: hidden;

  ${StyledCollectionCard}:hover &,
  ${StyledCollectionCard}:focus & {
    height: auto;
    margin: 10px;
  }
`

const Header = styled(Box)`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
`

const Badge = styled(Text)`
  backdrop-filter: blur(2px);
  background: rgba(64, 64, 64, 0.6);
  border-radius: 60px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);
  height: fit-content;
  max-width: 70%;
  padding: 6px 5px;
`

function CollectionCard({ collection, userId }) {
  const {
    default_subject_src: imageSrc,
    description,
    display_name: displayName,
    links,
    private: isPrivate,
    slug
  } = collection
  const owner = links?.owner
  const subjectCount = links?.subjects?.length || 0
  const hasCollaborators = links?.collection_roles?.length > 1
  const href = `https://www.zooniverse.org/collections/${slug}`

  return (
    <StyledCollectionCard
      a11yTitle={`${displayName}, ${owner?.display_name}, ${subjectCount} subjects`}
      elevation='small'
      flex={false}
      forwardedAs='a'
      href={href}
      height='245px'
      round='8px'
      width='280px'
    >
      <Box
        background={imageSrc
          ? { image: `url(${imageSrc})`, position: 'center', size: 'cover' }
          : { dark: 'dark-3', light: 'light-3' }}
        flex={false}
        height='200px'
        round={{ corner: 'top', size: '8px' }}
      >
        <Header
          direction='row'
          height='45px'
          justify='between'
          pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
        >
          <Badge
            color='white'
            size='0.75rem'
            textAlign='center'
          >
            {owner?.display_name}
          </Badge>
          <Badge color='white' size='0.75rem'>
            {subjectCount.toLocaleString()}
          </Badge>
        </Header>
      </Box>
      <CollectionDetails
        align='center'
        background={{ dark: 'dark-3', light: 'white' }}
        flex={false}
        justify='center'
        round={{ corner: 'bottom', size: '8px' }}
      >
        <Box
          align='center'
          direction='row'
          fill='horizontal'
          height={{ max: '45px' }}
          justify={!isPrivate && !hasCollaborators ? 'center' : 'between'}
          pad='xsmall'
        >
          {isPrivate ? <Lock aria-label='Private collection' size='12px' /> : null}
          <Text
            color={{ dark: 'neutral-6', light: 'dark-5' }}
            size='0.875rem'
            textAlign='center'
            weight='bold'
          >
            {displayName}
          </Text>
          {hasCollaborators ? <Group aria-label='Collection has collaborators' size='12px' /> : null}
        </Box>
        {description ? (
          <CollectionDescription
            color={{ dark: 'neutral-6', light: 'dark-5' }}
            size='0.875rem'
            textAlign='center'
          >
            {description}
          </CollectionDescription>
        ) : null}
      </CollectionDetails>
    </StyledCollectionCard>
  )
}

CollectionCard.propTypes = {
  collection: object.isRequired,
  userId: string
}

export default CollectionCard

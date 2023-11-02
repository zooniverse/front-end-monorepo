import { Box, Heading } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { Media, ZooniverseLogo } from '@zooniverse/react-components'
import styled from 'styled-components'

import Publication from '../Publication/Publication.js'

const StyledBox = styled(Box)`
  border-radius: 5px;
  overflow: hidden;
`

const Placeholder = ({ title }) => {
  return (
    <Box
      align='center'
      justify='center'
      background='brand'
      height='100%'
      width='100%'
    >
      <ZooniverseLogo size='50%' id={title} />
    </Box>
  )
}

function Project(props) {
  const { avatarSrc, id, title, publications } = props
  return (
    <Box as='section' key={id} margin={{ bottom: 'medium' }}>
      <Box
        direction='row'
        align='center'
        alignContent='center'
        gap='xsmall'
        margin={{ bottom: 'xsmall' }}
      >
        <StyledBox height='50px' width='50px'>
          {!avatarSrc && <Placeholder title={title} />}
          {avatarSrc && (
            <Media
              height={50}
              src={avatarSrc}
              placeholder={<Placeholder title={title} />}
            />
          )}
        </StyledBox>
        <Heading
          level='3'
          size='small'
        >
          {title} ({publications.length})
        </Heading>
      </Box>
      {publications.map((publication, i) => (
        <Publication
          avatarSrc={avatarSrc}
          key={`${publication.url}${i}`}
          {...publication}
        />
      ))}
    </Box>
  )
}

Project.propTypes = {
  avatarSrc: string,
  projectId: string,
  title: string,
  publications: arrayOf(
    shape({
      authors: string,
      title: string,
      url: string,
      year: string
    })
  )
}

export default Project

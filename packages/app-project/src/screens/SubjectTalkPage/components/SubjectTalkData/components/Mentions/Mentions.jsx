import { Box } from 'grommet'
import { BlockQuote } from 'grommet-icons'
import { useTranslation } from 'next-i18next'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'

import SectionHeading from '../SectionHeading'
import TalkComment from '../TalkComment'

function Mentions({
  error,
  isLoading,
  mentions,
  roles,
  users
}) {
  return (
    <Box>
      <SectionHeading
        icon={
          <BlockQuote
            color={{ dark: 'light-1', light: 'dark-4' }}
            size='1rem'
          />
        }
        title='Mentions'
      />
      {mentions?.length > 0 ? (
        <Box
          as='ol'
          gap='small'
          margin='none'
          pad='none'
        >
          {mentions.map(mention => (
            <TalkComment
              key={mention.id}
              roles={roles}
              comment={mention.comment}
            />
          ))}
        </Box>
      ) : (
        <div>No mentions found.</div>
      )}
    </Box>
  )
}

export default Mentions

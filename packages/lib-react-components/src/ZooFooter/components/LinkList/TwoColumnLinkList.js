import { Anchor, Box } from 'grommet'
import { arrayOf, string } from 'prop-types'
import styled from 'styled-components'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'

const StyledBox = styled(Box)`
  height: fit-content;
  list-style-type: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(6, auto);
  column-gap: 8px;
`

export default function TwoColumnLinkList({ className, labels, urls }) {
  const [title, ...links] = zipLabelsAndUrls(labels, urls)

  return (
    <Box>
      <SpacedText size='small' weight='bold'>
        <Anchor href={title.url}>{title.label}</Anchor>
      </SpacedText>

      <StyledBox aria-label={title.label} as='ul'>
        {links.length > 0 &&
          links.map(link => (
            <li key={link.url}>
              <Anchor
                color={{
                  dark: 'light-3',
                  light: 'dark-5'
                }}
                href={link.url}
                size='small'
              >
                {link.label}
              </Anchor>
            </li>
          ))}
      </StyledBox>
    </Box>
  )
}

TwoColumnLinkList.propTypes = {
  labels: arrayOf(string).isRequired,
  urls: arrayOf(string).isRequired
}

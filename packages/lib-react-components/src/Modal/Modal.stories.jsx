import zooTheme from '@zooniverse/grommet-theme'
import { useState } from 'react'
import { Anchor, Box, Grid, Image, Text } from 'grommet'
import styled from 'styled-components'

import Modal, { Modal as ModalComponent } from './Modal'
import readme from './README.md'

const EXAMPLE_STRING =
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'

const { colors } = zooTheme.global

export default {
  title: 'Components / Modal',
  component: ModalComponent,
  args: {
    content: EXAMPLE_STRING,
    headingBackground: colors.brand,
    title: 'Modal Title',
    titleColor: colors['neutral-6']
  },
  argTypes: {
    headingBackground: {
      control: 'color'
    },
    titleColor: {
      control: 'color'
    }
  },
  parameters: {
    docs: {
      description: {
        component: readme
      }
    }
  }
}

export function Default({
  content,
  headingBackground,
  title,
  titleColor
}) {
  const [active, setActive] = useState(true)

  return (
    <Modal
      active={active}
      closeFn={() => setActive(!active)}
      headingBackground={headingBackground}
      title={title}
      titleColor={titleColor}
    >
      {content}
    </Modal>
  )
}

export function Required({
  content,
  headingBackground,
  title,
  titleColor
}) {
  return (
    <Modal
      active
      headingBackground={headingBackground}
      title={title}
      titleColor={titleColor}
    >
      {content}
    </Modal>
  )
}

// Modal styling for eventual SubjectGroupViewer Done&Talk modal starts here
const StyledAnchor = styled(Anchor)`
  &:hover, &:focus, &:focus-visible {
    border: solid 3px ${props => props.theme.global.colors.brand};
  }
`

export function SubjectGroupTalkExample() {
  return (
    <Modal
      active={true}
      closeFn={() => true} // closeFN must be present to close the modal and show the X close button
      title='Discuss this subject group'
    >
      <Box gap='xsmall' width={{ max: '400px' }}>
        <Text>Choose a subject to view in Talk</Text>
        <Grid
          columns={['1fr', '1fr', '1fr']}
          rows={['1fr', '1fr', '1fr']}
          gap='xsmall'
        >
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/07695229-3090-4e69-a869-8c6acdb83c49.jpeg' // use actual subject locations in classifier
              alt='Subject 1' // use actual subject id here
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/91301844-b95c-4909-b62b-8004f8945f17.png'
              alt='Subject 2'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/72d11151-3fb1-4bab-8df1-6ee9e559252f.jpeg'
              alt='Subject 3'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/992aca85-c099-4d3b-a270-d3856c2dd7b3.png'
              alt='Subject 4'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/603a6e44-4c3d-4b8b-8eb0-b2cb9cdb597e.png'
              alt='Subject 5'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/bd22f9cb-2011-4b31-b650-e8c48d8766e6.png'
              alt='Subject 6'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/9cb0783e-ab8a-4fbe-8f8f-f3b9209ee13f.png'
              alt='Subject 7'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/3dced4f4-577e-4b17-a102-fb5886c11f92.png'
              alt='Subject 8'
            />
          </StyledAnchor>
          <StyledAnchor
            href='https://www.zooniverse.org/projects/[owner]/[projectName]/talk/subjects/[subjectId]'
            target='_blank'
          >
            <Image
              height='100%'
              width='100%'
              src='https://panoptes-uploads.zooniverse.org/subject_location/96c6eae2-5fe4-4b3f-a00c-890308ddad83.png'
              alt='Subject 9'
            />
          </StyledAnchor>
        </Grid>
      </Box>
    </Modal>
  )
}

import { Box } from 'grommet'

import SlideTutorial from './SlideTutorial'
import { TutorialMediumFactory } from '@test/factories'

const media = [
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads-staging.zooniverse.org/project_attached_image/79f23ef0-f07f-42cf-b250-841c6c557d2a.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads-staging.zooniverse.org/project_attached_image/cb1b4745-a2df-40c6-ab16-381d109f20c8.jpeg'
  })
]

const steps = [
  {
    content: `**How it works**\n\n*First*, record how many squirrels you see in the image. Images sometimes have no visible squirrels, and these are often photos of squirrel "sign", like tracks in the snow. If you do see one or more squirrel, simplify decide between one squirrel or two or more squirrels.`,
    medium: media[0].id
  },
  {
    content: `*Next*, select the dominant coat color of the squirrel. If there is a single squirrel, you can only select one color. If there is more than one squirrel, you will select all the color morphs you see in the image.
    \n\nThe options for color morphs are "black", "white", "other", and "uncertain". Let's take a look at each of those morphs.`,
    medium: media[1].id
  }
]

const strings = {
  display_name: 'A slide tutorial',
  'steps.0.content': steps[0].content,
  'steps.1.content': steps[1].content
}

function stepWithMedium(index) {
  const medium = media[index]
  const step = steps[index]
  return { medium, step }
}

export default {
  title: 'Other / SlideTutorial',
  component: SlideTutorial,
  args: {
    height: '100%',
    width: '400px'
  }
}

export function Default({ height, width }) {
  return (
    <Box height='medium' width={width}>
      <SlideTutorial
        height={height}
        steps={steps}
        stepWithMedium={stepWithMedium}
        strings={strings}
        width={width}
      />
    </Box>
  )
}

const manySteps = Array(7).fill(steps).flat()

const manyStepsStrings = {
  display_name: 'A slide tutorial',
  'steps.0.content': steps[0].content,
  'steps.1.content': steps[1].content,
  'steps.2.content': steps[0].content,
  'steps.3.content': steps[1].content,
  'steps.4.content': steps[0].content,
  'steps.5.content': steps[1].content,
  'steps.6.content': steps[0].content,
  'steps.7.content': steps[1].content,
  'steps.8.content': steps[0].content,
  'steps.9.content': steps[1].content,
  'steps.10.content': steps[0].content,
  'steps.11.content': steps[1].content,
  'steps.12.content': steps[1].content,
  'steps.13.content': steps[1].content
}

function stepWithManyMedium(index) {
  const medium = media[index]
  const step = manySteps[index]
  return { medium, step }
}

export function LotsOfSteps({ height, width }) {
  return (
    <Box height='medium' width={width}>
      <SlideTutorial
        height={height}
        steps={manySteps}
        stepWithMedium={stepWithManyMedium}
        strings={manyStepsStrings}
        width={width}
      />
    </Box>
  )
}

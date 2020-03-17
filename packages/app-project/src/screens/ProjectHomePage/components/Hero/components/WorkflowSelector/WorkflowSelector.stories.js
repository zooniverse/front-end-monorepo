import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import * as nextRouter from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import sinon from 'sinon'

import WorkflowSelector from './'

const store = {
  project: {
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
    },
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds',
    slug: 'brbcornell/nest-quest-go-western-bluebirds',
    workflow_description: `Choose your own adventure! There are many ways to engage with this project:  
      1) "Nest Site": Smartphone-friendly, helps us understand where Western Bluebirds build their nests.  
      2) "Location": Smartphone-friendly, series of questions on the geographic location of the nest.  
      3) "Nest Attempt: Smartphone-friendly, for data-entry lovers to record nest attempt data on cards.  
      4) "Comments": For transcription lovers, we ask you to transcribe all the written comments on the cards.`
  }
}
/*
Mock NextJS router adapted from
https://github.com/zeit/next.js/issues/1827#issuecomment-470155709
*/
const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti',
  push: () => {},
  prefetch: () => {},
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}
sinon.stub(nextRouter, 'useRouter').callsFake(() => mockedRouter)

const WORKFLOWS = {
  loading: asyncStates.success,
  data: [
    {
      completeness: 0.65,
      default: false,
      displayName: 'The Family and the Fishing Net',
      id: '12345'
    },
    {
      completeness: 0,
      default: false,
      displayName: 'Games Without Frontiers',
      id: '7890'
    },
    {
      completeness: 0.99,
      default: false,
      displayName: 'Shock The Monkey',
      id: '5678'
    }
  ]
}
const WORKFLOWS_LOADING = {
  loading: asyncStates.loading,
  data: null
}
const WORKFLOWS_ERROR = {
  loading: asyncStates.error,
  data: null
}
storiesOf('Project App / Screens / Project Home / Workflow Selector', module)
  .addDecorator(withKnobs)
  .add('plain', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Provider store={store}>
        <WorkflowSelector
          workflows={WORKFLOWS}
        />
      </Provider>
    </Grommet>
  ))
  .add('loading', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Provider store={store}>
        <WorkflowSelector
          workflows={WORKFLOWS_LOADING}
        />
      </Provider>
    </Grommet>
  ))
  .add('error', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Provider store={store}>
        <WorkflowSelector
          workflows={WORKFLOWS_ERROR}
        />
      </Provider>
    </Grommet>
  ))

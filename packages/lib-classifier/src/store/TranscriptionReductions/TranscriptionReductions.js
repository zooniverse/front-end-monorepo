import asyncStates from '@zooniverse/async-states'
import { GraphQLClient } from 'graphql-request'
import { flow, types } from 'mobx-state-tree'

export const caesarClient = new GraphQLClient('https://caesar.zooniverse.org/graphql')
const CONSENSUS_SCORE_TO_RETIRE = 3
const MINIMUM_VIEW_TO_RETIRE = 5

const TranscriptionLine = types.model({
  consensusReached: types.boolean,
  frame: types.number,
  hasCollaborated: types.boolean,
  points: types.array(types.frozen({})),
  previousAnnotation: types.boolean,
  textOptions: types.array(types.string),
})

const TranscriptionReductions = types
  .model('TranscriptionReductions', {
    caesarReducerKey: types.string,
    error: types.maybeNull(types.frozen({})),
    frame: types.optional(types.number, 0),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    reductions: types.array(types.frozen({})),
    subjectId: types.string,
    workflowId: types.string
  })

  .views(self => {
    function constructCoordinates (line) {
      if (line && line.clusters_x && line.clusters_y) {
        return line.clusters_x.map((point, i) => ({ x: line.clusters_x[i], y: line.clusters_y[i] }))
      }
      return []
    }

    function constructText (line) {
      const sentences = []
      if (line && line.clusters_text) {
        line.clusters_text.forEach(value => {
          value.forEach((word, i) => {
            if (!sentences[i]) {
              sentences[i] = []
            }
            if (word && word.length) {
              sentences[i].push(word)
            }
          })
        })
      }
      return sentences.map(value => value.join(' '));
    }

    function constructLine (annotation, threshold) {
      const { frame } = self
      const points = constructCoordinates(annotation)
      const textOptions = constructText(annotation)
      return TranscriptionLine.create({
        points,
        frame,
        textOptions,
        consensusReached:
          annotation.consensus_score >= threshold ||
          annotation.number_views >= MINIMUM_VIEW_TO_RETIRE,
        previousAnnotation: true,
        hasCollaborated: false,
      })
    }

    return {
      get transcribedLines () {
        const { frame, reductions } = self
        let transcribedLines = []
        reductions.forEach(reduction => {
          const { parameters } = reduction.data
          const consensusThreshold = parameters.low_consensus_threshold || CONSENSUS_SCORE_TO_RETIRE
          const currentFrameAnnotations = reduction.data[`frame${frame}`] || []
          const currentFrameLines = currentFrameAnnotations.map(annotation => {
            return constructLine(annotation, consensusThreshold)
          })
          transcribedLines = transcribedLines.concat(currentFrameLines)
        })
        return transcribedLines
      }
    }
  })

  .actions(self => {
    return {
      afterCreate () {
        self.fetchCaesarReductions()
      },

      fetchCaesarReductions: flow(function * fetchCaesarReductions () {
        const { caesarReducerKey, subjectId, workflowId } = self
        self.loadingState = asyncStates.loading
        try {
          const query = `{
            workflow(id: ${workflowId}) {
              subject_reductions(subjectId: ${subjectId}, reducerKey:"${caesarReducerKey}")
              {
                data
              }
            }
          }`
          const response = yield caesarClient.request(query.replace(/\s+/g, ' '))
          self.reductions = response.workflow && response.workflow.subject_reductions
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
          self.reductions = []
        }
      }),

      changeFrame (frame) {
        self.frame = frame
      }
    }
  })

export default TranscriptionReductions

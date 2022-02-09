import asyncStates from '@zooniverse/async-states'
import { flow, getEnv, types } from 'mobx-state-tree'
import cuid from 'cuid'

const DEFAULT_CONSENSUS_THRESHOLD = 3
const DEFAULT_VIEWS_TO_RETIRE = 5
const REDUCER_KEY = 'alice'

const TranscriptionReductions = types
  .model('TranscriptionReductions', {
    error: types.maybeNull(types.frozen({})),
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

    function constructLine (reduction, options) {
      const { frame, minimumViews, threshold } = options
      const consensusText = reduction.consensus_text
      const points = constructCoordinates(reduction)
      const textOptions = constructText(reduction)
      return {
        consensusReached:
          reduction.consensus_score >= threshold ||
          reduction.number_views >= minimumViews,
        consensusText,
        frame,
        id: cuid(),
        points,
        textOptions
      }
    }

    return {
      consensusLines (frame) {
        const { reductions } = self
        let consensusLines = []
        reductions.forEach(reduction => {
          const { parameters } = reduction.data
          const threshold = parameters?.low_consensus_threshold || DEFAULT_CONSENSUS_THRESHOLD
          const minimumViews = parameters?.minimum_views || DEFAULT_VIEWS_TO_RETIRE
          const currentFrameReductions = reduction.data[`frame${frame}`] || []
          const currentFrameConsensus = currentFrameReductions.map(reduction => {
            return constructLine(reduction, { frame, minimumViews, threshold })
          })
          consensusLines = consensusLines.concat(currentFrameConsensus)
        })
        return consensusLines
      }
    }
  })

  .actions(self => {
    return {
      afterAttach () {
        if (self.reductions.length === 0) {
          self.fetchCaesarReductions()
        }
      },

      fetchCaesarReductions: flow(function * fetchCaesarReductions () {
        const { subjectId, workflowId } = self
        const caesarClient  = getEnv(self)?.client?.caesar
        self.loadingState = asyncStates.loading
        try {
          const query = `{
            workflow(id: ${workflowId}) {
              subject_reductions(subjectId: ${subjectId}, reducerKey:"${REDUCER_KEY}")
              {
                data
              }
            }
          }`
          const response = yield caesarClient?.request(query.replace(/\s+/g, ' '))

          self.reductions = response?.workflow?.subject_reductions
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
          self.reductions = []
        }
      })
    }
  })

export default TranscriptionReductions

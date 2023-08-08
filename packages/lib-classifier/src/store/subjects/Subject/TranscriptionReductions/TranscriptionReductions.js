import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'
import cuid from 'cuid'

const DEFAULT_CONSENSUS_THRESHOLD = 3
const DEFAULT_VIEWS_TO_RETIRE = 5

const TranscriptionReductions = types
  .model('TranscriptionReductions', {
    reducer: types.literal('alice'),
    error: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    reductions: types.array(types.frozen({})),
    subjectId: types.string,
    workflowId: types.string
  })

  .views(self => {
    function constructCoordinates(line) {
      if (line && line.clusters_x && line.clusters_y) {
        return line.clusters_x.map((point, i) => ({ x: line.clusters_x[i], y: line.clusters_y[i] }))
      }
      return []
    }

    function constructText(line) {
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

    function constructLine(reduction, options) {
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
        id: reduction.id,
        points,
        textOptions
      }
    }

    /**
    Generate an array of consensus lines for a single frame.
    */
    function frameConsensus(line, options) {
      if (!line.id) {
        line.id = cuid()
      }
      return constructLine(line, options)
    }

    /**
    Generate an array of consensus lines for a single reduction and frame.
    */
    function reductionConsensus(reduction, frame) {
      const { parameters } = reduction.data
      const currentFrameReductions = reduction.data[`frame${frame}`] || []
      const options = {
        frame,
        minimumViews: parameters?.minimum_views || DEFAULT_VIEWS_TO_RETIRE,
        threshold: parameters?.low_consensus_threshold || DEFAULT_CONSENSUS_THRESHOLD
      }
      return currentFrameReductions.map(line => frameConsensus(line, options))
    }

    /**
    Unique users from all the lines of a single frame.
    */
    function frameUsers(frame) {
      // A frame is an array of line transcriptions.
      // Each line has a list of user IDs that contributed to the transcription.
      const users = frame.map(line => line.user_ids)
      const uniqueUsers = [...new Set(users.flat())]
      return uniqueUsers
    }

    /**
    Get the frames from a single reduction.
    */
    function reductionFrames(reduction) {
      return Object.entries(reduction.data).filter(([key, value]) => key.startsWith('frame'))
    }

    /** 
    Unique user IDs for a single Caesar reduction
    */ 
    function reductionUsers(reduction) {
      const users = reductionFrames(reduction).map(([key, frame]) => frameUsers(frame))
      const uniqueUsers = new Set(users.flat())
      return [ ...uniqueUsers]
    }

    return {
      consensusLines(frame) {
        const { reductions } = self
        return reductions.map(reduction => reductionConsensus(reduction, frame)).flat()
      },

      get userIDs() {
        const users = self.reductions.map(reductionUsers)
        const uniqueUsers = new Set(users.flat())
        return [...uniqueUsers]
      }
    }
  })

  .actions(self => {
    return {}
  })

export default TranscriptionReductions

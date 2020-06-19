import { reducedASMSubject } from '@store/TranscriptionReductions/mocks'
import TranscriptionReductions from '@store/TranscriptionReductions'

export default function setupMock () {
  const transcriptionReductions = TranscriptionReductions.create({
    reductions: reducedASMSubject.workflow.subject_reductions,
    subjectId: '1',
    workflowId: '2'
  })
  const { consensusLines } = transcriptionReductions
  return consensusLines.filter(line => line.consensusReached)
}
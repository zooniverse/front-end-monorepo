import { reducedASMSubject } from '@store/subjects/Subject/TranscriptionReductions/mocks'
import TranscriptionReductions from '@store/subjects/Subject/TranscriptionReductions'

export default function setupMock () {
  const transcriptionReductions = TranscriptionReductions.create({
    reductions: reducedASMSubject.workflow.subject_reductions,
    subjectId: '1',
    workflowId: '2'
  })
  const consensusLines = transcriptionReductions.consensusLines(0)
  return consensusLines.filter(line => line.consensusReached)
}
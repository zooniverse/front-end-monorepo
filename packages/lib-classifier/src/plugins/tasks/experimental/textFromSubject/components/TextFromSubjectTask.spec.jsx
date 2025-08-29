import { when } from 'mobx'
import nock from 'nock'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TextFromSubjectTaskContainer from './TextFromSubjectContainer'
import { default as Task } from '@plugins/tasks/experimental/textFromSubject'
import SubjectType from '@store/SubjectStore/SubjectType'
import { SubjectFactory } from '@test/factories'

describe('TextFromSubject Task', function () {
  const task = Task.TaskModel.create({
    strings: {
      instruction: 'Correct the text.'
    },
    taskKey: 'T0',
    type: 'textFromSubject'
  })
  const subjectSnapshot = SubjectFactory.build({
    locations: [{
      'text/plain': 'https://panoptes-uploads-staging.zooniverse.org/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt'
    }]
  })
  const subject = SubjectType.create(subjectSnapshot)

  describe('with a subject text data request error', function () {
    let textArea
    const annotation = task.defaultAnnotation()

    before(function () {
      sinon.stub(console, 'error')
      nock('https://panoptes-uploads-staging.zooniverse.org')
        .get('/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt')
        .reply(400, 'This is a test error.')

      render(
        <TextFromSubjectTaskContainer
          annotation={annotation}
          disabled={false}
          subject={subject}
          task={task}
        />
      )
      textArea = screen.getByRole('textbox', { name: 'Correct the text.' })
    })

    after(function () {
      console.error.restore()
      nock.cleanAll()
    })

    it('should show a labelled textarea', function () {
      expect(textArea).toBeDefined()
    })

    it('should show a disabled textarea', function () {
      expect(textArea.disabled).to.equal(true)
    })
  })

  describe('with subject text data request success', function () {
    let textArea, resetButton
    const annotation = task.defaultAnnotation()

    before(async function () {
      nock('https://panoptes-uploads-staging.zooniverse.org')
        .get('/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt')
        .reply(200, 'This is test subject text.')

      render(
        <TextFromSubjectTaskContainer
          annotation={annotation}
          disabled={false}
          subject={subject}
          task={task}
        />
      )

      await when(() => annotation.initializedFromSubject === true)
      textArea = screen.getByRole('textbox', { name: 'Correct the text.' })
      resetButton = screen.getByRole('button', { name: 'TextFromSubjectTask.reset' })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should show a labelled textarea', function () {
      expect(textArea).toBeDefined()
    })

    it('should show an enabled textarea with subject text', function () {
      expect(textArea.disabled).to.equal(false)
      expect(textArea).to.have.value('This is test subject text.')
    })

    describe('with textarea value unchanged from subject text', function () {
      it('should have a disabled reset button', function () {
        expect(resetButton.disabled).to.equal(true)
      })
    })
  })

  describe('with the textarea value changed from subject text', function () {
    let textArea, resetButton
    const annotation = task.defaultAnnotation()
    const user = userEvent.setup({ delay: null })

    before(async function () {
      nock('https://panoptes-uploads-staging.zooniverse.org')
        .get('/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt')
        .reply(200, 'This is test subject text.')

      render(
        <TextFromSubjectTaskContainer
          annotation={annotation}
          disabled={false}
          subject={subject}
          task={task}
        />
      )

      await when(() => annotation.initializedFromSubject === true)
      textArea = screen.getByRole('textbox', { name: 'Correct the text.' })
      await user.type(textArea, ' With an updated value.')
      resetButton = screen.getByRole('button', { name: 'TextFromSubjectTask.reset' })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should have a textarea with the updated value', function () {
      expect(textArea).to.have.value('This is test subject text. With an updated value.')
    })

    it('should have an enabled reset button', function () {
      expect(resetButton.disabled).to.equal(false)
    })
  })

  describe('with a changed textarea value reset to the subject text', function () {
    const annotation = task.defaultAnnotation()

    before(function () {
      nock('https://panoptes-uploads-staging.zooniverse.org')
        .get('/subject_location/9d03230b-7ef0-42b5-aa99-996b0394cc9e.txt')
        .reply(200, 'This is test subject text.')
    })

    after(function () {
      nock.cleanAll()
    })

    it('should have a textarea value reset to the subject text on reset button click', async function () {
      const user = userEvent.setup({ delay: null })
      render(
        <TextFromSubjectTaskContainer
          annotation={annotation}
          disabled={false}
          subject={subject}
          task={task}
        />
      )

      await when(() => annotation.initializedFromSubject === true)
      const textArea = screen.getByRole('textbox', { name: 'Correct the text.' })
      await user.type(textArea, ' With an updated value.')
      expect(textArea).to.have.value('This is test subject text. With an updated value.')

      const resetButton = screen.getByRole('button', { name: 'TextFromSubjectTask.reset' })
      await user.click(resetButton)
      expect(textArea).to.have.value('This is test subject text.')
    })
  })
})

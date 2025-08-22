import { Grommet } from 'grommet'
import { render, screen, waitFor } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { composeStory } from '@storybook/react'
import Meta, { Default, Tablet } from './SubjectSetPicker.stories'
import { mockWorkflow, SubjectSetPickerBaseURL } from './SubjectSetPicker.mock.js'

describe('Component > SubjectSetPicker', function () {
  [Default, Tablet].forEach(function (Story) {
    describe(`${Story.name} Story`, function () {
      beforeEach(function () {
        const StoryComponent = composeStory(Story, Meta)
        render(<Grommet><StoryComponent /></Grommet>)
      })

      it('should contain the heading text', function () {
        expect(screen.getByText('SubjectSetPicker.heading')).toBeDefined()
      })

      it('should contain the byline text', function () {
        expect(screen.getByText('SubjectSetPicker.byline')).toBeDefined()
      })

      it('should render the correct number of subject cards', function () {
        const cards = document.getElementsByClassName('subject-set-card')
        expect(cards.length).to.equal(mockWorkflow.subjectSets.length)
      })

      mockWorkflow.subjectSets.forEach((subjectSet, index) => {
        it(`should find the subject set name at index ${index}`, async function () {
          const card = screen.getByTestId(`subject-set-card-${subjectSet.id}`)
          await expect(within(card).getByText(subjectSet.display_name)).toBeDefined()
        })

        it(`should find the subject set total subjects at index ${index}`, async function () {
          const card = screen.getByTestId(`subject-set-card-${subjectSet.id}`)
          await expect(within(card).getByText(`${subjectSet.set_member_subjects_count} subjects`)).toBeDefined()
        })

        it(`should find the subject set completion at index ${index}`, async function () {
          await expect(screen.getByTestId(`test-subject-set-card-${subjectSet.id}`).getAttribute('href'))
            .to.equal(`${SubjectSetPickerBaseURL}/workflow/${Object.keys(subjectSet.completeness)[0]}/subject-set/${subjectSet.id}`)
        })
      })

      it('should render completed Subject Sets after incomplete Subject Sets', async function () {
        // Assuming un-sorted array from SubjectSetPickerMock is: [
        //   { id: '85771', completeness: 1 },
        //   { id: '85772', completeness: 0 },
        //   { id: '85773', completeness: 0.67 },
        // ]

        await waitFor(function() {
          const cards = document.getElementsByClassName('test-subject-set-card');
          expect(cards.length).to.equal(3)
          expect(cards[0].dataset.testid).to.equal(`test-subject-set-card-${mockWorkflow.subjectSets[1].id}`)
          expect(cards[1].dataset.testid).to.equal(`test-subject-set-card-${mockWorkflow.subjectSets[2].id}`)
          expect(cards[2].dataset.testid).to.equal(`test-subject-set-card-${mockWorkflow.subjectSets[0].id}`)
        })
      })
    })
  })
})

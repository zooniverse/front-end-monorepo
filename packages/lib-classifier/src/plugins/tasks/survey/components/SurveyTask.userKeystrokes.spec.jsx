import { composeStory } from '@storybook/react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Meta, { Default, NoFiltersNoInstruction } from './SurveyTask.stories'

describe('SurveyTask with user keystrokes', function () {
  // this turns off Mocha's time limit for slow tests
  this.timeout(0)

  const DefaultStory = composeStory(Default, Meta)
  const NoFiltersNoInstructionStory = composeStory(NoFiltersNoInstruction, Meta)

  describe('without filters', function() {
    let user, choiceButton, choiceButtons

    beforeEach(async function () {
      user = userEvent.setup({ delay: null })
      render(<NoFiltersNoInstructionStory />)
      choiceButton = screen.getByText('Fire')
      await user.click(choiceButton)
      const identifyButton = screen.getByText('SurveyTask.Choice.identify')
      // identify choice (Fire) and close choice (Fire) component
      await user.click(identifyButton)
      // confirm choices showing
      choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
    })

    it('should remove a previously identified choice with delete key', async function () {
      expect(choiceButtons.length).to.equal(6)

      // confirm choice Fire selected
      choiceButton = screen.getByLabelText('Fire; SurveyTask.ChoiceButton.identified')
      expect(choiceButton).to.be.ok()

      // confirm choice Fire active element
      await waitFor(() => expect(choiceButton).to.equal(document.activeElement))

      // press delete key to remove choice (Fire)
      await user.keyboard('[Delete]')
      // confirm choice Fire not selected
      choiceButton = screen.getByLabelText('Fire')
      expect(choiceButton).to.be.ok()
    })

    it('should remove a previously identified choice with backspace key', async function () {
      expect(choiceButtons.length).to.equal(6)

      // confirm choice Fire selected
      choiceButton = screen.getByLabelText('Fire; SurveyTask.ChoiceButton.identified')
      expect(choiceButton).to.be.ok()

      // confirm choice Fire active element
      await waitFor(() => expect(choiceButton).to.equal(document.activeElement))

      // press backspace key to remove choice (Fire)
      await user.keyboard('[Backspace]')
      // confirm choice Fire not selected
      choiceButton = screen.getByLabelText('Fire')
      expect(choiceButton).to.be.ok()
    })
  })

  describe('when the Filter button is keyed with Enter', function () {
    let user, filterButton

    beforeEach(async function () {
      user = userEvent.setup({ delay: null })
      render(<DefaultStory />)
      filterButton = screen.getByLabelText('SurveyTask.CharacteristicsFilter.filter')
      // tabbing to and opening the Filter button
      await user.keyboard('[Tab][Enter]')
    })

    it('should show characteristic filter sections', async function () {
      // the filterSections are the characteristic filter sections, i.e. the sections for "Like", "Pattern", and "Color" for the mock task
      const characteristicsSection = await screen.findByTestId('characteristics')
      const filterSections = within(characteristicsSection).getAllByRole('radiogroup')
      expect(filterSections.length).to.equal(3)
    })

    describe('when filters are keyed', function () {
      it('should show a remove filter button', async function () {
        // the "remove solid filter" button is a button that renders after the "solid" filter is applied
        // confirm the "remove solid filter" button does not exist before the solid filter is applied
        let solidFilterRemoveButton = screen.queryByTestId('remove filter-PTTRN-SLD')
        expect(solidFilterRemoveButton).to.be.null()

        // tabbing to the pattern section that contains the solid filter and applying the solid filter with space key
        await user.keyboard('[Tab][Tab][Space]')

        // confirm the solid filter is selected with existence of the related remove filter button
        solidFilterRemoveButton = screen.getByTestId('remove filter-PTTRN-SLD')
        expect(solidFilterRemoveButton).to.be.ok()
      })

      it('should show the choices that match the filter', async function () {
        // tabbing to the pattern section that contains the solid filter and applying the solid filter with space key
        await user.keyboard('[Tab][Tab][Space]')
        // close the filters
        await user.click(filterButton)
        // confirm the solid filter is applied; of the total 6 choices 3 choices (Aardvark, Elephant, and Kudu) match the solid filter
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        expect(choiceButtons.length).to.equal(3)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
      })

      it('should remove the filter on remove filter button keypress', async function () {
        // tabbing to the pattern section that contains the solid filter and applying the solid filter with space key
        await user.keyboard('[Tab][Tab][Space]')
        // confirm the solid filter is selected with existence of the related remove filter button
        let solidFilterRemoveButton = screen.getByTestId('remove filter-PTTRN-SLD')
        expect(solidFilterRemoveButton).to.be.ok()

        // close the filters
        await user.click(filterButton)
        // confirm the solid filter is applied; of the total 6 choices 3 choices (Aardvark, Elephant, and Kudu) match the solid filter
        let choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        expect(choiceButtons.length).to.equal(3)

        // remove the solid filter with the "Remove solid filter" button
        await user.keyboard('[Tab][Space]')
        // confirm the choices are the total 6 choices, not filtered by the solid filter
        choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        expect(choiceButtons.length).to.equal(6)
      })
    })
  })

  describe('when a choice is selected with Enter', function () {
    let user

    beforeEach(async function () {
      user = userEvent.setup({ delay: null })
      render(<NoFiltersNoInstructionStory />)
      // tabbing to the first choice (Aardvark)
      await user.keyboard('[Tab]')
      // pressing Enter to open the choice (Aardvark)
      await user.keyboard('[Enter]')
    })

    it('should show the "more info" button', async function () {
      const choiceMoreInfoButton = screen.getByRole('button', { name: 'SurveyTask.Choice.moreInfo' })
      expect(choiceMoreInfoButton).to.be.ok()
    })

    it('should show choice images', async function () {
      const choiceImages = screen.getByTestId('choice-images')
      expect(choiceImages).to.be.ok()
    })

    it('should close choice on Escape key', async function () {
      await waitFor(() => expect(document.activeElement === document.body).to.be.false())
      // pressing Escape to close the choice (Aardvark)
      await user.keyboard('[Escape]')
      // confirm choice (Aardvark) description, and therefore choice, is not visible
      expect(screen.queryByText('Not as awesome as a pangolin, but surprisingly big.')).to.be.null()
    })
  })
})

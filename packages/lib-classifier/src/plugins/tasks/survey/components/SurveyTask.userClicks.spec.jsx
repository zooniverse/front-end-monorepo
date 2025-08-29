import { composeStory } from '@storybook/react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Meta, { Default } from './SurveyTask.stories'

describe('SurveyTask with user clicks', function () {
  // this turns off Mocha's time limit for slow tests
  this.timeout(0)
  const DefaultStory = composeStory(Default, Meta)

  describe('when the Filter button is clicked', function () {
    let user, filterButton

    beforeEach(async function () {
      user = userEvent.setup({ delay: null })
      render(<DefaultStory />)
      // click the Filter button above choices to open the characteristics filters
      filterButton = screen.getByLabelText('SurveyTask.CharacteristicsFilter.filter')
      await user.click(filterButton)
    })

    it('should show characteristic filter sections', async function () {
      const characteristicsSection = await screen.findByTestId('characteristics')
      // the filterSections are the characteristic filter sections, i.e. the sections for "Like", "Pattern", and "Color" for the mock task
      const filterSections = within(characteristicsSection).getAllByRole('radiogroup')

      expect(filterSections.length).to.equal(3)
    })

    describe('when filters are clicked', function () {
      it('should show a related remove filter button', async function () {
        const stripesFilterButton = document.querySelector('label[for="PTTRN-STRPS"]')
        // click/apply the stripes filter
        await user.click(stripesFilterButton)

        // confirm the stripes filter is selected by checking for the presence of the related remove filter button
        const stripesFilterRemoveButton = screen.getByTestId('remove filter-PTTRN-STRPS')
        expect(stripesFilterRemoveButton).toBeDefined()
      })

      it('should show the choices that match the filter', async function () {
        const redFilterButton = document.querySelector('label[for="CLR-RD"]')
        expect(redFilterButton).toBeDefined()

        // the following user events filter choices by the color red and then close the characteristics filters, returning to the list of choices

        await user.click(redFilterButton)
        await user.click(filterButton)
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        // confirm the choices are the 3 choices that match the red filter
        expect(choiceButtons.length).to.equal(3)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Kudu')
        expect(choiceButtons[2]).to.have.text('Fire')
      })

      it('should persist filters after a choice is selected', async function () {
        const redFilterButton = document.querySelector('label[for="CLR-RD"]')
        // click/apply the red filter, which filters 6 choices to 3 choices
        await user.click(redFilterButton)
        // close the characteristics filters
        await user.click(filterButton)
        const fireChoiceButton = screen.getByText('Fire')
        // select the Fire choice
        await user.click(fireChoiceButton)
        const identifyButton = screen.getByText('SurveyTask.Choice.identify')
        // identify the Fire choice
        await user.click(identifyButton)
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        // confirm the remaining choices are the 3 choices that match the red filter
        expect(choiceButtons.length).to.equal(3)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Kudu')
        expect(choiceButtons[2]).to.have.text('Fire')
      })

      it('should remove the filter on remove filter button click', async function () {
        const stripesFilterButton = document.querySelector('label[for="PTTRN-STRPS"]')
        // click/apply the stripes filter
        await user.click(stripesFilterButton)
        await user.click(filterButton)
        // confirm the stripes filter is applied, of the total 6 choices only 1 choice (Kudu) matches the stripes filter
        let choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        expect(choiceButtons.length).to.equal(1)

        const stripesFilterRemoveButton = screen.getByTestId('remove filter-PTTRN-STRPS')
        // remove the stripes filter
        await user.click(stripesFilterRemoveButton)
        choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        // confirm the choices are the total 6 choices, not filtered by the stripes filter
        expect(choiceButtons.length).to.equal(6)
      })

      it('should remove filters on Clear All Filters button click', async function () {
        const cowHorseFilterButton = document.querySelector('label[for="LK-CWHRS"]')
        // click/apply the like a cow/horse filter
        await user.click(cowHorseFilterButton)
        const tanYellowFilterButton = screen.getByTestId('filter-CLR-TNLLW')
        // click/apply the color tan/yellow filter
        await user.click(tanYellowFilterButton)
        await user.click(filterButton)
        let choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        // confirm the choices remaining are the 1 choice (Kudu) that matches the cow/horse and tan/yellow filters
        expect(choiceButtons.length).to.equal(1)

        const clearFiltersButton = screen.getByText('SurveyTask.CharacteristicsFilter.clearFilters')
        // clear the filters
        await user.click(clearFiltersButton)
        choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
        // confirm the choices are the total 6 choices, not filtered by the cow/horse and tan/yellow filters
        expect(choiceButtons.length).to.equal(6)
      })
    })
  })

  describe('when a choice is clicked', function () {
    let user

    beforeEach(async function () {
      user = userEvent.setup({ delay: null })
      render(<DefaultStory />)
      const choiceButton = screen.getByText('Fire')
      await user.click(choiceButton)
    })

    it('should show the "More info" button', async function () {
      const choiceMoreInfoButton = screen.getByRole('button', { name: 'SurveyTask.Choice.moreInfo' })
      expect(choiceMoreInfoButton).toBeDefined()
    })

    it('should show choice images', async function () {
      const choiceImages = screen.getByTestId('choice-images')
      expect(choiceImages).toBeDefined()
    })

    it('should show choices with closed choice focused when Not This button is clicked', async function () {
      const cancelButton = screen.getByText('SurveyTask.Choice.cancel')
      // close choice (Fire) component
      await user.click(cancelButton)
      // confirm choice "More info" button is not shown, therefore choice is closed
      const choiceMoreInfoButton = screen.queryByRole('button', { name: 'SurveyTask.Choice.moreInfo' })
      expect(choiceMoreInfoButton).to.equal(null)
      // confirm choices are shown
      const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
      expect(choiceButtons.length).to.equal(6)
      const fireChoiceButton = Array.from(choiceButtons).find(choiceButton => choiceButton.textContent === 'Fire')
      // confirm choice (Fire) is focused
      await waitFor(() => expect(fireChoiceButton).to.equal(document.activeElement))
    })

    it('should show choices with selected choice focused when Identify button is clicked', async function () {
      const identifyButton = screen.getByTestId('choice-identify-button')
      // identify choice (Fire) and close choice (Fire) component
      await user.click(identifyButton)
      // confirm choice "More info" button is not shown, therefore choice is closed
      const choiceMoreInfoButton = screen.queryByRole('button', { name: 'SurveyTask.Choice.moreInfo' })
      expect(choiceMoreInfoButton).to.equal(null)
      // confirm choices are shown
      const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitem]')
      expect(choiceButtons.length).to.equal(6)
      const fireChoiceButton = Array.from(choiceButtons).find(choiceButton => choiceButton.textContent === 'Fire')
      // confirm choice (Fire) is shown as focused
      await waitFor(() => expect(fireChoiceButton).to.equal(document.activeElement))
    })

    it('should disable "Done & Talk" and "Done" buttons', async function () {
      let buttons = Array.from(document.querySelectorAll('button'))
      let doneButton = buttons.find( button => button.textContent === 'TaskArea.Tasks.DoneButton.done')
      const doneAndTalkButton = screen.getByRole('button', {
        name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk TaskArea.Tasks.DoneAndTalkButton.newTab'
      })

      // confirm the Done & Talk and Done buttons are disabled while a choice is selected
      expect(doneAndTalkButton.disabled).to.equal(true)
      expect(doneButton.disabled).to.equal(true)

      // identify choice (Fire) and close choice (Fire) component
      const identifyButton = screen.getByTestId('choice-identify-button')
      await user.click(identifyButton)

      buttons = Array.from(document.querySelectorAll('button'))
      // doneAndTalkButton = buttons.find(button => button.textContent === 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')
      doneButton = buttons.find( button => button.textContent === 'TaskArea.Tasks.DoneButton.done')

      // confirm the Done & Talk and Done buttons are enabled after a choice is selected
      const doneAndTalkLink = screen.getByRole('link', {
        name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk TaskArea.Tasks.DoneAndTalkButton.newTab'
      })
      expect(doneAndTalkLink).toBeDefined()
      expect(doneButton.disabled).to.equal(false)
    })
  })
})

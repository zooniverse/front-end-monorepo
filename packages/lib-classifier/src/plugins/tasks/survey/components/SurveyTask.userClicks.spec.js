import { expect } from 'chai'
import { composeStory } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
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
      const characteristicsSection = screen.getByTestId('characteristics')
      // the filterSections are the characteristic filter sections, i.e. the sections for "Like", "Pattern", and "Color" for the mock task
      const filterSections = within(characteristicsSection).getAllByRole('radiogroup')
      
      expect(filterSections.length).to.equal(3)
    })

    describe('when filters are clicked', function () {
      it('should show the filter button with a remove filter button', async function () {
        // the stripesFilterButton is the button to filter choices by "stripes". Stripes is a specific value of the "Pattern" characteristic
        const stripesFilterButton = document.querySelector('label[for="PTTRN-STRPS"]')
        expect(stripesFilterButton).to.be.ok()

        // the stripesFilterRemoveButton is the small x button that appears over a filter to remove the filter, after it is selected. The presence of this button indicates that the filter is selected. The absence of this button indicates that the filter is not selected
        let characteristicsSection = screen.getByTestId('characteristics')
        let stripesFilterRemoveButton = within(characteristicsSection).queryByTestId('remove-filter-PTTRN-STRPS')
        expect(stripesFilterRemoveButton).to.be.null()
        
        await user.click(stripesFilterButton)
        characteristicsSection = screen.getByTestId('characteristics')
        stripesFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-STRPS')
        expect(stripesFilterRemoveButton).to.be.ok()
      })

      it('should show the choices that match the filter', async function () {
        const redFilterButton = document.querySelector('label[for="CLR-RD"]')
        expect(redFilterButton).to.be.ok()

        // the following user events filter choices by the color red and then close the characteristics filters, returning to the list of choices

        await user.click(redFilterButton)
        await user.click(filterButton)
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
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
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
        // confirm the remaining choices are the 3 choices that match the red filter
        expect(choiceButtons.length).to.equal(3)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Kudu')
        expect(choiceButtons[2]).to.have.text('Fire')
      })

      it('should remove the filter on remove filter button click (within Characteristics)', async function () {
        const stripesFilterButton = document.querySelector('label[for="PTTRN-STRPS"]')
        // click/apply the stripes filter
        await user.click(stripesFilterButton)
        const characteristicsSection = screen.getByTestId('characteristics')
        const stripesFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-STRPS')
        // confirm the stripes filter is selected by checking for the presence of the remove filter button
        expect(stripesFilterRemoveButton).to.be.ok()

        // remove the stripes filter
        await user.click(stripesFilterRemoveButton)
        // close the characteristics filters
        await user.click(filterButton)
        const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
        // confirm the choices are the total 6 choices, not filtered by the stripes filter
        expect(choiceButtons.length).to.equal(6)
      })

      it('should remove the filter on remove filter button click (within FilterStatus)', async function () {
        const stripesFilterButton = document.querySelector('label[for="PTTRN-STRPS"]')
        // click/apply the stripes filter
        await user.click(stripesFilterButton)
        await user.click(filterButton)
        // confirm the stripes filter is applied, of the total 6 choices only 1 choice (Kudu) matches the stripes filter
        let choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
        expect(choiceButtons.length).to.equal(1)

        const filterStatusSection = screen.getByTestId('filter-status')
        const stripesFilterRemoveButton = within(filterStatusSection).getByTestId('remove-filter-PTTRN-STRPS')
        // remove the stripes filter
        await user.click(stripesFilterRemoveButton)
        choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
        // confirm the choices are the total 6 choices, not filtered by the stripes filter
        expect(choiceButtons.length).to.equal(6)
      })

      it('should remove filters on Clear Filters button click (within Characteristics) ', async function () {
        // click/apply the like a cow/horse filter
        const cowHorseFilterButton = document.querySelector('label[for="LK-CWHRS"]')
        await user.click(cowHorseFilterButton)
        // click/apply the color tan/yellow filter
        const tanYellowFilterButton = screen.getByTestId('filter-CLR-TNLLW')
        await user.click(tanYellowFilterButton)
        const characteristicsSection = screen.getByTestId('characteristics')
        let cowHorseFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-LK-CWHRS')
        let tanYellowFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-CLR-TNLLW')
        // confirm the cow/horse and tan/yellow filters are applied
        expect(cowHorseFilterRemoveButton).to.be.ok()
        expect(tanYellowFilterRemoveButton).to.be.ok()

        const clearFiltersButton = within(characteristicsSection).getByText('SurveyTask.CharacteristicsFilter.clearFilters')
        // clear the filters
        await user.click(clearFiltersButton)
        cowHorseFilterRemoveButton = screen.queryByTestId('remove-filter-LK-CWHRS')
        tanYellowFilterRemoveButton = screen.queryByTestId('remove-filter-CLR-TNLLW')
        // confirm the cow/horse and tan/yellow filters are removed
        expect(cowHorseFilterRemoveButton).to.be.null()
        expect(tanYellowFilterRemoveButton).to.be.null()
      })

      it('should remove filters on Clear Filters button click (within Chooser)', async function () {
        const cowHorseFilterButton = document.querySelector('label[for="LK-CWHRS"]')
        // click/apply the like a cow/horse filter
        await user.click(cowHorseFilterButton)
        const tanYellowFilterButton = screen.getByTestId('filter-CLR-TNLLW')
        // click/apply the color tan/yellow filter
        await user.click(tanYellowFilterButton)
        await user.click(filterButton)
        let choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
        // confirm the choices remaining are the 1 choice (Kudu) that matches the cow/horse and tan/yellow filters
        expect(choiceButtons.length).to.equal(1)

        const clearFiltersButton = screen.getByText('SurveyTask.CharacteristicsFilter.clearFilters')
        // clear the filters
        await user.click(clearFiltersButton)
        choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
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

    it('should show the choice description', async function () {
      const choiceDescription = screen.getByText('It\'s a fire. Pretty sure you know what this looks like.')
      expect(choiceDescription).to.be.ok()
    })

    it('should show choice images', async function () {
      const choiceImages = screen.getByTestId('choice-images')
      expect(choiceImages).to.be.ok()
    })

    it('should show choices with closed choice focused when Not This button is clicked', async function () {
      const notThisButton = screen.getByText('SurveyTask.Choice.notThis')
      // close choice (Fire) component
      await user.click(notThisButton)
      // confirm choice (Fire) description, and therefore choice, is not shown
      const choiceDescription = screen.queryByText('It\'s a fire. Pretty sure you know what this looks like.')
      expect(choiceDescription).to.be.null()
      // confirm choices are shown
      const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
      expect(choiceButtons.length).to.equal(6)
      const fireChoiceButton = Array.from(choiceButtons).find(choiceButton => choiceButton.textContent === 'Fire')
      // confirm choice (Fire) is focused
      expect(fireChoiceButton).to.equal(document.activeElement)
    })

    it('should show choices with selected choice checked and focused when Identify button is clicked', async function () {
      const identifyButton = screen.getByTestId('choice-identify-button')
      // identify choice (Fire) and close choice (Fire) component
      await user.click(identifyButton)
      // confirm choice (Fire) description, and therefore choice, is not shown
      const choiceDescription = screen.queryByText('It\'s a fire. Pretty sure you know what this looks like.')
      expect(choiceDescription).to.be.null()
      // confirm choices are shown
      const choiceButtons = document.querySelector('[role=menu]').querySelectorAll('[role=menuitemcheckbox]')
      expect(choiceButtons.length).to.equal(6)
      const fireChoiceButton = Array.from(choiceButtons).find(choiceButton => choiceButton.textContent === 'Fire')
      // confirm choice (Fire) is shown as checked
      expect(fireChoiceButton.getAttribute('aria-checked')).to.equal('true')
      // confirm choice (Fire) is shown as focused
      expect(fireChoiceButton).to.equal(document.activeElement)
    })
    
    it('should disable "Done & Talk" and "Done" buttons', async function () {
      let buttons = Array.from(document.querySelectorAll('button'))
      let doneAndTalkButton = buttons.find(button => button.textContent === 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')
      let doneButton = buttons.find( button => button.textContent === 'TaskArea.Tasks.DoneButton.done')
      
      // confirm the Done & Talk and Done buttons are disabled while a choice is selected
      expect(doneAndTalkButton.disabled).to.be.true()
      expect(doneButton.disabled).to.be.true()
      
      // identify choice (Fire) and close choice (Fire) component
      const identifyButton = screen.getByTestId('choice-identify-button')
      await user.click(identifyButton)

      buttons = Array.from(document.querySelectorAll('button'))
      doneAndTalkButton = buttons.find(button => button.textContent === 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk')
      doneButton = buttons.find( button => button.textContent === 'TaskArea.Tasks.DoneButton.done')

      // confirm the Done & Talk and Done buttons are enabled after a choice is selected
      expect(doneAndTalkButton.disabled).to.be.false()
      expect(doneButton.disabled).to.be.false()
    })
  })
})

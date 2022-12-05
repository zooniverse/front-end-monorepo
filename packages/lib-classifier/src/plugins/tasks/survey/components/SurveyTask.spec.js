import { expect } from 'chai'
import { composeStory } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, NoFilters } from './SurveyTask.stories'

describe('SurveyTask', function () {
  // this turns off Mocha's time limit for slow tests
  this.timeout(0)
  
  describe('when choices are showing / without a selected choice', function () {
    describe('with characteristic filters', function () {
      const DefaultStory = composeStory(Default, Meta)

      it('should show a filter button', function () {
        const { getByRole } = render(<DefaultStory />)
        
        // filterButton is the Filter button above the choices
        const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        
        expect(filterButton).to.be.ok()
      })

      it('should show the choices', function () {
        const { getAllByRole } = render(<DefaultStory />)
        
        // choiceButtons are the menu items / buttons for the various choices (i.e. for the mock task the various animals)
        const choiceButtons = getAllByRole('menuitemcheckbox')
        
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      it('should show the choices showing count out of total choices count', function () {
        const { getByText } = render(<DefaultStory />)
        
        // choicesShowingCount is the text below choices that notes "Showing X of Y"
        const choicesShowingCount = getByText('SurveyTask.CharacteristicsFilter.showing')
        
        expect(choicesShowingCount).to.be.ok()
      })

      it('should show a Clear Filters button', function () {
        const { getByRole } = render(<DefaultStory />)
        
        const clearFiltersButton = getByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
        
        expect(clearFiltersButton).to.be.ok()
      })

      it('should disable the Clear Filters button if showing choices = total choices', function () {
        const { getByRole } = render(<DefaultStory />)
        
        const clearFiltersButton = getByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
        
        expect(clearFiltersButton).to.have.attribute('disabled')
      })
    })

    describe('without characteristic filters', function () {
      const NoFiltersStory = composeStory(NoFilters, Meta)
      
      it('should not show a filter button', function () {
        const { queryByRole } = render(<NoFiltersStory />)
        
        const filterButton = queryByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        
        expect(filterButton).to.not.exist()
      })

      it('should show the choices', function () {
        const { getAllByRole } = render(<NoFiltersStory />)
        
        // choiceButtons are the menu items / buttons for the various choices (i.e. for the mock task the various animals)
        const choiceButtons = getAllByRole('menuitemcheckbox')
        
        expect(choiceButtons.length).to.equal(6)
        expect(choiceButtons[0]).to.have.text('Aardvark')
        expect(choiceButtons[1]).to.have.text('Elephant')
        expect(choiceButtons[2]).to.have.text('Kudu')
        expect(choiceButtons[3]).to.have.text('Human')
        expect(choiceButtons[4]).to.have.text('Fire')
        expect(choiceButtons[5]).to.have.text('Nothing here')
      })

      it('should not show the choices showing count out of total choices count', function () {
        const { queryByText } = render(<NoFiltersStory />)
        
        const choicesShowingCount = queryByText('SurveyTask.CharacteristicsFilter.showing')
        
        expect(choicesShowingCount).to.not.exist()
      })

      it('should not not show a clear filters button', function () {
        const { queryByRole } = render(<NoFiltersStory />)
        
        const clearFiltersButton = queryByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
        
        expect(clearFiltersButton).to.not.exist()
      })
    })
  })

  describe('with user clicks', function () {   
    const DefaultStory = composeStory(Default, Meta)

    describe('when the Filter button is clicked', function () {
      it('should show characteristic filter sections', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole } = render(<DefaultStory />)
        // filterButton is the Filter button above the choices
        const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        await user.click(filterButton)
        // the filterSections are the characteristic filter sections, i.e. the sections for "Like", "Pattern", and "Color" for the mock task
        const filterSections = getAllByRole('radiogroup')
        
        expect(filterSections.length).to.equal(3)
      })

      describe('when filters are clicked', function () {
        it('should show the filter button with a remove filter button', async function () {
          const user = userEvent.setup({ delay: null })
          const { getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          // the stripesFilterButton is the button to filter choices by "stripes". Stripes is a specific value of the "Pattern" characteristic.
          const stripesFilterButton = getByTestId('filter-PTTRN-STRPS')
          expect(stripesFilterButton).to.be.ok()

          // the stripesFilterRemoveButton is the small x button that appears over a filter to remove the filter, after it is selected. The presence of this button indicates that the filter is selected. The absence of this button indicates that the filter is not selected.
          let characteristicsSection = getByTestId('characteristics')
          let stripesFilterRemoveButton = within(characteristicsSection).queryByTestId('remove-filter-PTTRN-STRPS')
          expect(stripesFilterRemoveButton).to.be.null()
          
          await user.click(stripesFilterButton)
          characteristicsSection = getByTestId('characteristics')
          stripesFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-STRPS')
          expect(stripesFilterRemoveButton).to.be.ok()
        })

        it('should show the choices that match the filter', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          const redFilterButton = getByTestId('filter-CLR-RD')
          expect(redFilterButton).to.be.ok()

          // the following user events filter choices by the color red and then close the characteristics filters, returning to the list of choices.

          await user.click(redFilterButton)
          await user.click(filterButton)
          const choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(3)
          expect(choiceButtons[0]).to.have.text('Aardvark')
          expect(choiceButtons[1]).to.have.text('Kudu')
          expect(choiceButtons[2]).to.have.text('Fire')
        })

        it.skip('should persist filters after a choice is selected', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })

          // open the characteristics filters
          await user.click(filterButton)
          const redFilterButton = getByTestId('filter-CLR-RD')
          // click/apply the red filter, which filters 6 choices to 3 choices
          await user.click(redFilterButton)
          // close the characteristics filters
          await user.click(filterButton)
          const fireChoiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
          expect(fireChoiceButton).to.be.ok()

          // select the Fire choice
          await user.click(fireChoiceButton)
          const identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
          expect(identifyButton).to.be.ok()

          // identify the Fire choice
          await user.click(identifyButton)
          // confirm the remaining choices are the 3 choices that match the red filter
          const choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(3)
          expect(choiceButtons[0]).to.have.text('Aardvark')
          expect(choiceButtons[1]).to.have.text('Kudu')
          expect(choiceButtons[2]).to.have.text('Fire')
        })

        it.skip('should remove the filter on remove filter button click (within Characteristics)', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          const stripesFilterButton = getByTestId('filter-PTTRN-STRPS')
          // click/apply the stripes filter
          await user.click(stripesFilterButton)
          const characteristicsSection = getByTestId('characteristics')
          const stripesFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-STRPS')
          // remove the stripes filter
          await user.click(stripesFilterRemoveButton)
          await user.click(filterButton)
          // confirm the choices are the total 6 choices, not filtered by the stripes filter
          const choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(6)
        })

        it.skip('should remove the filter on remove filter button click (within FilterStatus)', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          const stripesFilterButton = getByTestId('filter-PTTRN-STRPS')
          // click/apply the stripes filter
          await user.click(stripesFilterButton)
          await user.click(filterButton)
          // confirm the stripes filter is applied, of the total 6 choices only 1 choice (Kudu) matches the stripes filter
          let choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(1)

          const filterStatusSection = getByTestId('filter-status')
          const stripesFilterRemoveButton = within(filterStatusSection).getByTestId('remove-filter-PTTRN-STRPS')
          // remove the stripes filter
          await user.click(stripesFilterRemoveButton)
          // confirm the choices are the total 6 choices, not filtered by the stripes filter
          choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(6)
        })

        it.skip('should remove filters on Clear Filters button click (within Characteristics) ', async function () {
          const user = userEvent.setup({ delay: null })
          const { getByRole, getByTestId, queryByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          // click/apply the like a cow/horse filter
          const cowHorseFilterButton = getByTestId('filter-LK-CWHRS')
          await user.click(cowHorseFilterButton)
          // click/apply the color tan/yellow filter
          const tanYellowFilterButton = getByTestId('filter-CLR-TNLLW')
          await user.click(tanYellowFilterButton)
          const characteristicsSection = getByTestId('characteristics')
          let cowHorseFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-LK-CWHRS')
          let tanYellowFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-CLR-TNLLW')
          // confirm the cow/horse and tan/yellow filters are applied
          expect(cowHorseFilterRemoveButton).to.be.ok()
          expect(tanYellowFilterRemoveButton).to.be.ok()

          const clearFiltersButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.clearFilters' })
          // clear the filters
          await user.click(clearFiltersButton)
          cowHorseFilterRemoveButton = queryByTestId('remove-filter-LK-CWHRS')
          tanYellowFilterRemoveButton = queryByTestId('remove-filter-CLR-TNLLW')
          // confirm the cow/horse and tan/yellow filters are removed
          expect(cowHorseFilterRemoveButton).to.be.null()
          expect(tanYellowFilterRemoveButton).to.be.null()
        })

        it.skip('should remove filters on Clear Filters button click (within Chooser)', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          await user.click(filterButton)
          const cowHorseFilterButton = getByTestId('filter-LK-CWHRS')
          // click/apply the like a cow/horse filter
          await user.click(cowHorseFilterButton)
          const tanYellowFilterButton = getByTestId('filter-CLR-TNLLW')
          // click/apply the color tan/yellow filter
          await user.click(tanYellowFilterButton)
          await user.click(filterButton)
          let choiceButtons = getAllByRole('menuitemcheckbox')
          // confirm the choices remaining are the 1 choice (Kudu) that matches the cow/horse and tan/yellow filters
          expect(choiceButtons.length).to.equal(1)

          const clearFiltersButton = getByRole('button', { name: 'Clear SurveyTask.CharacteristicsFilter.clearFilters' })
          // clear the filters
          await user.click(clearFiltersButton)
          choiceButtons = getAllByRole('menuitemcheckbox')
          // confirm the choices are the total 6 choices, not filtered by the cow/horse and tan/yellow filters
          expect(choiceButtons.length).to.equal(6)
        })
      })
    })

    describe.skip('when a choice is clicked', function () {
      it('should show the choice heading', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole } = render(<DefaultStory />)
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Aardvark' })
        await user.click(choiceButton)
        const choiceHeading = getByRole('heading', { name: 'Aardvark' })

        expect(choiceHeading).to.be.ok()
      })

      it('should show choice images', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole, getByTestId } = render(<DefaultStory />)
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
        await user.click(choiceButton)
        const choiceImages = getByTestId('choice-images')
        
        expect(choiceImages).to.be.ok()
      })

      it('should show choices when Not This button is clicked', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole, queryByRole } = render(<DefaultStory />)
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
        await user.click(choiceButton)
        const notThisButton = getByRole('button', { name: 'SurveyTask.Choice.notThis' })
        // close choice (Fire) component
        await user.click(notThisButton)
        // confirm choice (Fire) heading, and therefore choice, is not shown
        const choiceHeading = queryByRole('heading', { name: 'Fire' })
        expect(choiceHeading).to.be.null()
        // confirm choices are shown
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
      })

      it('should show choices with selected choice checked when Identify button is clicked', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole, queryByRole } = render(<DefaultStory />)
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
        await user.click(choiceButton)
        const identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        // identify choice (Fire) and close choice (Fire) component
        await user.click(identifyButton)
        // confirm choice (Fire) heading, and therefore choice, is not shown
        const choiceHeading = queryByRole('heading', { name: 'Fire' })
        expect(choiceHeading).to.be.null()
        // confirm choices are shown
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
        // confirm choice (Fire) is shown as checked
        const fireChoiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
        expect(fireChoiceButton.getAttribute('aria-checked')).to.equal('true')
      })

      it('should disable the Identify button until required questions are answered', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole } = render(<DefaultStory />)
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Aardvark' })
        await user.click(choiceButton)
        let identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        // confirm the Identify button is disabled, pending required questions answered
        expect(identifyButton.disabled).to.be.true()
        // the required questions for Aardvark are "How many?" and "What behavior do you see?"
        // the following answers "How many?" with "3" and "What behavior do you see?" with "Eating"
        const howManyInput = getByRole('radio', { name: "3" })
        await user.click(howManyInput)
        const whatBehaviorsInput = getByRole('checkbox', { name: "Eating" })
        await user.click(whatBehaviorsInput)
        identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        // confirm the Identify button is enabled, now that required questions answered
        expect(identifyButton.disabled).to.be.false()
      })

      it('should disable "Done & Talk" and "Done" buttons', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole } = render(<DefaultStory />)
        let doneAndTalkButton = getByRole('button', { name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk' })
        let doneButton = getByRole('button', { name: 'TaskArea.Tasks.DoneButton.done' })
        // mock task doesn't require an identified choice, so confirm the Done & Talk and Done buttons are enabled before selecting a choice
        expect(doneAndTalkButton.disabled).to.be.false()
        expect(doneButton.disabled).to.be.false()

        const choiceButton = getByRole('menuitemcheckbox', { name: 'Aardvark' })
        await user.click(choiceButton)
        doneAndTalkButton = getByRole('button', { name: 'TaskArea.Tasks.DoneAndTalkButton.doneAndTalk' })
        doneButton = getByRole('button', { name: 'TaskArea.Tasks.DoneButton.done' })
        // confirm the Done & Talk and Done buttons are disabled while a choice is selected
        expect(doneAndTalkButton.disabled).to.be.true()
        expect(doneButton.disabled).to.be.true()
      })
    })
  })

  describe('with user keystrokes', function () {
    const DefaultStory = composeStory(Default, Meta)
    const NoFiltersStory = composeStory(NoFilters, Meta)

    describe('when the Filter button is keyed with Enter', function () {
      it('should show characteristic filter sections', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole } = render(<DefaultStory />)
        // tabbing to the Filter button
        await user.keyboard('[Tab]')
        const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
        expect(filterButton).to.equal(document.activeElement)
        
        // pressing the Enter key to open the Filter button
        await user.keyboard('[Enter]')
        // the filterSections are the characteristic filter sections, i.e. the sections for "Like", "Pattern", and "Color" for the mock task
        const filterSections = getAllByRole('radiogroup')
        expect(filterSections.length).to.equal(3)
      })

      describe('when filters are keyed', function () {
        it('should show the filter button with a remove filter button', async function () {
          const user = userEvent.setup({ delay: null })
          const { getByTestId, queryByTestId } = render(<DefaultStory />)
          // tabbing to and opening the Filter button
          await user.keyboard('[Tab][Enter]')
          // the solidFilterButton is the button to filter choices by "solid". Solid is a specific value of the "Pattern" characteristic.
          const solidFilterButton = getByTestId('filter-PTTRN-SLD')
          expect(solidFilterButton).to.be.ok()

          // the solidFilterRemoveButton is the small x button that appears over a filter to remove the filter, after it is selected. The presence of this button indicates that the filter is selected. The absence of this button indicates that the filter is not selected.
          let characteristicsSection = queryByTestId('characteristics')
          let solidFilterRemoveButton = within(characteristicsSection).queryByTestId('remove-filter-PTTRN-SLD')
          expect(solidFilterRemoveButton).to.be.null()
          
          // tabbing to the pattern section that contains the solid filter and selecting the solid filter with space key
          await user.keyboard('[Tab][Tab][Space]')
          characteristicsSection = queryByTestId('characteristics')
          solidFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-SLD')
          expect(solidFilterRemoveButton).to.be.ok()
        })

        it.skip('should show the choices that match the filter', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          // tabbing to and opening the Filter button
          await user.keyboard('[Tab][Enter]')
          // tabbing to the pattern section that contains the solid filter and selecting the solid filter with space key
          await user.keyboard('[Tab][Tab][Space]')
          // close the filters
          await user.click(filterButton)
          // confirming that the choices are filtered by the solid filter
          const choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(3)
          expect(choiceButtons[0]).to.have.text('Aardvark')
          expect(choiceButtons[1]).to.have.text('Elephant')
          expect(choiceButtons[2]).to.have.text('Kudu')
        })

        it.skip('should remove the filter on remove filter button keypress (within Characteristics)', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, queryByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          // tabbing to and opening the Filter button
          await user.keyboard('[Tab][Enter]')
          // tabbing to the pattern section that contains the solid filter and selecting the solid filter with space key
          await user.keyboard('[Tab][Tab][Space]')
          // confirm the solid filter is selected with existence of the related remove filter button
          let characteristicsSection = queryByTestId('characteristics')
          let solidFilterRemoveButton = within(characteristicsSection).getByTestId('remove-filter-PTTRN-SLD')
          expect(solidFilterRemoveButton).to.be.ok()

          // remove the solid filter with the "Remove solid filter" small x button
          await user.keyboard('[Tab][Tab][Space]')
          // confirm the solid filter is no longer selected with absence of the related remove filter button
          solidFilterRemoveButton = queryByTestId('remove-filter-PTTRN-SLD')
          expect(solidFilterRemoveButton).to.be.null()
          
          // close the filters
          await user.click(filterButton)
          // confirm the choices are the total 6 choices, not filtered by the solid filter
          const choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(6)
        })

        it.skip('should remove the filter on remove filter button keypress (within FilterStatus)', async function () {
          const user = userEvent.setup({ delay: null })
          const { getAllByRole, getByRole, getByTestId } = render(<DefaultStory />)
          const filterButton = getByRole('button', { name: 'SurveyTask.CharacteristicsFilter.filter' })
          // tabbing to and opening the Filter button
          await user.keyboard('[Tab][Enter]')
          // tabbing to the pattern section that contains the solid filter and selecting the solid filter with space key
          await user.keyboard('[Tab][Tab][Space]')
          // confirm the solid filter is selected with existence of the related remove filter button
          let filterStatusSection = getByTestId('filter-status')
          let solidFilterRemoveButton = within(filterStatusSection).getByTestId('remove-filter-PTTRN-SLD')
          expect(solidFilterRemoveButton).to.be.ok()

          // close the filters
          await user.click(filterButton)
          // confirm the solid filter is applied, of the total 6 choices only 1 choice (Kudu) matches the solid filter
          let choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(3)

          // remove the solid filter with the "Remove solid filter" small x button in the Filter Status component
          await user.keyboard('[Tab][Space]')
          // confirm the choices are the total 6 choices, not filtered by the solid filter
          choiceButtons = getAllByRole('menuitemcheckbox')
          expect(choiceButtons.length).to.equal(6)
        })
      })
    })

    describe('when a choice is selected with Enter', function () {
      it('should show the choice heading', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole } = render(<NoFiltersStory />)
        // tabbing to the first choice (Aardvark)
        await user.keyboard('[Tab]')
        const choiceButton = getByRole('menuitemcheckbox', { name: 'Aardvark' })
        expect(choiceButton).to.equal(document.activeElement)
        // pressing Enter to open the choice (Aardvark)
        await user.keyboard('[Enter]')
        const choiceHeading = getByRole('heading', { name: 'Aardvark' })
        expect(choiceHeading).to.be.ok()
      })

      it('should show choice images', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByTestId } = render(<NoFiltersStory />)
        // tabbing to the first choice (Aardvark) and pressing Enter to open the choice (Aardvark)
        await user.keyboard('[Tab][Enter]')
        const choiceImages = getByTestId('choice-images')
        
        expect(choiceImages).to.be.ok()
      })

      it.skip('should show choices with recent choice as active choice when Not This button keyed with Enter', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole, queryByRole } = render(<NoFiltersStory />)
        // tabbing to the first choice (Aardvark), arrowing up to the last choice (Nothing here), and pressing Enter to open the choice (Nothing here)
        await user.keyboard('[Tab]')
        await user.keyboard('[ArrowUp]')
        await user.keyboard('[Enter]')
        let choiceHeading = getByRole('heading', { name: 'Nothing here' })
        expect(choiceHeading).to.be.ok()
        // tabbing to the "Not this" button
        await user.keyboard('[Tab][Tab]')
        const notThisButton = getByRole('button', { name: 'SurveyTask.Choice.notThis' })
        expect(notThisButton).to.equal(document.activeElement)
        // pressing Enter to close the choice (Nothing here)
        await user.keyboard('[Enter]')
        // confirm choice (Nothing here) heading, and therefore choice, is not shown
        choiceHeading = queryByRole('heading', { name: 'Nothing here' })
        expect(choiceHeading).to.be.null()
        // confirm choices are shown
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
      })

      it.skip('should show choices with identified choice as active choice when Identify keyed with Enter', async function () {
        const user = userEvent.setup({ delay: null })
        const { getAllByRole, getByRole, queryByRole } = render(<NoFiltersStory />)
        // tabbing to the first choice (Aardvark), arrowing up to the last choice (Nothing here), and pressing Enter to open the choice (Nothing here)
        await user.keyboard('[Tab]')
        await user.keyboard('[ArrowUp]')
        await user.keyboard('[Enter]')
        let choiceHeading = getByRole('heading', { name: 'Nothing here' })
        expect(choiceHeading).to.be.ok()
        // tabbing to the "Identify" button
        await user.keyboard('[Tab][Tab][Tab]')
        const identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        expect(identifyButton).to.equal(document.activeElement)
        // pressing Enter to identify and close the choice (Nothing here)
        await user.keyboard('[Enter]')
        // confirm choice (Nothing here) heading, and therefore choice, is not shown
        choiceHeading = queryByRole('heading', { name: 'Fire' })
        expect(choiceHeading).to.be.null()
        // confirm choices are shown
        const choiceButtons = getAllByRole('menuitemcheckbox')
        expect(choiceButtons.length).to.equal(6)
        // confirm the identified choice (Nothing here) is the active choice
        const nothingHereChoiceButton = getByRole('menuitemcheckbox', { name: 'Nothing here' })
        expect(nothingHereChoiceButton).to.equal(document.activeElement)
      })

      it.skip('should disable the Identify button until required questions are answered', async function () {
        const user = userEvent.setup({ delay: null })
        const { getByRole } = render(<NoFiltersStory />)
        // tabbing to the first choice (Aardvark) and pressing Enter to open the choice (Aardvark)
        await user.keyboard('[Tab][Enter]')
        let identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        // confirm the Identify button is disabled, pending required questions answered
        expect(identifyButton.disabled).to.be.true()
        // the required questions for Aardvark are "How many?" and "What behavior do you see?"
        // the following answers "How many?" with "1" and "What behavior do you see?" with "Eating"
        
        // tabbing (x3) to the "How many?" question, selecting the "1" answer with space key, tabbing (x4) to the "What behavior do you see?" question, selecting the "Eating" answer with space key
        await user.keyboard('[Tab][Tab][Tab][Space][Tab][Tab][Tab][Tab][Space]')
        // confirm the Identify button is enabled, now that required questions are answered
        identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
        // confirm the Identify button is enabled, now that required questions answered
        expect(identifyButton.disabled).to.be.false()
      })
    })

    it.skip('should remove a previously identified choice with delete key', async function () {
      const user = userEvent.setup({ delay: null })
      const { getAllByRole, getByRole } = render(<NoFiltersStory />)
      let choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      await user.click(choiceButton)
      const identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
      // identify choice (Fire) and close choice (Fire) component
      await user.click(identifyButton)
      // confirm choices showing
      const choiceButtons = getAllByRole('menuitemcheckbox')
      expect(choiceButtons.length).to.equal(6)
      
      // confirm choice Fire selected
      choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      expect(choiceButton.getAttribute('aria-checked')).to.equal('true')
      
      // confirm choice Fire active element
      expect(choiceButton).to.equal(document.activeElement)
      
      // press delete key to remove choice (Fire)
      await user.keyboard('[Delete]')
      // confirm choice Fire not selected
      choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      expect(choiceButton.getAttribute('aria-checked')).to.equal('false')
    })

    it.skip('should remove a previously identified choice with backspace key', async function () {
      const user = userEvent.setup({ delay: null })
      const { getAllByRole, getByRole } = render(<NoFiltersStory />)
      let choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      await user.click(choiceButton)
      const identifyButton = getByRole('button', { name: 'SurveyTask.Choice.identify' })
      // identify choice (Fire) and close choice (Fire) component
      await user.click(identifyButton)
      // confirm choices showing
      const choiceButtons = getAllByRole('menuitemcheckbox')
      expect(choiceButtons.length).to.equal(6)
      
      // confirm choice Fire selected
      choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      expect(choiceButton.getAttribute('aria-checked')).to.equal('true')
      
      // confirm choice Fire active element
      expect(choiceButton).to.equal(document.activeElement)
      
      // press backspace key to remove choice (Fire)
      await user.keyboard('[Backspace]')
      // confirm choice Fire not selected
      choiceButton = getByRole('menuitemcheckbox', { name: 'Fire' })
      expect(choiceButton.getAttribute('aria-checked')).to.equal('false')
    })
  })
})

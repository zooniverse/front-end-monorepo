import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Last30DaysHours, Last3Months, Last12MonthsHours } from './BarChart.stories.js'

describe('components > shared > BarChart', function () {
  
  describe('with Last7Days', function () {
    const DefaultStory = composeStory(Default, Meta)
    
    it('should show the expected number of count labels', function () {
      render(<DefaultStory />)
      
      expect(screen.getAllByTestId('countLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<DefaultStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(7)
    })
  })
  
  describe('with Last30Days and Hours', function () {
    const Last30DaysHoursStory = composeStory(Last30DaysHours, Meta)
    
    it('should show the expected number of time labels', function () {
      render(<Last30DaysHoursStory />)
      
      expect(screen.getAllByTestId('timeLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last30DaysHoursStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(2)
    })
  })
  
  describe('with Last3Months', function () {
    const Last3MonthsStory = composeStory(Last3Months, Meta)
    
    it('should show the expected number of count labels', function () {
      render(<Last3MonthsStory />)
      
      expect(screen.getAllByTestId('countLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last3MonthsStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(12)
    })
  })
  
  describe('with Last12Months and Hours', function () {
    const Last12MonthsHoursStory = composeStory(Last12MonthsHours, Meta)
    
    it('should show the expected number of time labels', function () {
      render(<Last12MonthsHoursStory />)
      
      expect(screen.getAllByTestId('timeLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last12MonthsHoursStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(12)
    })
  })
})

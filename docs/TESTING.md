# Resources

To get started writing components, especially with a focus on testing, please refer to the resources below:
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Storybook](https://storybook.js.org/)

# Component Structure

Below are some basic code templates to get started with how code is generally written and tested in the Zooniverse. We're going to show the code for a sample widget called "WidgetHeading" below that provides a foundation for writing your own component.

## Basic Component Directory Structure
```js
// registers component from the rest of the codebase
index.js

// actual component file
component.js

// mock data for stories and specs
component.mock.js

// tests written in Mocha, RTL, Sinon, and Chai
component.spec.js

// stories for frontend preview
component.stories.js
```

## WidgetHeading/index.js
```js
export { default } from './WidgetHeading' // exports the default export from the WidgetHeading file
```


## WidgetHeading/WidgetHeading.js
```js
// Pulling in a component from the global component library
import { SpacedText } from '@zooniverse/react-components'

// Use Grommet for HTML wrapping and theming
import { Heading } from 'grommet'

// Import the expected prop types for the component
import { string, node } from 'prop-types'

// Enables adding styling to a component 
import styled from 'styled-components'

// Create a new styled wrapper component for the Heading component
const StyledHeading = styled(Heading)`
  font-size: 14px;
  line-height: 22px;
`
// This is the primary code for the component being built.
// Conventionally, the name of the functional component is the same as the directory itself
// As a general practice, destructure the props in the function arguments for clarity
function WidgetHeading ({
  children,
  level = '2'
}) {
  // Any internal logic to perform on the props is done here

  // When done, return the JSX to be rendered
  return (
    <StyledHeading level={level} margin='none'>
      <SpacedText
        color={{
          dark: 'light-1',
          light: 'black'
        }}
        weight='bold'
      >
        {children}
      </SpacedText>
    </StyledHeading>
  )
}

// After defining the primary widget, describe the type of expected properties
WidgetHeading.propTypes = {
  level: string,
  children: node
}

// Finally, export the widget as default
export default WidgetHeading
```


## WidgetHeading/WidgetHeading.mock.js
```js
// Two required properties were specified in the component definition
// This exported object has a test value of each property
export const WidgetHeadingMock = {
  level: '2',
  text: `Test content text...`
}

// Because the `children` property is a node, we need wrap the text as JSX
// From a testing perspective, its useful to have the text as a separate property for ease of testing
WidgetHeadingMock.children = (<div>{WidgetHeadingMock.text}</div>)

// More exported objects for other tests here
```

## WidgetHeading/WidgetHeading.stories.js
```js
// Import the primary component from index.js. This matches how it'll be imported from outside the directory
import WidgetHeadingComponent from './index'

// Import the mock data to inject into the story
import { WidgetHeadingMock } from './WidgetHeading.mock'

// Standard definition of a Storybook Story
// The '/' in title act delineates directory structure and should match the location of the code in the broader codebase
export default {
  title: 'Project App / Shared / Widget Heading',
  component: WidgetHeadingComponent
}

// This is the actual story rendered in Storybook
// Best practice is to name the story the same as the component for story files with 1 story
export const WidgetHeading = () => (
  // we pass the mock data to the component
  <WidgetHeadingComponent level={WidgetHeadingMock.level}>
    {WidgetHeadingMock.children}
  </WidgetHeadingComponent>
)

// More stories here 
```

## WidgetHeading/WidgetHeading.spec.js
```js
// Render and Screen perform most of the heavy lifting for setting up and navigating the React DOM
import { render, screen } from '@testing-library/react'

// Import the storybook component that scaffolds the stories within the test
import { composeStory } from '@storybook/react'

// Import the story component(s) to be tested
import Meta, { WidgetHeading } from './WidgetHeading.stories.js'

// Import the mock data for testing
import { WidgetHeadingMock } from './WidgetHeading.mock'

// Top-level description matches directory structure and includes the component name
describe('Component > WidgetHeading', function () {
  // individual tests should be descriptive in what they test
  it('should render the element correctly', async function () {
    // Compose the story into Storybook's composeStory component
    const WidgetHeadingStory = composeStory(WidgetHeading, Meta)

    // Render the composed story with RTL
    render(<WidgetHeadingStory />)

    // the first assertion ensures that an h2 element exists
    expect(screen.getByRole('heading', {level: parseInt(WidgetHeadingMock.level, 10)})).to.exist()

    // the second assertion ensures the mock text exists
    expect(screen.getByText(WidgetHeadingMock.text)).to.exist()

    // More assertions here
  })

  // More tests here
})
```

# React Testing Library Quick Reference

## Cheatsheet
|              | getBy        | findBy       | queryBy      | getAllBy     | findAllBy    | queryAllBy   |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| No Match     | throw        | throw        | null         | throw        | throw        | []           |
| 1 Match      | return       | return       | return       | array        | arrray       | array        |
| 1+ Match     | throw        | throw        | throw        | array        | arrray       | array        |
| Await?       | no           | yes          | no           | no           | yes          | no           | 

## Commonly Used Types
- `AltText`
- `DisplayValue`
- `LabelText`
- `PlaceholderText`
- `Role`
- `TestId`
- `Text`

## Detection Preference
1) Try to use `AltText`, `DisplayValue`, `LabelText`, `PlaceholderText`, `Role`, and `Text` first
2) When those aren't possible or don't make sense, use `TestId`
3) As a last resort, use a `className` attribute and use `document.getElementsByClassName('the-class')`

## Async Preference
Most elements are queryable with `getBy`, yet sometimes async is necessary.
```js
// Note the `async` denoted before the function creation
it(`should find async element`, async function () {
  const card = screen.getByTestId(`card-${mock.id}`)

  // we must put `await` before the expect in order for it to retry until timeout if not found
  await expect(within(card).getByText(`${mock.count} subjects`)).to.exist()
})

// An example where a chunk of code needs to be evaluated together until true
it(`should find complex async element`, async function () {
  await waitFor(function() {
    const cards = document.getElementsByClassName('test-card');
    expect(cards.length).to.equal(3)
    expect(cards[0].testid).to.equal(`card-${mock.arr[1].id}`)
    expect(cards[1].testid).to.equal(`card-${mock.arr[2].id}`)
    expect(cards[2].testid).to.equal(`card-${mock.arr[0].id}`)
  })
})
```

## Useful Snippets for Complex Examples
```js
// Getting an attribute
expect(screen.getByLabelText(‘item’).getAttribute(‘something’)).to.equal(‘somethingelse’)

// Getting a link href by testId
expect(screen.getByTestId(`card-${mock.id}`).getAttribute('href')).to.equal(`/link/to/${mock.id}`)

// Get within a dom queried element
const card = screen.getByTestId(`card-${mock.id}`)
expect(within(card).getByText(mockObj.text)).to.exist()
```

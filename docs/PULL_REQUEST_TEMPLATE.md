_Please request review from `@zooniverse/frontend` team or an individual member of that team._ 

## Package:

## Linked Issue and/or Talk Post:

## Describe your changes:

## How to Review
_Helpful explanations that will make your reviewer happy:_
- What Zooniverse project should my reviewer use to review UX?
- What user actions should my reviewer step through to review this PR?
- Which storybook stories should be reviewed?
- Are there plans for follow up PR’s to further fix this bug or develop this feature?

# Checklist
_PR Creator - Please cater the checklist to fit the review needed for your code changes._
_PR Reviewer - Use the checklist during your review. Each point should be checkmarked or discussed before PR approval._

## General
- [ ] Tests are passing locally and on Github
- [ ] Documentation is up to date. Changelog has been updated if appropriate
- [ ] You can `yarn panic && yarn bootstrap` or `docker-compose up --build` and FEM works as expected
- [ ] FEM works in all major desktop browsers: Firefox, Chrome, Edge, Safari (Use Browserstack account as needed)
- [ ] FEM works in a mobile browser

## General UX
- [ ] All pages of a FEM project load: Home Page, Classify Page, and About Pages
- [ ] Can submit a classification
- [ ] Can sign-in and sign-out
- [ ] The component is accessible
  - Can be used with a screen reader [BBC guide to VoiceOver](https://bbc.github.io/accessibility-news-and-you/accessibility-and-testing-with-voiceover-os.html)
  - Can be used from the keyboard [WebAIM guide to keyboard testing](https://webaim.org/techniques/keyboard/#testing)
  - It is passing accessibility checks in the storybook
- Example Staging Projects
    - [i-fancy-cats](https://local.zooniverse.org:3000/projects/brooke/i-fancy-cats)

## Bug Fix
- [ ] The PR creator has listed user actions to use when testing if bug is fixed
- [ ] The bug is fixed
- [ ] Unit tests are added or updated

## New Feature
- [ ] The PR creator has listed user actions to use when testing the new feature
- [ ] Unit tests are included for the new feature
- [ ] A storybook story has been created or updated
  - Example of SlideTutorial [component](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/components/Classifier/components/SlideTutorial/SlideTutorial.js) with docgen comments, and its [story](https://zooniverse.github.io/front-end-monorepo/@zooniverse/classifier/index.html?path=/docs/other-slidetutorial--default)

## Refactoring
- [ ] The PR creator has described the reason for refactoring
- [ ] The refactored component(s) continue to work as expected

## Maintenance
- [ ] If not from dependabot, the PR creator has described the update (major, minor, or patch version, changelog)

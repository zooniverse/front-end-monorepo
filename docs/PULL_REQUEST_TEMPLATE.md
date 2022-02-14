_Please request review from `@zooniverse/frontend` team or an individual member of that team._ 

Package:

Closes # .


## Describe your changes:

<em>Helpful explanations that will make your reviewer happy:</em>
- What Zooniverse project should my reviewer use to review UX?
- What user actions should my reviewer step through to review this PR?
- Which stories should be reviewed?
- Are there plans for follow up PR’s to further fix this bug or develop this feature?


# Review Checklist

## General

- [ ] Are the tests passing locally and on Travis?
- [ ] Is the documentation up to date?

## Components
- [ ] Has a storybook story been created or updated?
- [ ] Is the component accessible? 
  - [ ] Can it be used with a screen reader? [BBC guide to testing with VoiceOver](https://bbc.github.io/accessibility-news-and-you/accessibility-and-testing-with-voiceover-os.html)
  - [ ] Can it be used from the keyboard? [WebAIM guide to keyboard testing](https://webaim.org/techniques/keyboard/#testing)
  - [ ] Is it passing accessibility checks in the storybook?

## Apps

- [ ] Does it work in all major browsers: Firefox, Chrome, Edge, Safari?
- [ ] Does it work on mobile?
- [ ] Can you `yarn panic && yarn bootstrap` or `docker-compose up --build` and app works as expected?

## Publishing

- [ ] Is the changelog updated?
- [ ] Are the dependencies updated for apps and libraries that are using the newly published library?

## Post-merging

- [ ] Did the app deploy to https://frontend.preview.zooniverse.org/projects/:project-name/:owner or https://frontend.preview.zooniverse.org/about?
- [ ] Is the new feature working or bug now fixed?
  - [ ] Is there a Talk or blog post written to announce the new feature(s)?
- [ ] Is the design working across browsers (Firefox, Chrome, Edge, Safari) and mobile?
  - [ ] Is this approved by our designer?
- [ ] Is this ready for production deployment?

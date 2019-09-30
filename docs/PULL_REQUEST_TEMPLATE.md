_Please request review from `@zooniverse/frontend` team. If PR is related to design, please request review from `@beckyrother` in addition._ 

Package:

Closes # .

Describe your changes:


# Review Checklist

## General

- [ ] Are the tests passing locally and on Travis?
- [ ] Is the documentation up to date?

## Components
- [ ] Has a storybook story been created or updated?
- [ ] Is the component accessible? 
  - [ ] Can it be used with a screen reader?
  - [ ] Can it be used without a mouse?
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

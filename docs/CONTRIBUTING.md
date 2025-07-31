# Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Proposing new features
- Submitting code, which could be a fix or a feature

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Important links](#important-links)
- [Reporting bugs](#reporting-bugs)
  - [Report bugs using Github's issues](#report-bugs-using-githubs-issues)
  - [Write bug reports with detail, background, and sample code](#write-bug-reports-with-detail-background-and-sample-code)
- [Contributing code](#contributing-code)
  - [We develop with Github](#we-develop-with-github)
  - [We use Github Flow, so all code changes happen through Pull Requests](#we-use-github-flow-so-all-code-changes-happen-through-pull-requests)
  - [Any contributions you make will be under the Apache 2.0 Software License](#any-contributions-you-make-will-be-under-the-apache-20-software-license)
- [First bugs for contributors](#first-bugs-for-contributors)
  - [Use our coding style](#use-our-coding-style)
- [Testing](#testing)
- [Where can I ask for help?](#where-can-i-ask-for-help)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Important links

- [Issues](https://github.com/zooniverse/front-end-monorepo/issues)
- [Getting started](https://github.com/zooniverse/front-end-monorepo#getting-started)
- [Architecture Decision Records](https://github.com/zooniverse/front-end-monorepo/tree/master/docs/arch) (why we do things the way we do - [more info](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions))

## Reporting bugs

### Report bugs using Github's [issues](https://github.com/zooniverse/front-end-monorepo/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/zooniverse/front-end-monorepo/issues/new); it's that easy!

### Write bug reports with detail, background, and sample code

If you find a bug and want to report it, great; _thank you_. But in order for us to actually tackle it, we need plenty of information on what's going on.

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

Devs *love* thorough bug reports.

## Contributing code

### We develop with Github
We use [Github](https://github.com/) to host code, to track issues and feature requests, as well as accept pull requests.

### We use [Github Flow](https://guides.github.com/introduction/flow/index.html), so all code changes happen through Pull Requests

Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)). We actively welcome your pull requests:

1. Fork the repo and create your branch from `master`.
2. If you've added or changed code that should be tested, [**add tests**](#testing).
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Any contributions you make will be under the Apache 2.0 Software License

In short, when you submit code changes, your submissions are understood to be under the same [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) that covers the project.

### First bugs for contributors

We label issues that are a good place to start for new contributors with [`good first issue`](https://github.com/zooniverse/front-end-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

### Use our coding style

* 2 spaces for indentation rather than tabs
* You can try running `npm run lint` for style unification - we use [standard.js](https://standardjs.com/).
* We like modular code - lots of small, tested files rather than one big file. [Monoliths](https://github.com/zooniverse/Panoptes-Front-End) are not welcome here! Use inheritance or composition, depending on what you're doing.
* We use containers and components - containers for handling data, components for how that data is presented to the user (Dan Abramov has [a good article on this concept](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)).

### Testing

1. At a minimum, code you submit should be unit tested.
2. Tests should be located alongside the code:
    ```
    /path/to/component $ ls
    component.js
    component.spec.js
    ```
3. We use Mocha, Enzyme, Sinon and Chai for expectations.
4. Zooniverse should be accessible to everyone. We aim for our site, and projects, to conform to the [Web Content Accessibility Guidelines level AA](https://webaim.org/standards/wcag/checklist). Please test that your changes are accessible using the keyboard, and work as expected in a screenreader such as VoiceOver or Narrator. Lighthouse, in Chrome dev tools, can also be used to run an accessibility audit of your changes.

## Where can I ask for help?

- [Github](https://github.com/zooniverse/front-end-monorepo/issues) is a great place to start, and is where we do a lot of our discussion.
- Our [Talk boards](https://www.zooniverse.org/talk) are another good place to talk about projects, bug reports etc.
- Finally, there's always [contact@zooniverse.org](mailto:contact@zooniverse.org).

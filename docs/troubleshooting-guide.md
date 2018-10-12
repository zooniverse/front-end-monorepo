# Front-End Monorepo - Troubleshooting Guide

At this moment in time - the distant past of October 2018 - the Zooniverse
Front-End Monorepo is a rapidly fluctuating work in progress. New devs jumping
in may have trouble figuring out how to even get started, so this evolving
document was added to help with the weird errors and issues that may not yet be
covered in the "proper" documentation.

(@shaun.a.noordin 2018.10.12)

NOTE: this evolving doc should be reviewed regularly and should be retired
eventually. Any important points should be folded into the Monorepo's proper
documentation.

## Installing & Running Packages

Do what the README.MD tells you:

1. Clone the repo: `git clone git@github.com:zooniverse/front-end-monorepo.git`
2. Run Lerna's bootstrap: `lerna bootstrap`
  1. NOTE: this installs dependencies for every package, but be prepared for
     jankiness as memory leaks might occur, files are opened for writing but
     never closed, the OS lagging and etc. Doesn't always happen, but sometimes
     it does.
  2. NOTE: Despite the README saying that you should first enter into the
     package directory before running bootstrap (`cd packages/whatever`), it
     seems that Lerna will bootstrap _all_ packages regardless of which
     directory you're in.
3. Go to the package that you're interested in: `cd packages/whatever`
4. In the package folder, you MAY want to install the dependencies manually:
   `npm install`. This happens on certain packages where the lerna bootstrap
   sometimes doesn't install Node modules as required. (Happens to me with
   `app-project`.)
5. If the package is an app, you'll probably want to run it: `npm run dev`
6. If the package is a library, you'll probably want to build it:
   `npm run build`
7. If you still can't run the package, you MAY need to manually build local dependencies (see Troubleshooting below).

## Troubleshooting: Installing & Running Packages

**Issue 1:** During installation or bootstrap, can't install a dependency (which is a local package)

- Occurs when running `lerna bootstrap` anywhere, or running `npm install` at
  the package level.

Example error message:
```
lerna ERR! npm install exited 1 in '@zooniverse/react-components'
lerna ERR! npm install stderr:
npm ERR! code E404
npm ERR! 404 Not Found: @zooniverse/grommet-theme@2.0.0
```

Analysis:
- This happens because Package A (react-components) requires Package B
  (grommet-theme), and in this case, Package B needs to be **built** first
  before Package A can use it.

Solution:
- Build Package B first, e.g.: `cd packages/grommet-theme ; npm install ; npm run build`
- Run `lerna link` to 'register' the newly built package.
- _Optional/untested: Then run `lerna bootstrap` again._


**Issue 2:** can't run installed dependency

- Occurs when running `npm run dev` or similar script from within a package.

Example error message:
```
lib-classifier$ npm run _check

> @zooniverse/classifier@0.0.1 _check /Users/shaun/projects/front-end-monorepo/packages/lib-classifier
> check-dependencies

sh: check-dependencies: command not found
npm ERR! file sh
npm ERR! code ELIFECYCLE
npm ERR! errno ENOENT
npm ERR! syscall spawn
npm ERR! @zooniverse/classifier@0.0.1 _check: `check-dependencies`
npm ERR! spawn ENOENT
npm ERR! 
npm ERR! Failed at the @zooniverse/classifier@0.0.1 _check script.
```

Analysis
- This is a bizarre error that occurs when npm scripts can't run certain
  dependencies, despite the fact that the dependency has been downloaded.
  (e.g. by running `npm ls check-dependencies` or looking inside the package's
  node_modules folder.)
- There's 

Solution:
- Remove the package's dependencies and reinstall them via bootstrap.
- Remove the package's node_modules: `cd packages/your-package; rm -fr node_modules`
- Re-run bootstrap: `lerna bootstrap`


**Issue 3:** inexplicable error messages

Analysis:
- You ran into a general problem. It... it happens. Cover your bases by running
  the following _"I dunno but let's see what happens"_ solutions!

Solutions:
- Did you install `lerna` globally? Install it by running `npm install -g lerna`
- Did you update `lerna` recently? Update it by running `npm install -g lerna` (Sanity check: `lerna 3.4.3` works for the monorepo's Oct 2018 build)
- Maybe when you ran `lerna bootstrap`, it's possible that something went wrong and **packages that are supposed to be dependencies of each other aren't symlinked properly.**
  - To force this, run `lerna link` before running `lerna bootstrap`

## War Stories

Installing the monorepo will likely lead to different experiences for everyone.

The following tracks Shaun's 8th attempt.

```
$ git clone git@github.com:zooniverse/front-end-monorepo.git
$ cd front-end-monorepo
$ lerna bootstrap
=> ERROR: in zooniverse/react-components, 404 Not Found zooniverse/grommet-theme@2.0.0

$ cd packages/lib-grommet-theme
$ npm install
$ npm run build
$ lerna link
//At this point we can already run app-project. i.e. cd ../app-project ; npm run dev
=> SUCCESS!

$ cd ../lib-react-components/
$ npm install
$ npm run build
$ lerna link
=> SUCCESS, I THINK

$ cd ../lib-classifier
//Here, there is an issue with the dependencies in the lib-classifier package.
$ npm run _check
=> ERROR: in zooniverse/classifier@0.0.1 _check script, "check-dependencies" command not found.
//The solution is to remove the node_modules directory and running lerna bootstrap again.
$ rm -fr node_modules
$ lerna bootstrap
=> SUCCESS
//We can now run the lib-classifier properly using `npm run dev`
```
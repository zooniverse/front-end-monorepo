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

If following the README.md leads to installation issues for you, the following
steps work for a clean install. (Tested OK, as of commit
[8af52c3](https://github.com/zooniverse/front-end-monorepo/commit/8af52c3770b86c807c7c8bab9ec21c821ea7661f))

```
$ git clone git@github.com:zooniverse/front-end-monorepo.git
$ cd front-end-monorepo

//First, build grommet-theme, because it's used by react-components.
$ lerna bootstrap --scope=@zooniverse/grommet-theme
$ cd packages/lib-grommet-theme/
$ npm run build
$ lerna link
//Lerna link is required after building a package whose compiled version is required by other packages

//Next, bootstrap react-components, because IIRC, it's used by another package.
$ cd ../lib-react-components/
$ lerna bootstrap --scope=@zooniverse/react-components

//Finally, install bootstrap all the packages.
$ cd ../..
$ lerna bootstrap

//Done! All packages should be successfully built.
```

Basically, the rules of thumb are:
- always bootstrap/build the packages that others depend on first,
- use `lerna bootstrap --scope=...` to target specific packages,
- and always remember to run `lerna link` if you manually run `npm run build`

## Troubleshooting: Installing & Running Packages

### Issue 1: can't install a dependency (which is a local package)

Usually occurs when running `lerna bootstrap` immediately after a clean install.

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
- Build Package B first, e.g.:
  - `cd packages/grommet-theme`
  - `lerna bootstrap --scope=@zooniverse/grommet-theme`
  - `npm run build`
- Run `lerna link` to 'register' the newly built package.

### Issue 2: when running script, can't find installed dependency

Occurs when running `npm run dev` or similar script from within a package.
Despite the fact that the dependencies are clearly installed in the package's
`/node_modules/`, they're not being registered.

Example error message:
```
$ cd packages/lib-classifier
$ npm run _check

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
- Did you try installing dependecies for the package `npm install`?
- **Do NOT use** `npm install`. This tends to break all sorts of links between
  the packages.

Solution:
- Instead of using `npm install`, install the dependencies for the package using
  `lerna bootstrap --scope=my-package`
  - If necessary, remove the package's existing `node_modules` first.
- If necessary, re-run `lerna bootstrap` to re-establish the links
  between all packages.

### Issue 3: system lag or memory leak during/after `lerna bootstrap`

During, or shortly after, running `lerna bootstrap`, you might encounter bizarre
situations where the computer starts lagging, or running a script results in
unexpected errors that talks about "overflows" or "too many files open at once"
or "out of memory".

Example error message:
```
$ cd packages/lib-classifier/
$ npm run dev
=> FAILURE: Error: ENFILE: file table overflow, open '/Users/shaun/.nvm/versions/node/v8.2.1/lib/node_modules/npm/node_modules/update-notifier/node_modules/import-lazy/index.js'
```

Analysis:
- Yeah... this sort of thing happens randomly, but not so rarely that it's not
  worth noting.
- It's nothing to do with the Monorepo code, it's just a quirk of the computer.

Solution:
- Try again after 30 seconds
- Restart your computer

I wish I was kidding.

### Issue 4: other inexplicable error messages

Analysis:
- You ran into a general problem. It... it happens. Cover your bases by running
  the following _"I dunno but let's see what happens"_ solutions!

Solutions9?):
- Did you install `lerna` globally? Install it by running `npm install -g lerna`
- Did you update `lerna` recently? Update it by running `npm install -g lerna` (Sanity check: `lerna 3.4.3` works for the monorepo's Oct 2018 build)

## Notes 

### Building only one Package

Running `lerna boostrap` will attempt to install dependencies for and build all
packages in the project. This can be a problem if one package requires another
to be built first.

To build _one specific_ package, use `--scope`, e.g.
`lerna bootstrap --scope=@zooniverse/grommet-theme`

### Switching directories before running `lerna bootstrap`

The README.MD suggests that you `cd` to the directory of the package that you
want before running `lerna bootstrap`. I'm not sure if this actually does
anything, asides from (possibly) changing the order in which packages are
bootstrapped.

If you want to build only one package, look at the entry above: "Building only
one Package".

### Switching between Branches

When switching between branches that use _different/new dependencies,_ remember
to run `lerna bootstrap` to install those dependencies.

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

The following tracks Shaun's 9th attempt.

```
$ git clone git@github.com:zooniverse/front-end-monorepo.git
$ cd front-end-monorepo

//Build grommet-theme first, because it's used by react-components.
$ lerna bootstrap --scope=@zooniverse/grommet-theme
$ cd packages/lib-grommet-theme/
$ npm run build
=> SUCCESS

//Bootstrap react-components, because IIRC, it's used by another package.
$ cd ../lib-react-components/
$ lerna bootstrap --scope=@zooniverse/react-components
=> FAILURE: npm ERR! 404 Not Found: @zooniverse/grommet-theme@2.0.0

//Whoops try again. Looks like we need to 'lerna link' after building 'grommet-theme'.
$ lerna link
//Note: lerna link doesn't seem to accept arguments like '@zooniverse/grommet-theme' or 'grommet-theme'
$ lerna bootstrap --scope=@zooniverse/react-components
=> SUCCESS

//Back to the root directory, then install everything.
$ cd ../..
$lerna bootstrap
=> SUCCESS
```

The following tracks Shaun's 10th attempt.

```
$ git clone git@github.com:zooniverse/front-end-monorepo.git
$ cd front-end-monorepo

//Build grommet-theme first, because it's used by react-components.
$ lerna bootstrap --scope=@zooniverse/grommet-theme
$ cd packages/lib-grommet-theme/
$ npm run build
$ lerna link
//Lerna link is required after building a package whose compiled version is required by other packages
=> SUCCESS

//Bootstrap react-components, because IIRC, it's used by another package.
$ cd ../lib-react-components/
$ lerna bootstrap --scope=@zooniverse/react-components
=> SUCCESS

//Back to the root directory, then install everything.
$ cd ../..
$ lerna bootstrap
=> SUCCESS
```

OK, looks like we've got a winner.

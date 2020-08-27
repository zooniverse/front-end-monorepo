# Simple Dropdown Task

The Simple Dropdown Task for the Classifier is exactly what it says on the tin.

- The simplest form of the Dropdown Task allows users to make annotations by choosing from a range of pre-set options from a dropdown list.

## Context/History

- The Simple Dropdown Task was built for the monorepo for the Engaging the Crowds project in 2020. (dev: Shaun; project management: Sam, Grant; design: Becky)
- The Simple Dropdown (type: `dropdown-simple`) is separate from the classic PFE Dropdown (type: `dropdown`), and is considered a refinement from the initial PFE implementation.
  - See discussions at https://github.com/zooniverse/front-end-monorepo/pull/1767 and https://github.com/zooniverse/front-end-monorepo/issues/1679 for details of the split.

## Dev Notes

**"Other" option** - Aug 2020

- The simple dropdown has an "Other" option (aka "let users type in free answers") has been built, but has been _artificially disabled._
- The reasons: 1. we want to encourage project owners to use Dropdown Tasks in a specific way (i.e. just a plain simple dropdown with no free answers) and 2. the [aggregation code gets funky when there are free answers(??)](https://github.com/zooniverse/caesar/issues/841)

If we need to enable the "Other" option in the future, please look at `components/DdSelect.js` and change the line that says `const ENABLE_OTHER_OPTION = false` to `true`.


## Data Models

Simple Dropdown task data structure, example:

```
"T0":{
  "help":"",
  "type":"dropdown-simple",
  "options":[
    "Red",
    "Blue",
    ...
  ],
  "required":false,
  "allowCreate":false,
  "instruction":"Choose your favourite colour"
}
```

Simple Dropdown annotation (classification) data structure, example:

```
{
  "task":"T0",
  "value": {
    "value": 1,  // Corresponds to "Blue"
    "option":true
  }
}
```

NOTE: if a simple dropdown has no value selected (as is the case when initially rendered), the annotation value is null.

```
{
  "task":"T0",
  "value": null,  // No value selected
}
```

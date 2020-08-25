# Dropdown Task

The Dropdown Task for the Classifier is exactly what it says on the tin.

- The simplest form of the Dropdown Task allows users to make annotations by choosing from a range of pre-set options from a dropdown list.
- ~~Dropdowns can have the option for an "Other" choice, allowing a user to type in any value they want. (i.e. functioning as a Text Task.)~~ See _No "Other" option,_ below.
- An advanced (if unimplemented as of 2020) feature would allow dropdowns to be "chained" together to create a cascade of choices. e.g. Country > State (filtered by Country) > City (filtered by State)

## Dev Notes

**No "Other" option** - Aug 2020

- As of the Engaging Crowds project (Aug 2020), the "Other" option (aka "let users type in free answers") has been built, but has been _artificially disabled._
- The reasons: 1. we want to encourage project owners to use Dropdown Tasks in a specific way (i.e. just a plain simple dropdown with no free answers) and 2. the [aggregation code gets funky when there are free answers(??)](https://github.com/zooniverse/caesar/issues/841)
- Please see [the original PR that added this Dropdown component for Engaging Crowds](https://github.com/zooniverse/front-end-monorepo/pull/1750) and [the associated issue .](https://github.com/zooniverse/front-end-monorepo/issues/1751)

We may consider re-enabling the "Other" option again in the future, if/when we want to migrate all PFE projects to the monorepo while maintaining feature parity. Should this day come, please look at `components/DdSelect.js` and change the line that says `const ENABLE_OTHER_OPTION = false` to `true`.

## Context/History

- The Dropdown Task was (re)built for the monorepo for the Engaging the Crowds project in 2020. (dev: Shaun; project management: Sam, Grant; design: Becky)
- The original PFE version heavily feature the "cascading dropdown" feature.
- As of Jun-Aug 2020, there have been discussions (see https://github.com/zooniverse/front-end-monorepo/issues/1679) that the Dropdown Task could be split into "simple dropdowns" and "cascading dropdowns"

## Data Models

As of Aug 2020, the Dropdown Task and Annotation models follow the classic data models used in PFE - this is mostly for backwards compatibility with the PFE Project Builder.

Dropdown task data structure (simple single dropdown per task/non-cascading selection!), example:

```
"T0":{
   "help":"",
   "next":"T1",
   "type":"dropdown",
   "selects":[
      {
         "id":"070b610fbf5d9",
         "title":"Alignment",
         "options":{
            "*":[
               {
                  "label":"Lawful Good",
                  "value":"4beef18e9baa"
               },
               {
                  "label":"True Neutral",
                  "value":"db939237aa00f"
               },
               {
                  "label":"Chaotic Evil",
                  "value":"fedae0dd4f96d"
               }
            ]
         },
         "required":false,
         "allowCreate":true
      }
   ],
   "instruction":"Dropdown with an 'OTHER' choice - type whatever!"
},
"T1":{
   "help":"",
   "type":"dropdown",
   "selects":[
      {
         "id":"dbd3d991fcd9e",
         "title":"Colour",
         "options":{
            "*":[
               {
                  "label":"Red",
                  "value":"7fda9846fd624"
               },
               {
                  "label":"Yellow",
                  "value":"a2c9fbc881d7a"
               },
               {
                  "label":"Green",
                  "value":"baf1ae42d766f"
               },
               {
                  "label":"Blue",
                  "value":"6d13daea5706a"
               }
            ]
         },
         "required":true,
         "allowCreate":false
      }
   ],
   "instruction":"Dropdown with limited choices"
}
```

Dropdown annotation (classification) data structure, example:

```
"annotations":[
    {
       "task":"T0",
       "value":[
          {
             "value":"THIS IS A FREE ANSWER",  // (assuming someone set ENABLE_OTHER_OPTION=true in the DdSelect.js code)
             "option":false
          }
       ]
    },
    {
       "task":"T1",
       "value":[
          {
             "value":"baf1ae42d766f",
             "option":true
          }
       ]
    }
 ]
```

## Advanced - Cascading Dropdown Task

BEWARE, here be dragons.

Dropdown task data structure (cascading), example:

```
"T0": {
    "help": "",
    "type": "dropdown",
    "selects": [
        {
            "id": "e6648d9524038",
            "title": "Country",
            "options": {
                "*": [
                    {
                        "label": "UK",
                        "value": "8d2b49f2ab18a"
                    },
                    {
                        "label": "USA",
                        "value": "a893ad87b8b8c"
                    },
                    {
                        "label": "Japan",
                        "value": "cc8773d27f0aa"
                    }
                ]
            },
            "required": true,
            "allowCreate": false
        },
        {
            "id": "d6697219c5d3a",
            "title": "City",
            "options": {
                "8d2b49f2ab18a": [
                    {
                        "label": "London",
                        "value": "80623599d84d1"
                    },
                    {
                        "label": "Oxford",
                        "value": "44784c24e641"
                    },
                    {
                        "label": "Birmingham",
                        "value": "f7b67c6758cf8"
                    }
                ],
                "a893ad87b8b8c": [
                    {
                        "label": "Chicago",
                        "value": "78ca14613967c"
                    },
                    {
                        "label": "Minneapolis",
                        "value": "225c8911a4db3"
                    },
                    {
                        "label": "Washington",
                        "value": "85c4b3bea4071"
                    }
                ],
                "cc8773d27f0aa": [
                    {
                        "label": "Tokyo",
                        "value": "7f2981b163d1e"
                    },
                    {
                        "label": "Osaka",
                        "value": "3886cd84d705c"
                    },
                    {
                        "label": "Kyoto",
                        "value": "e50ca74547915"
                    }
                ]
            },
            "required": false,
            "condition": "e6648d9524038",
            "allowCreate": true
        }
    ],
    "instruction": "Where did this character come form?"
}
```

Dropdown annotation (classification) data structure, example:

```
"annotations":[
  {
    task: "T0",
    value: [
      {
        value: "a893ad87b8b8c",  // USA
        option: true
      },
      {
        value: "78ca14613967c",  // Chicago
        option: true
      }
    ]
  }
]
```


Some observations about implementation in PFE:

- When we have a cascading dropdown task like the example above, both a `<select>` for Country and a `<select>` for City appear.
- If City depends on Country, but the selected Country has no valid Cities to list, (either because 1. no Country was selected, 2. the Country has no Cities associated with it, or 3. the Country allowed free text entry and the user typed in something ridiculous like "The Lost Continent of Atlantis") the the City's `<select>` will be disabled with a "N/A" text.
- (!!!) Exception: if the Country allows free text entry, the user can ALWAYS type in any answer.
- If a dropdown had no answer selected for any reason, the annotation value will be `{value: null, option: false}`

The important thing to note here is the exception. If we start to support free text entry, we need to seriously consider the UI what to do when a _dependent dropdown_ allows free text.

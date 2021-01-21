# ADR 30: Simple Dropdown Task

## Status
 
Accepted

## Context
 
The Engaging Crowds project (UK collaboration with The National Archives, Royal Museum Greenwich, Royal Botanical Gardens Edinburgh) involves building an indexing tool to examine levels of user engagement and agency. The indexing tool will be built on the new classifier in the front-end monorepo (FEM). This tool will allow volunteers to select a subject-set or a subject to classify on. All 3 Project Builder projects being built to test the use of the indexing tool will require Dropdown tasks. The Dropdown task is not currently in the Front-end monorepo. We have two options to support the requirements  of these projects: using the existing dropdown task available in Panoptes-Front-End (PFE), the legacy single-page front-end app and build the new indexing tool in the classifier in the FEM or build both the dropdown task and the indexing tool in the FEM. Building the dropdown task in the new classifier in the FEM is something we need to do eventually anyway and we have the opportunity to evaluate how the existing dropdown task functions and how we may want to change it. 

Known issues for the dropdown task in PFE include:

- Long selection lists, particularly if there are multiple for cascading select options, can create massive task objects on the workflow resource resulting in slow loading and browser performance and slow exports.
- The annotations are machine readable unique identifier strings to support cascading dropdowns. Machine readable annotations make analyzing the post-classification extraction and aggregation more complicated, particularly because of workflow versioning and translations. Caesar does not store the workflow task contents and so project owners have to reference the original workflow task by version in an export to get meaningful aggregations for actual study. 
- The dropdown task also allows for user submitted values which essentially adds in a text task into the dropdown task. The annotation includes a boolean which, if false, lets the aggregation code know that this annotation should no longer aggregate as a dropdown task, but as a text task.

### Sample task and annotation JSON from PFE dropdown task

**PFE dropdown task structure**

``` json
{ 
  "T0":{
    "help":"",
    "next":"T1",
    "type":"dropdown",
    "selects":[
      {
        "id":"070b610fbf5d9",
        "title":"Favourite colour",
        "options":{
          "*":[
            {
              "label":"Red",
              "value":"hashed-value-R"
            }
          ]
        },
        "required":false,
        "allowCreate":false
      }
    ],
    "instruction":"Choose your favourite things"
  }
}
```

**PFE dropdown task annotation structure**

```json
{
  "annotations":[
    {
      "task":"T0",
      "value":[
        {
          "value":"hashed-value-R",
          "option":true
        }
      ]
    }
  ]
}
```

**PFE dropdown task translation strings**

```json
{
  "tasks.T0.help": "Pick a colour from the menu.",
  "tasks.T0.instruction": "Choose your favourite things.",
  "tasks.T0.selects.*.title": "Favourite colour",
  "tasks.T0.selects.0.options.*.0.label": "Red",
  "tasks.T0.selects.0.options.*.1.label": "Blue"
}
```
## Decision
 
We will develop a simplified dropdown task in the new classifier in the FEM. Creating a simple dropdown task contains the following functionality:

- Limited dropdown list options of a minimum (4) and of a maximum (20) number of options (justification: if less than 4, this can be a single choice task using radio buttons)
- No cascading, dependencies, or effect on other select inputs
- No free-text entry on the dropdown. It will be recommended to project builders use the new [workflow steps](https://github.com/zooniverse/front-end-monorepo/blob/master/docs/arch/adr-05.md) feature to have a dropdown task and text task in a single step.

More complex dropdown tasks will be built in the future as separate task types based on analysis of actual usage in PFE. These will include:

- Cascading dropdowns for
  - Locations
  - Custom (TBD)
- Date picker
  - Possibly a text input with validation rather than dropdowns
- Asynchronous loading long lists by text input search

### Proposed task and annotation JSON structure examples

**Task**
``` json
{
  "T0":{
    "help": "",
    "type": "dropdown-simple",
    "options":[
      "Red",
      "Blue",
      "Green",
      "Yellow"
    ],
    "required": false,
    "allowCreate": false,
    "instruction": "Choose your favourite colour"
  }
}
```

**Annotation**
```json
{
  "annotations": [
    {
      "task":"T0",
      "value": {
        "value": 1,
        "option": true
      }
    }
  ]
}
```

## Consequences
 

Theses decisions allow for these improvements:

- Project owners will have the actual index of the values selected from the dropdown task in either the raw classification or aggregation exports. This is just like the single choice task.
- The aggregation code won’t have to dynamically choose what kind of aggregation to perform since the task type will be solely dropdown and not a combination of dropdown and text entry.
- Min and max options allow us to avoid performance and load issues.

However these decisions have impact on building the task in the lab and may mean dev time in the future:

- If an option isn’t on the dropdown list, then the research team will need to include a separate text task in the workflow step. Note that the team has the possibility to add the word “Other” to the options list if they like, but a blank entry can serve this purpose as well. We can reevaluate this decision with more data on actual usage of the "option" feature in PFE and with feedback from project builders. To this end, the task and annotation structure will keep the `option` in the annotation and `allowCreate` in the task properties for now in case the feedback is overwhelmingly that project builders really need this configurability. 
- Dates will need to be set up manually, e.g. free-text for Day, researcher-generated list of months for Month. Note that for Engaging Crowds project #1, each subject set will cover the same year, so that info should already be in the subject metadata. In the future, we will develop some kind of date input task, but it won’t be available for the initial Engaging Crowds effort.
- Generally project owners using the PFE dropdown task will need to migrate to one of the new options, and thus there will not be backwards compatibility with the PFE version.
- The updated task type will need an updated editor in the lab.
- The updated task type may need new translatable fields defined for workflows in Panoptes.

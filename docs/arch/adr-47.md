# ADR 47: Highlighter Task

1 Mar 2023

## Context
To support OCR verification (the DigiLeap project), with subjects that consist of an image and OCR output as text file, we will create a highlighter task. The highlighter task will allow volunteers to highlight text in the OCR output with a label or labels defined by researchers.

The FEM highlighter task is an iteration on the [PFE highlighter task](https://github.com/zooniverse/Panoptes-Front-End/tree/master/app/classifier/tasks/highlighter).

## Features
To use the highlighter task a volunteer selects a label from the task area, highlights the related text in the text subject viewer, then selects a different label from the task area to highlight additional text in the text subject viewer or completes the task. Highlighted text can be unhighlighted.

The highlighter task label(s) description and color is defined by researchers.

The following is an example of a highlighter task annotation with labels "Scientific Name", "Collector Name", "Habitat", and "Location":
```json
{
  "value": [
    {
      "labelInformation": {
          "color": "#00FF7F",
          "label": "Scientific Name"
      },
      "start": 25,
      "end": 55,
      "text": "Allium vineale L.(Fieldgarlic)"
    },
    {
      "labelInformation": {
          "color": "#F5D76E",
          "label": "Collector Name"
      },
      "start": 402,
      "end": 422,
      "text": "Derick B. Poindexter"
    },
    {
      "labelInformation": {
          "color": "#ffa539",
          "label": "Habitat"
      },
      "start": 207,
      "end": 324,
      "text": "Growing at the base of\nthe mountain, in wet meadow and adjacent trail margins Infrequent, exotic perennial\nforb/herb."
    },
    {
      "labelInformation": {
          "color": "#DCC6E0",
          "label": "Location"
      },
      "start": 105,
      "end": 206,
      "text": "Located at Sheep Rock along Air\nBellows Gap Rd. (SR 1130) ca. 0.1 mi prior to Pruitt Rd. on the left."
    }
  ],
  "task": "T0",
  "taskType": "highlighter"
}
```

## Decision
Create a highlighter task in FEM.

## Consequences
Create an experimental task, the highlighter task, in FEM.
If a workflow uses the highlighter task, add event listeners to the text subject viewer.

## Status
Proposed

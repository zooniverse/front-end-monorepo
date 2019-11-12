# ADR 20: Transcription Task

Created: November 12, 2019

## Context

ILMS funded us to experiment with transcription tools. The project [Anti-Slavery Manuscripts](https://www.antislaverymanuscripts.org/classify) has a workflow where volunteers transcribe lines of text first by marking the line, then adding the transcription in a sub-task. This task is slightly unique in that:

- Incomplete classifications can be submitted
- Previous transcriptions from caesar are loaded and presented as an option in the sub-task
  - volunteers can select the previous transcription, edit it, and submit a new transcription
  - lines with previous transcriptions or retired lines are displayed visually by color

## Decision

We will be porting the ASM functionality to the main classifier as a new transcription task. The task will be composite of:

- A drawing line task that is created by two pointer down and up events to mark the points of the line.
  - the starting point and ending point will have visual indicators.
  - Note that ASM leveraged a hacked polygon tool to do this, but we should have a line tool variant specifically for this instead. Downstream aggregation can leverage polygon type aggregations if it fits.
- A sub-task will display once the transcription line mark is made
  - a datalist input will display showing the previous caesar aggregations
  - sub-task will not be a modal

[More detailed user stores are in this google doc](https://docs.google.com/document/d/16abI-wkRlEXsWgACfFQVqwO76aEopohIjQiRfNQKWiw/edit)

## Status

Proposed

## Consequences

- The transcription line mark is a different user interaction than the standard line mark. The standard line is a dragging interaction rather than two clicks.
- The workflow lab editor will need a task option for "transcription task" which will auto-configure it with the drawing task with sub-task described in the decision
- Can the [HTML datalist element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) be used? If not, then we might want to consider a text input and a separate dropdown of available Caesar aggregations. 


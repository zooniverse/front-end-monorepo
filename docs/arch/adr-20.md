# ADR 20: Transcription Task

Created: November 12, 2019

## Context

IMLS funded us to experiment with transcription tools. The project [Anti-Slavery Manuscripts](https://www.antislaverymanuscripts.org/classify) has a workflow where volunteers transcribe lines of text first by marking the line, then adding the transcription in a sub-task. This task is slightly unique in that:

- Incomplete classifications can be submitted
- Previous transcriptions from caesar are loaded and presented as an option in the sub-task
  - volunteers can select the previous transcription, edit it, and submit a new transcription
  - lines with previous transcriptions or retired lines are displayed visually by color

## Decision

We will be porting the ASM functionality to the main classifier as a new transcription task. The task will be composite of:

- A drawing line task for transcription that is created by two pointer down and up events to mark the points of the line.
  - the starting point and ending point will have visual indicators communicating the direction of creation.
  - the line color will indicate the current status of completion
  - completed lines cannot be edited
  - Note that ASM leveraged a hacked polygon tool to do this, but we should have a line tool variant specifically for this instead. Downstream aggregation can leverage polygon type aggregations if it fits.
- A sub-task will display once the transcription line mark is made
  - a text input will display suggestions from previous caesar aggregations.
    - The suggestions can be selected and inserted as an editable value in the text input
    - Grommet's [TextInput](https://storybook.grommet.io/?path=/story/textinput--suggestions) with the suggestions prop will be utilized so that it can be styleable with our theme.
  - sub-task will not be a modal, but a movable div linked to the currently selected line mark

[More detailed user stores are in this google doc](https://docs.google.com/document/d/16abI-wkRlEXsWgACfFQVqwO76aEopohIjQiRfNQKWiw/edit)

## Status

Proposed

## Consequences

- The transcription line mark is a different user interaction than the standard line mark. The standard line is a dragging interaction rather than two clicks.
- The workflow lab editor will need a task option for "transcription task" which will auto-configure it with the drawing task with sub-task described in the decision

Open questions:

- How will cross-writing, where the writer might've rotated the page to begin writing again, be handled?
- How will a line of text left to right be distinguished from one rotated 90 degrees and written again?
- How will left-to-right lines of text be distinguished from right-to-left?

We are planning on having visual indication via the style of the SVG dots at the end of the line to indicate directionality, but this is not recorded in the annotation. Adding rotation and line direction as drawn in the annotation could be used for downstream aggregation to alleviate these questions. We will check with @CKrawczyk and update this proposal when an annotation format is agreed upon for this. We can deviate in the annotation model from a standard line drawing plus text task sub-task since this will be a new 'transcription' task in the models. 


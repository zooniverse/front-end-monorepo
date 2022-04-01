# ADR 43: TextFromSubject Task

11 March 2022

## Context
To support OCR verification (the DigiLeap project), with subjects that consist of an image and OCR output as text file, we need to create a text task that initially includes the OCR output in the text input for a volunteer to then edit as appropriate.

## Decision
Create a text task (the TextFromSubject task) that is disabled until the text subject loads its content and initializes the text task annotation value with the text subject content. Once the text task annotation value is initialized with the text subject content then a volunteer can edit the annotation value similar to existing text tasks.

## Status
Proposed

## Consequences
Create a text task (the TextFromSubject task) that initializes the annotation value from a text subject's content.

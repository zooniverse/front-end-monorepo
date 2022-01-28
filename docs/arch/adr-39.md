# ADR 39: Text subject viewer

10 December 2021

## Context
We should support subjects that are text in the FEM. PFE supports subjects that are text with the [text-viewer](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/components/file-viewer/text-viewer.jsx). The supported file type is "text" and supported format is "plain". The text displayed is selectable.

The FEM text viewer will be used to support a project researching OCR verification (the DigiLeap project), with subjects that consist of an image and OCR output as text file.

## Decision
Create a text subject viewer. The FEM text subject viewer will be similar to the PFE [text-viewer](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/components/file-viewer/text-viewer.jsx), supporting a file type of "text" and format of "plain", with the text displayed selectable.

## Status
Accepted

## Consequences
Create a text subject viewer.

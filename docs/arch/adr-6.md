# ADR 6: Organizing translations to be volunteer and dev friendly

August 7, 2018

## Context

We need internationalization support for the new app-project, lib-classifier, and any other libraries that will have volunteer facing content. We should decide on an organizational structure that makes it easy for both translation volunteers and Zooniverse developers to maintain. Currently translation locale files exist in a single folder in projects like Panoptes-Front-End that support translations. The development convention we've adopted for the rewrite, however, would have the locale files in the same folder of each component.

@eatyourgreens notes:

> Volunteers have always found it confusing that they have to add new files to [zooniverse-readymade](https://github.com/zooniverse/zooniverse-readymade) and [zooniverse](https://github.com/zooniverse/Zooniverse) in order to add a new language to Penguin Watch. I'd rather avoid that for whoever manages the translations for this repo.

## Decision

We have a few proposed options: 

- A `lib-locales` library that has all of the locale files for the strings. Could be a single file or a directory of folders and files. The library could be imported into the other libs or apps where needed.
- Larger locale files quickly get unwieldy to edit, and hard to find errors in. Moving them into one place reduces the portability of components. We could write a couple of scripts to bundle up locale files for our translators, and split them out again afterwards [back into their component folders in each library].

## Status

Proposed

## Consequences

We've already begun some development where locale files have been added in their individual component folders. Changing the organizational structure would involve some development time, though not major. This should be decided sooner than later to minimize time impact. 
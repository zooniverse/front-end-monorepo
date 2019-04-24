# ADR 14: Using an external CMS for content pages

Created: April 24, 2019

## Context

The static content on the Zooniverse (notably, the About, Publications, and Team pages on [PFE](https://github.com/zooniverse/Panoptes-Front-End/)) has traditionally been [baked](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/locales/en.js) [into](https://github.com/zooniverse/Panoptes-Front-End/blob/master/app/lib/publications.js) the front end code.

While this works, it creates maintenance issues: to update the list of publications, for example, requires someone to dig through the code to find and modify the correct JSON file, and then create a pull request on GitHub. To do so for multiple publications becomes a long and tedious process. 

Additionally, JSON is fragile - a missing (or extra) comma can break the build.

As a result, we're considering using a content management system (CMS) that would allow us to more easily maintain our static content.

These are the options we have:

1. Continue to hard code content into the front end code
2. Create our own CMS to manage our content
3. Install a third party CMS into one of our servers
4. Use an online third party CMS

## Decision

We've decided to use [Contentful](https://www.contentful.com/), an online third party CMS, to host our content. (Or at least, part of our content, such as the often-changing Publications page.) There will be two users registered: one admin account with full access to the Content Model editor _and_ content, and an editor account for day-to-day use which only has content editing access.

**Reasons for choosing Contentful**

- [@rogerhutchings](https://github.com/rogerhutchings) has used it for projects in the past
- It has a free tier
- It has a well-documented API
- It has an excellent admin interface for editing content and models
- It's one of the larger hosted CMS offerings, meaning it's less likely to disappear overnight

**Pros**

- CMS makes content management easier and updates faster, especially for non-developers.
- External platform reduces the need for any sort of code maintenance.
- We can run our Zooniverse content on the Free Tier (see [Note of Caution 3: Database Limits](#note-of-caution-3-database-limits))

**Cons**

- Reliance on external platfrom for storing data introduces the usual third-party risks. (See [Note of Caution 1: Exit Strategy](#note-of-caution-1-exit-strategy)) Possible dangers include:
  - external CMS has downtime, shutting down our content by extension.
  - external CMS changes pricing structure, forcing us out of the free tier.
  - external CMS shuts down, forcing us to find an alternative data store.
- We need to maintain an admin account. (Shouldn't be a worry as long as we have Passbolt.)

## Status

Accepted

## Consequences

Using Contentful will make managing our content much easier and reduce the amount of code maintenance we need to worry about.

The most immediate concern is that **we have set up a Contentful "Space" (i.e. content database) for the Zooniverse, and the admin account login details are available on our Zooniverse Passbolt.** (Note: the admin account is currently registered under Roger's ownership.)

Despite the positives, there are a few potential issues that we should make notes of. (See [@shaun.a.noordin](https://github.com/shaunanoordin) and his experiences with the Carto map database.)

### Note of Caution 1: Exit Strategy

We need a plan to move critical information out of our current external CMS _in case_ we (or _for when_ we) decide to stop using Contentful. (e.g. if the platform shuts down)

Currently, the most viable exit strategy is to use the [export function of the Contentful CLI](https://www.contentful.com/developers/docs/tutorials/general/import-and-export/), though we still need to verify that it's working as intended.

Questions that need to be answered for any exit strategy:
- How easy & fast is it export data out of the current data store?
- How complete is the data export? (e.g. does it include all the text content, the media files, and the architecture/data structures?)
- How easy & fast is it to import data into a backup data store?
- Do we have a choice for a backup data store? (Answer: yes, fallback is we hardcode it into the front end code.)
- How confident are we that we can perform an export, and how often do we need to do so? (e.g. there's no point having a thorough plan to export all of the data, if the reason you need to do so is that the CMS server is being DDOSed and _can't be accessed._ )

Optional: create a backup plan that automates the export process, ensuring we have a local backup every few weeks. @rogerhutchings has some scripts for this as part of [#763](https://github.com/zooniverse/front-end-monorepo/issues/763)

### Note of Caution 2: Implicit Data Structures

In addition to knowing what kind of data (content such as team members, publications, etc) we have, we need to be aware of the _data structure_ of that content. (e.g. the name/role/bio fields of an entry in the Team category)

Currently, the data structure is defined within Contentful, and our front end code _implicitly_ expects a certain kind of data structure for each type of content.

**This means that changing the data structure can break parts of our front end** if we're not careful - anyone accessing the Contentful admin needs to be aware of this, e.g. when changing the fields in a category. 

### Note of Caution 3: Database Limits

As of the time of writing, we can create a _[free](https://www.contentfulcommunity.com/t/query-about-spaces-pricing/1316)_ Contentful "database" (note: the nomenclature here is that a "Contentful Space" is equivalent to a "Wordpress-like database of entries") at the "Micro Tier".

The Micro Tier currently allows us to create a total of 5000 database entries - including individual Publications and Team members - and that should be sufficient for our needs for the foreseeable future. Should this change - e.g. we start, or we start having way more Publications - then we need to revisit our decision to use Contentful.

### Misc Considerations 

- As of the time of writing, we haven't fully married ourselves to using Contentful, and may change CMS platforms at a future date if a more better option comes up.

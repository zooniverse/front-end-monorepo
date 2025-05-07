# AllProjects

## UI Decision

The components in this folder build a classic pagination UI. Projects get filtered out of a page when a user did not make classifications (`/project_preferences`) or a project is private (`/projects`). This means the UI is designed for `PAGE_SIZE`, but a couple of ProjectCards might be missing even though Pagination hasn't reached the last page. This is an intentional UI tradeoff.

An infinite scroll UI with a 'Load More' button and `useSWRInfinite` was considered, but panoptes and ERAS API limitations prevent that strategy. ERAS does not have pagination capabilities. Panoptes `/api/projects` can be passed a string of multiple project ids, but if the query's `page_size` is smaller than the number of project ids, the `projects` response is in an unpredictable order. The response does not respect the order of project ids passed in the query.

## Components

### AllProjectsByCount

Used in:
- Individual users' stats page such as `/users/[login]/stats/projects`
- Group stats page such as `/groups/[groupId]/projects`

Features:
- Takes `projectContributions` and fetches more info about each project via panoptes `api/projects`
- Attaches project data to each "contribution" in the `projectContributions` array

### AllProjectsByRecent

Used in:
- Individual users' stats page such as `/users/[login]/stats/projects`

Features:
- Fetches `/project_preferences` based on PAGE_SIZE
- Fetches more info about each project via panoptes `/api/projects`
- Takes a `projectContributions` array
- Attaches a `count` from `projectContributions` array to each project SORTED BY the original `/project_preferences` array order

### AllProjects

Used in:
- AllProjectsByCount
- AllProjectsByRecent

Features
- Displays ProjectCards in a classic pagination UI
- Has a nav for pagination via Grommet's Pagination component

## Notes on Tests and Storybook

MSW is used to mock network requests called by custom hook `usePanoptesProjects()` so AllProjectsByCount and AllRecentProjects display in lib-user's Storybook. Their Stories are not used for test suites because `nock` does not play nicely with this manually-handled pagination architecture. In the future, we could consider MSW loaders applied automatically via the `play()` function in Storybook v8+. For now, Project.js is intentionally tested while excluding network requests.

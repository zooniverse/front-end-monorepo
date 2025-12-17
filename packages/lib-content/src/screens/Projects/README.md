# ProjectsPageContainer

This is the content for the Projects Landing page (`/projects`). It is intended to be imported into the App Router in app-root and configured with [nuqs](https://nuqs.dev/).

## Dev Notes

### Storybook

You can run lib-content's Storybook and view the UI of this page by fetching projects from `panoptes-staging`, but the filter interactions work only in app-root. Time spent researching NuqsAdapter x Storybook was intentionally deprioritized for now.

### Testing

There are no unit tests for this component (yet). Interactivity of it is accomplished by connecting `nuqs` with `swr`. There's no advantage to creating unit tests that test the inherent functionalities of those libraries. However, this component could benefit from more robust Storybook stories for accessibility documentation.

### Data Fetching Edge Cases

In general, `searchParams` from the SSR page or `nuqs` can be passed to the `/projects` query. There are some edge cases though due to legacy website url behavior and what the panoptes API expects as params.

1. `nuqs` expects `null` in order to remove a param from the url. To exclude a param from the panoptes API query, it expects `undefined`. You'll see re-assignment in the `useProjects()` query for this reason.
2. ZooFooter contains links to the Projects Page filtered by "discipline". The panoptes API expects `tags`. The old PFE Project Page also used "discipline" in the url instead of "tags".
3. The `astronomy` discipline is labeled as Space in the UI.
4. When filtering by `languages`, setting the param to "en" will not return all projects. However, we want to see all projects in the results because every approved project is required to use "en" as its base language for manual team beta review. Therefore, the `languages` param is removed from the query when the "en" option is selected.
5. The panoptes API requires at least 5 characters to return search results. Need to find the code or PR from its repo to include here.

### Admin Mode

A signed-in admin is not required by panoptes to fetch projects where `launch_approved: false` or `undefined`, but this component checks if `adminMode` is turned on (via app-root in localStorage), and provides the option to return ALL projects regardless of launch approval.

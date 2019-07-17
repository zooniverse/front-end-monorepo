# @zooniverse/related-projects-api

**🔬This is totally experimental! 🔬**

A simple API for returning related projects.

## Routes

`/related-projects/:project-id` - GET with a project id, and you'll get 3 projects back that should be related

## How it works

When the API starts up, it grabs all of the current official projects and stashes them in a local in-memory database. On hitting the `/related-projects` route, it:

- fetches that project from the API
- extracts its tags
- sorts the projects in the db in descending order of matching tags
- returns the top 3

It's not the smartest way of doing it, but it works as an initial experiment.

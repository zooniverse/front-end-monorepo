# Displaying Stats in UTC Date Ranges

## Status
Accepted


## Context

Launch of the new homepages, user stats pages, and group stats pages have put a spotlight on our stats service. The new features allow users to see their classification counts and time spent increase after every contribution to a project.

Classification metadata is stored in the database with UTC timestamps, and the stats service, ERAS, aggregates classification counts into buckets by UTC date ranges. However, not all UI components have clear labels indicating a UTC data range, and volunteers could encounter three unintuitive (but expected) scenarios:

### When a volunteer's local timezone is behind UTC

Example: A volunteer submits classifications at 9pm Chicago, but it's 3am UTC.

Classification metadata is stored in our database with UTC timestamps. If a volunteer's local timezone is Oct 31, but the UTC date is Nov 1 then their classifications are put into the time bucket for Nov 1. In a bar chart UI componenent that displays "Last 7 Days", the volunteer sees Oct 26 - Nov 1. As this volunteer submits classifications, their classification count will increase in the bar for Nov 1 (not their local time of 9pm Oct 31).

### When a volunteer's local timezone is ahead of UTC

Example: A volunteer submits classifications at 8am Korea, but it's 11pm UTC.

If a volunteer's local timezone is Nov 2, but the UTC date is Nov 1, then their classifications are still put into the time bucket for Nov 1. In a bar chart UI componenent that displays "Last 7 Days", the volunteer sees Oct 26 - Nov 1. As this volunteer submits classifications, their classification count will increase in the bar for Nov 1 (not their local time of 8am Nov 2). This volunteer won't see a bar for Nov 2 on the chart.

### UI Labels that are too relative

The YourStats component in app-project is displayed on each project's Classify page. It has a label for a user's classification count "today". Classification counts "today" are fetched as a time bucket for the current date UTC. However, a volunteer could easily assume "today" means the date of their local timezone, and  fall into the two scenarios above.

The YourStats component also has a week-long bar chart with "daily" classification counts that also falls into the two scenarios above.


## Consequences

Whenever classification stats are displayed on the Zooniverse website, we should be clear that the date range is UTC, not a user's local timezone. The YourStats component in app-project has the most potential for volunteers to report discrepancies as described above because of its focus on "today".

Following this ADR, the decisions below will be implemented. When a user navigates the Zooniverse website, their classification counts will be fetched and displayed consistently in UTC date ranges.


## Decision

1. An x-axis label "Date Range (UTC)" will be added to bar charts displaying user stats, group stats, and project stats.

2. A question + answer will be added to the About Zooniverse > FAQ page explaining why stats data are displayed in a UTC date range.

3. The YourStats component in app-project will be redesigned and refactored to match the "Last 7 Days" and "All Time" stats components on a user's personal stats page. The label "Last 7 Days" is more adaptable to volunteers located across the globe, yet granular enough to display incrementing classification counts "live".

4. The eventual redesign and development of the Project Stats page will follow the above practice of a clear x-axis label and data fetching in UTC date ranges.

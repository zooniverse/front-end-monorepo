# Banners

Banners are short messages shown at the top of the classifier, with an explanatory tooltip showing more information.

Each banner has its own component, which leverages the generic `Banner` component and includes the logic for when to show the banner, and the content.

Precedence of banners to be shown to the user is:

1. Workflow is finished
1. User has finished workflow
1. Subject is retired
1. Subject has already been seen

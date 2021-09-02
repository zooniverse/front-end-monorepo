# Quick Talk Component

The Quick Talk component is intended to promote Subject discovery & discussion, by embedding basic Talk functionality into the Classify page.

- As of August 2021, this is an **experimental feature**
- To enable it, add `quicktalk` to a Project's `experimental_tools`
- As part of its experimental nature, it _independently checks the User resource._
  - `app-project` is supposed to handle the User resource, but at the moment, that's not passed down to `lib-classifier`
  - As such, `lib-classifier` components that need the User resource have to (for now) figure out the user on their own accord. QuickTalk's user-checking is self-contained to the component so it'll be easier to isolate and replace once a long-term solution (i.e. have `app-project` pass down the User resource) is available.
  - This causes some minor inefficiencies/duplication of work (i.e. fetching the User resource at both the app-project and lib-classifier levels) but is considered acceptable for an experiment.
  - Please see https://github.com/zooniverse/front-end-monorepo/discussions/2362 for more details.

## Features

**QuickTalk Button:** QuickTalk starts in a 'collapsed' state, i.e. as a button
- The QuickTalk button maintains a fixed position (bottom right of the screen)
- This button will have a badge indicating the number of comments, if there's 1 comment or more. (note 1)
- Clicking on the button will expand QuickTalk.

**QuickTalk Panel:** in its expanded state, QuickTalk will list all Talk Comments for this Subject's discussion
- The QuickTalk panel maintains a fixed position (bottom right of the screen), and a maximum size (HTML overflow allows users to scroll through all comments) 
- Clicking on 'Subject Discussion' in the component header will open the Subject's Talk link _in a new window_
- Clicking on the close button in the component header will collapse the QuickTalk component.
- Comments will be listed oldest-to-newest (note 2)
  - Similar to classic Talk, Comments will contain: the user's avatar (with a default avatar as a fallback), display name, login, role(s), and comment text (using standard markdown)
  - TODO: maybe host that default avatar somewhere less arbitrary?
  - TODO: maybe add a different style for deleted comments? (This is in PFE)
- At maximum, this should list 20 comments (note 2) (note 3)
- Excluded functionality:
  - You can't click on a user's name to view their profile on Talk. (note 4)
  - You can't edit your comments within QuickTalk. (note 5)

**Posting Comments:** a logged-in user can post comments.
- The "Post Comment" form ONLY appears IF the user is signed in AND QuickTalk is in its expanded state. It's a simple text area and "submit" button.
- Upon successfully posting a comment, all comments are re-fetched.
- Users cannot post empty comments.
- The "Post Comment" form can show error messages.
- The "Post Comment" form will be disabled when a comment is being sent (to prevent multiple sends), and will have a "posting comment..." message.
- **Dev note:** the "Post Comment" functionality checks that a user is logged in before each post. This is due to user authentication cautions on lib-classifier.
- **Dev note:** be aware that there is a logic difference between *posting the first comment for a Subject* vs *posting the second/third/etc comment for a Subject.* The former requires the code to create a 'discussion' resource first, the latter simply adds a new 'comment' resource to an existing 'discussion' resource.
- Excluded functionality:
  - "Post Comment" form uses a basic textarea, not a Markdown Editor. (note 5) 

Notes:
- (1) grommet.Button.badge crashes tests and Storybook for some reason, so have been removed from .spec.js and .stories.js
- (2) these design choices are subject to change once we have testers try out QuickTalk
- (3) 20 is the Talk default, _I think._ In any case, the reason is to avoid adding pagination unless necessary.
- (4) Reason: didn't want to give users reason to keep opening new windows/tabs to Talk.
- (5) Reason: this would have introduced complexity for a supplementary feature. Users can open the Talk link for full functionality.
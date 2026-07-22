# Unsubscribe Page

The Unsubscrube Page is where users go to when they want to unsubscribe from all Zooniverse newsletters. Or, in some cases, this is where they _end up_ after successfully unsubscribing from all Zooniverse. (See Behaviours below.)

Zooniverse URL: https://www.zooniverse.org/unsubscribe

Behaviours:

- There are two points of entry to this page.
- (1) When a user receives a newsletter from the Zooniverse, there's an "Unsubscribe" link that goes to https://panoptes.zooniverse.org/unsubscribe?token=BEEPBOOP
  - That Panoptes /unsubscribe path performs the un-subscription action, then immediately redirects users.
  - Users are redirected to this page with a query param, https://www.zooniverse.org/unsubscribe?processed=true
  - With the `?processed=true` param, they'll see an "Unsubscribe Successful" message with no further actions available.
- (2) User can go directly the URL
  - Users can type in their (or any) email address into an Unsubscribe Form.
  - This form contacts Panoptes with the request.
  - On success, users will see the same "Unsubscribe Successful" message with no further actions available.

Security:

- We don't confirm if an email exists or not.


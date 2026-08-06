# Unsubscribe Page

The Unsubscrube Page is where users go to when they want to unsubscribe from all Zooniverse newsletters. Or, in some cases, this is where they _end up_ after successfully unsubscribing from all Zooniverse. (See Behaviours below.)

Zooniverse URL: https://www.zooniverse.org/unsubscribe

Behaviours:

- There are two points of entry to this page.
- (1) When a user receives a newsletter from the Zooniverse, there's an "Unsubscribe" link that goes to https://panoptes.zooniverse.org/unsubscribe?token=BEEPBOOP
  - That Panoptes /unsubscribe path performs the un-subscription action, then immediately redirects users.
  - Users are redirected to this page with a query param, https://www.zooniverse.org/unsubscribe?processed=true
  - With the `?processed=true` param, they'll see an "Unsubscribe Successful" message with no further actions available.
- (2) User can go directly to the URL
  - Users can type in their (or any) email address into an Unsubscribe Form.
  - This form contacts Panoptes with the request.
  - On success, users will see the same "Unsubscribe Successful" message with no further actions available.

Security:

- We don't confirm if an email exists or not.

## Dev Notes

If you're testing the Unsubscribe Page on localhost, note that the form submission only works with app-root on staging.

1. On app-root's local.zooniverse.org:3000/unsubscribe, the form will actually hit Panoptes Staging when submitting a email address, and **should** work as expected.
2. On app-root, if you use ?env=production, the form will try to hit Panoptes Production, but the action will always fail with a CORS error.
3. On lib-content's Storybook, the form will try to hit Panoptes Staging when submitting an email address, but the action will always fail with a CORS error.

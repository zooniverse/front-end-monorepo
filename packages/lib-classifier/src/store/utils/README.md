# Store utilities

## ClassificationQueue

The `ClassificationQueue` class is the failed classification queue strategy for Firefox, Safari, and Edge browser users. When a user hits submit on a classification, the event handler feature detects for Background Sync API. If it is not supported, then the classification data is added to any pending classifications waiting to be submitted by this class. A `Promise.all` is called to attempt pending classifications, then any failures are added to a retry queue that is stored in `localStorage`.

Note that it is specifically the classification submit event that triggers the queue and the queue only works during the user's session on the Zooniverse website. A new strategy using service workers and the Background Sync API is implemented for Google Chrome users. [Read about this strategy](../../workers/README.md) in the README for service workers. 

We only store failures in `localStorage`, because a pending queue of new POSTs can potentially submit multiple classifications for the same classification. (see: [zooniverse/Panoptes-Front-End#4911](https://github.com/zooniverse/Panoptes-Front-End/issues/4911)). 422 responses from Panoptes are permanently dropped. 
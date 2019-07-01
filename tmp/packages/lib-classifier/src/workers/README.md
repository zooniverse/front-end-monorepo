# Service Workers

This folder contains the functionality for any service workers we want to define and run for the classifier. Service workers are scripts that can be run by the browser independently from any web page. Currently, almost all of the features for [service workers are supported by all major browsers](https://jakearchibald.github.io/isserviceworkerready/) except for the [Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/SyncManager) which is only supported by Google as of November 2018. Background Sync API is under development by [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/backgroundsyncapi/) and [Mozilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1217544) and once one of them implements it, it will be put onto the standards track. 

## Worker lifecycle

Service workers have a registration event that is required to install and run them by the browser. Line 25 in `Classifier.js` checks for Background Sync API support, then calls the registerWorkers function. We check for Background Sync API support since the only worker we have defined right now is the queue worker which relys on this API. In the future if we add more service workers, we may want to refactor this feature detection.

In `registerWorkers.js`, an event listener is added to the window load event, service worker support is detected, then if service workers are supported, then `queue.js` worker is registered.

## Current workers

**`queue.js`**

This is the classification POST failure queue worker. It uses [Google workbox background sync worker](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync) which adds an event listener to fetch events, checks if the request is a POST to the Panopts classifications endpoint, then if the `request.ok` is false or if the request Promise is rejected, then the request gets pushed into the queue, which stores it in IndexedDB. The worker then relys on background sync which can be triggered by a change in network connectivity going back online or just gets periodicly scheduled for reattempts. Note that this worker is only supported by Google Chrome. We have another queuing strategy for all other browsers. [Read about that strategy](../stores/utils/README.md) in the README.md in the store utils folder.

Note that the strategy is to have a failed queue for classifications, not queue of initial POST requests. A queue of waiting POSTs could potentially submit multiple classifications for the same initially classification (see: [zooniverse/Panoptes-Front-End#4911](https://github.com/zooniverse/Panoptes-Front-End/issues/4911)). The failure queue handles all failures except for HTTP 422. This indiciates the classification data is malformed, so those are permanently dropped. A future enhancement would be to add a log to a logging service for 422s. 


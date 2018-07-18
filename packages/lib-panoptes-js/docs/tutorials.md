# Tutorials request helpers

[CRUD REST request helpers](#crud-rest)

- [Get](#get)

[Other common requests](#common-requests)

- [Get Attached Images](#get-attached-images)
- [Get with Images](#get-with-images)
- [Get Tutorials](#get-tutorials)
- [Get Mini-courses](#get-mini-courses)

[Testing](#testing)

- [Mocks](#mocks)

## CRUD REST

The tutorials endpoint is available in the module exports.

``` javascript
import { tutorials } from '@zooniverse/panoptes-js';

tutorials.endpoint
```

### Get

**Function**

``` javascript
// By tutorial id
const params = { id: tutorialId, query: query };

tutorials.get(params)

// By workflow id
const params = { workflowId: workflowId, query: query };

tutorials.get(params)
```

**Arguments**

- params _(object)_ - An object that should include a tutorial id _(string)_ or workflow id _(string)_ and/or query _(object)_ properties. The get request requires either a tutorial id or workflow id. Query params are optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request
tutorials.get({ id: '1' }).then((response) => {
  this.setState({ tutorial: response.body.tutorials[0] });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});

// or by workflow id, maybe this workflow has a standard tutorial and mini-course
// the lab currently doesn't allow more than one standard tutorial or mini-course to be linked
// to a workflow at a time.
tutorials.get({ workflow_id: '2334' }).then((response) => {
  this.setState({
    tutorials: response.body.tutorials
  });
});
```

## Common requests

### Get Attached Images

A tutorials get request that validates for the presence of the tutorial id. The id is used to create the tutorials attached images endpoint for the request. Allows for optional query params.

**Function**

``` javascript
const params = { id: '1' };

tutorials.getAttachedImages(params)

// or with additional query params
const params = { id: '1', query: { page: '2' } }

tutorials.getAttachedImages(params)
```

**Arguments**

- params _(object)_ - An object that should include the tutorial id _(string)_ and optionally additional query params.

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request using id
tutorials.getAttachedImages({ id: '10' }).then((response) => {
  this.setState({ tutorialMedia: response.body.media[0] });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});
```

### Get with Images

A tutorials get request uses a default include query param for attached images. It then uses the tutorials' [`get`](#get request helper so this also requires either a tutorial id or workflow id. Note, there is a known bug with the include request, so this will not return what we expect at the moment:

https://github.com/zooniverse/Panoptes/issues/2279

**Function**

``` javascript
const params = { id: '1' };

tutorials.getWithImages(params)

// or with additional query params
const params = { workflowId: '1000', query: { page: '2' } }

tutorials.getWithImages(params)
```

**Arguments**

- params _(object)_ - An object that should include the tutorial id _(string)_ or workflow id _(string)_ and optionally additional query params.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked media resources or the request error.

**Example**

``` javascript
// Get request
tutorials.getWithImages({ id: '1' }).then((response) => {
  // The media will have to be matched up with the step it is for...
  this.setState({ 
    tutorial: response.body.tutorials[0],
    tutorialMedia: response.body.linked
  });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});
```

### Get Tutorials

A tutorials get request that filters the response to only be tutorials with the property `kind` set to `tutorial` or null values (for backwards compatibility). It then uses the tutorials' [`get`](#get) request helper so this also requires either a tutorial id or workflow id.

**Function**

``` javascript
const params = { id: '1' };

tutorials.getTutorials(params)

// or with additional query params, This is illustrative. Requesting for a second page doesn't actually make sense...
const params = { workflowId: '10', query: { page: '2' } }

tutorials.getTutorials(params)
```

**Arguments**

- params _(object)_ - An object that should include the tutorial id _(string)_ or workflow id _(string)_ and optionally additional query params.

**Returns**

- Promise _(object)_ resolves to the API response with the filtered resource(s), meta, links, and linked media resources or the request error.

**Example**

``` javascript
// Get request
tutorials.getWithImages({ id: '1' }).then((response) => {
  this.setState({ 
    tutorial: response.body.tutorials[0]
  });
}).catch((error) => { console.error(error) });
```

### Get Mini-courses

A tutorials get request uses a default kind query param for `mini-course`. It then uses the [`get`](#get) request helper so this also requires either a tutorial id or workflow id.

**Function**

``` javascript
const params = { id: '45' };

tutorials.getMinicourses(params)

// or with additional query params. This is illustrative. Requesting for a second page doesn't actually make sense...
const params = { workflowId: '455', query: { page: '2' } }

tutorials.getMinicourses(params)
```

**Arguments**

- params _(object)_ - An object that should include the tutorial id _(string)_ or workflow id _(string)_ and optionally additional query params.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked media resources or the request error.

**Example**

``` javascript
// Get request
tutorials.getMinicourses({ id: '45' }).then((response) => {
  this.setState({ 
    tutorial: response.body.tutorials[0]
  });
})
```

## Testing

### Mocks

For your convenience, the mocks used in testing are exported and made available to use in any app tests. The available mocks are and how to access them:

- resources
  - tutorialOne - `tutorials.mocks.resources.tutorialOne`
  - tutorialTwo - `tutorials.mocks.resources.tutorialTwo`
  - tutorialWithNullKind - `tutorials.mocks.resources.tutorialWithNullKind`
  - minicourse - `tutorials.mocks.resources.minicourse`
  - attachedImageOne - `tutorials.mocks.resources.attachedImageOne`
  - attachedImageTwo - `tutorials.mocks.resources.attachedImageTwo`
- responses
  - get
    - allTutorialsForWorkflow - `tutorials.mocks.responses.get.allTutorialsForWorkflow`
    - tutorial - `tutorials.mocks.responses.get.tutorial`
    - tutorials - `tutorials.mocks.responses.get.tutorials`
    - tutorialWithImages - `tutorials.mocks.responses.get.tutorialWithImages`
    - tutorialsWithImages - `tutorials.mocks.responses.get.tutorialsWithImages`
    - minicourse - `tutorials.mocks.responses.get.minicourse`
    - attachedImage - `tutorials.mocks.responses.get.attachedImage`
    - queryNotFound - `tutorials.mocks.responses.get.queryNotFound`

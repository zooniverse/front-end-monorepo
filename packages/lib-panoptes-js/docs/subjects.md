# Subjects request helpers

[CRUD REST request helpers](#crud-rest)

- [Get](#get)

[Other common requests](#common-requests)

- [Get Subject Queue](#get-subject-queue)

[Testing](#testing)

- [Mocks](#mocks)

## CRUD REST

The subjects endpoint is available in the module exports.

``` javascript
import { subjects } from '@zooniverse/panoptes-js';

subjects.endpoint
```

### Get

**Function**

``` javascript
// By subject id
const params = { id: subjectId, query: query, authorization: authorization };

subjects.get(params)
```

**Arguments**

- params _(object)_ - An object that should include a subject id _(string)_ and/or query _(object)_ properties. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. If you're requesting a subject queue for classification, use [subjects.getSubjectQueue](#get-subject-queue). Query params are optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request
subjects.get({ id: '9' }).then((response) => {
  this.setState({ subject: response.body.subjects[0] });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});
```

## Common requests

### Get Subjects Queue

A subjects get request that validates for the presence of a workflow id and optionally the subject set id. Allows for optional query params.

**Function**

``` javascript
const params = { workflowId: '50', authorization: authorization };

subjects.getSubjectQueue(params)

// or with optional subject set id
const params = { workflowId: '50', subjectSetId: '403' }

subjects.getSubjectQueue(params)

// or with optional additional query params
const params = { workflowId: '50', query: { page_size: '2' } }

subjects.getSubjectQueue(params)
```

**Arguments**

- params _(object)_ - An object that should include the workflow id _(string)_, optionally the subject set id _(string)_, and optionally additional query params. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`.

**Returns**

- Promise _(object)_ resolves to the API response with the resources, meta, links, and linked properties or the request error.

**Example**

``` javascript
subjects.getSubjectQueue({ workflowId: '10' }).then((response) => {
  this.setState({ queue: response.body.subjects });
})
```

## Testing

### Mocks

For your convenience, the mocks used in testing are exported and made available to use in any app tests. The available mocks are and how to access them:

- resources
  - subject - `subjects.mocks.resources.subject`
  - subjectQueue - `subjects.mocks.resources.subjectQueue`
- responses
  - get
    - subject - `subjects.mocks.responses.get.subject`
    - subjectQueue - `subjects.mocks.responses.get.subjectQueue`
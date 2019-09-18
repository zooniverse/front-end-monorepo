# Projects request helpers

[CRUD REST request helpers](#crud-rest)

- [Get](#get)
- [Create](#create)
- [Update](#update)
- [Delete](#delete)

[Other common requests](#common-requests)

- [Get By Slug](#get-by-slug)
- [Get with Linked Resources](#get-with-linked-resources)

[Testing](#testing)

- [Mocks](#mocks)

## CRUD REST

### Get

**Function**

``` javascript
const params = { id: projectID, query: query, authorization: authorization };

projects.get(params)
```

**Arguments**

- params _(object)_ - An object that should include id _(string)_ and/or query _(object)_ properties. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. If undefined, the get request defaults to request the first page of the projects resource. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request
projects.get({ id: '1104' }).then((response) => {
  this.setState({ project: response.body.projects[0] });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});

// or many projects
projects.get().then((response) => {
  this.setState({
    projects: response.body.projects,
    meta: response.body.meta // Store the metadata to use for paginating requests later
  });
});
```

### Create

**Function**

``` javascript
const params = { data: data, authorization: authorization };

projects.post(params)
```

**Arguments**

- params _(object)_ - An object with a data _(object)_ property to send as params with the POST request. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

``` javascript
// Create request
projects.create().then((response) => {
  this.setState({ project: response.body.projects[0] });
});
```

### Update

**Function**

``` javascript
const params = { id: projectID, data: data, authorization: authorization };

projects.post(params)
```

**Arguments**

- params _(object)_ - An object with an id _(string)_ to include in the request endpoint and data _(object)_ property to send as params with the PUT request. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. Required.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

``` javascript
// Update request
projects.update({ id: '1104', data: { display_name: 'Super Zoo' } }).then((response) => {
  this.setState({ project: response.body.projects[0] });  
});
```

### Delete

**Function**

``` javascript
const params = { id: projectID, authorization: authorization };

projects.delete(params);
```

**Arguments**

- params _(object)_ - An object with an id _(string)_ property to include in the request endpoint. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. Required.

**Returns**

- Promise _(object)_ resolves to the API status code response or request error object.

**Example**

``` javascript
projects.delete({ id: '1104' }).then((response) => {
  if (response.statusCode === '204') {
    // Do something after success    
  }
});
```

## Common requests

### Get By Slug

A project get request that validates for the presence of the slug in the query param and parses it into the correct format if the argument is using a pathname including `'projects'`

**Function**

``` javascript
const params = { slug: 'zooniverse/galaxy-zoo', authorization: authorization };

projects.getBySlug(params)

// or with additional query params
const params = { slug: 'zooniverse/galaxy-zoo', cards: true, authorization: authorization }

projects.getBySlug(params)
```

**Arguments**

- params _(object)_ - An object that should include the project's slug _(string)_ and optionally additional query params. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`.

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request using slug param
projects.getBySlug({ slug: 'zooniverse/galaxy-zoo' }).then((response) => {
  this.setState({ project: response.body.projects[0] });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});
```

### Get with Linked Resources

A project get request that automatically includes the following linked resources with the `includes` query param:
- avatar
- background
- owners
- pages

The request can be done with either project ID or project slug.

**Function**

``` javascript
// Using project id
const params = { id: '1', authorization: authorization }

projects.getWithLinkedResources(params)

// Using project slug
const params = { slug: 'zooniverse/galaxy-zoo' };

projects.getWithLinkedResources(params)

// or in browser without the slug param using window location pathname
projects.getWithLinkedResources()

// or with additional query params
const params = { slug: 'zooniverse/galaxy-zoo', cards: true }

projects.getWithLinkedResources(params)
```

**Arguments**

- params _(object)_ - An object that should include the project's slug _(string)_ or the project's id _(string)_ and optionally additional query params. Also can take an authorization _(string)_ property that must be set to a string including type and token, i.e. `{ authorization: 'Bearer 12345' }`. This helper method uses a private internal function to get the project slug if the location pathname, like `'projects/zooniverse/gravity-spy'` is passed in as the slug into the request call. 

**Returns**

- Promise _(object)_ resolves to the API response with the resource(s), meta, links, and linked properties or the request error.

**Example**

``` javascript
// Get request using slug param
projects.getWithLinkedResources({ slug: 'zooniverse/galaxy-zoo' }).then((response) => {
  this.setState({
    avatar: response.body.linked.avatar[0],
    background: response.body.linked.background[0],
    owner: response.body.linked.owners[0],
    pages: response.body.linked.pages,
    project: response.body.projects[0]
  });
}).catch((error) => { 
  if (error.statusCode === 404) return null; // If you don't care about catching a 404
});

// or without slug param in a browser environment
projects.getWithLinkedResources().then((response) => {
  this.setState({
    avatar: response.body.linked.avatar[0],
    background: response.body.linked.background[0],
    owner: response.body.linked.owners[0],
    pages: response.body.linked.pages,
    project: response.body.projects[0]
  });
});
```

## Testing

### Mocks

For your convenience, the mocks used in testing are exported and made available to use in any app tests. The available mocks are and how to access them:

- resources
  - projectAvatar - `projects.mocks.resources.projectAvatar`
  - projectBackground - `projects.mocks.resources.projectBackground`
  - projectOne - `projects.mocks.resources.projectOne`
  - projectTwo - `projects.mocks.resources.projectTwo`
  - projectPages
    - team - `projects.mocks.resources.projectPages.team`
    - results - `projects.mocks.resources.projectPages.results`
  - projectRoles
    - owner - `projects.mocks.resources.projectRoles.owner`
    - multipleRoles - `projects.mocks.resources.projectRoles.multipleRoles`
- responses
  - get
    - project - `projects.mocks.responses.get.project`
    - projects - `projects.mocks.responses.get.projects`
    - queryNotFound - `projects.mocks.responses.get.queryNotFound`
    - projectRoleOwner - `projects.mocks.responses.get.projectRoleOwner`
    - projectRoles - `projects.mocks.responses.get.projectRoles`
    - projectPages - `projects.mocks.responses.get.projectPages`
    - projectWithLinkedResources - `projects.mocks.responses.get.projectWithLinkedResources`
  - post
    - createdProject - `projects.mocks.responses.post.createdProject`
  - put
    - updatedProject - `projects.mocks.responses.put.updatedProject`
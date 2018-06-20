# Projects request helpers

- [Get](#get)
- [Create](#create)
- [Update](#update)
- [Delete](#delete)

## Get

**Function**

``` javascript
const params = { id: projectID, query: query };

projects.get(params)
```

**Arguments**

- params _(object)_ - An object that should include id _(string)_ and/or query _(object)_ properties. If undefined, the get request defaults to request the first page of the projects resource. Optional.

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

### Get By Slug

A project get request that validates for the presence of the slug in the query param and parses it into the correct format if the argument is using a pathname including `'projects'`

**Function**

``` javascript
const params = { slug: 'zooniverse/galaxy-zoo' };

projects.getBySlug(params)

// or with additional query params
const params = { slug: 'zooniverse/galaxy-zoo', cards: true }

projects.getBySlug(params)
```

**Arguments**

- params _(object)_ - An object that should include the project's slug _(string)_ and optionally additional query params.

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


## Create

**Function**

``` javascript
const params = { data: data };

projects.post(params)
```

**Arguments**

- params _(object)_ - An object with a data _(object)_ property to send as params with the POST request. Optional.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

``` javascript
// Create request
projects.create().then((response) => {
  this.setState({ project: response.body.projects[0] });
});
```

## Update

**Function**

``` javascript
const params = { id: projectID, data: data };

projects.post(params)
```

**Arguments**

- params _(object)_ - An object with an id _(string)_ to include in the request endpoint and data _(object)_ property to send as params with the PUT request. Required.

**Returns**

- Promise _(object)_ resolves to the API response with the resource, meta, links, and linked properties or the request error.

**Example**

``` javascript
// Update request
projects.update({ id: '1104', data: { display_name: 'Super Zoo' } }).then((response) => {
  this.setState({ project: response.body.projects[0] });  
});
```

## Delete

**Function**

``` javascript
const params = { id: projectID };

projects.delete(params);
```

**Arguments**

- params _(object)_ - An object with an id _(string)_ property to include in the request endpoint. Required.

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
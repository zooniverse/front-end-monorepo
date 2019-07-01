# ADR 10: Type conversions from Mobx-State-Tree to JSON API for Javascript Maps

Created: November 1, 2018

## Context

In [ADR-5](adr-5.md), we decided on a format of a new workflow resource attribute, steps. We decided that the attribute would use ES6 Maps. When stored in the Mobx-State-Tree store, the map is wrapped by a MobX Observable. In order to work with Panoptes, these data structures has to be converted into a format that is supported by JSON API. 

In the consequences section of ADR-5, we described two possible solutions for the type conversion: using an existing library or doing it ourselves. We initially attempted to use an existing library, but several concerns were raised by fellow team members about this ([zooniverse/Panoptes-Front-End#4992] (https://github.com/zooniverse/Panoptes-Front-End/issues/4992)).

The default behavior in existing libraries like [JSON8](https://github.com/sonnyp/JSON8/tree/master/packages/json8#ooserialize) or MobX's [`toJS`](https://mobx.js.org/refguide/tojson.html) method is to convert maps into objects. In javascript, maps are a kind of object. However, for us, we are using maps for workflow steps because a key requirement is the ordering of key-value pairs, so converting to an object would lose the guaranteed ordering of steps. Using a library also obscures the method of map type conversion, so it will not be clear to other Zooniverse devs for other client libraries in ruby or python how to handle this case. 

## Decision

We decided to instead implement our own [type conversion utility function](https://github.com/zooniverse/front-end-monorepo/blob/master/packages/lib-classifier/src/store/utils/convertMapToArray.js) for the workflow steps map. The steps map will be converted into an array of pairs:

``` js
const workflow = {
  id: '1',
  steps: [['S1', { taskKeys: ['T1', 'T2'] }], ['S2', { taskKeys: ['T3'] }]] // How they will be stored on Panoptes
}
```

And when a workflow request is received by the classifier store, it is converted by Mobx-State-Tree into an observable map when added to the store.

**A note about the use of arrays for the key-value pairs**
Subject locations are an array of objects. It would make sense to do an array of objects here too, however the array of two values is closest to the format expected by maps when you instantiate them: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

So there's less type conversion happening if we store it this way. MobX will take objects too when setting an observable map, but if we ever want to instantiate an ES6 map independent of the store we would have to do another conversion from object to array of the key-value pair.

## Status

Accepted

## Consequences

- We will have to maintain our own type conversion functions
- This will make it clear to the devs on the team how we're doing this
- This also enables us to set a not null default for the attribute in the Panoptes Postgres database, which is preferable (Discussion: https://github.com/zooniverse/Panoptes/pull/2963#discussion_r223438269)
- The workflow resource will also have a `classifier_version` attribute added to it so we can check this for whether or not this workflow is intended for current PFE classifier or the new one instead of implicitly using a null default value on the `steps` attribute. (Discussion: https://github.com/zooniverse/Panoptes/pull/2963#discussion_r225185395)

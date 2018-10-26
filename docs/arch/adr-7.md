# ADR 7: Managing changes to classification tools

September 3, 2018

## Context

Making changes to drawing tools in production - specifically, to the structure of the data they output - is an occasionally necessary evil. Unfortunately, there is currently no way to link a marking tool, whether by version, commit or whatever, to its output in a classification.

This means that when changes happen to the tools, we need to be careful to communicate those changes to project managers, since there is every chance that they will break their data pipelines. And in the absence of a schema for the tools' output, these changes have to be handled manually in code by project managers.

## Decision

We include a schema for each marking tool used as part of the classification object submitted to the API.

The schema will be written in JSON, and will live alongside to the marking tool code. It should describe the expected data structure of a marking tool.

### Example

For a point tool with the following example output:

```json
{
  "x": 152.96875,
  "y": 164
}
```

The schema could look like:

```json
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "$id": "https://zooniverse.org/schemas/tools/point.schema.json",
  "type": "object",
  "title": "Point",
  "description": "A single point on the subject",
  "properties": {
    "x": {
      "description": "X value of the point, where `0` is on the left",
      "type": "number"
    },
    "y": {
      "description": "Y value of the point, where `0` is at the top",
      "type": "number"
    }
  },
  "required": [
    "x",
    "y"
  ]
}
```

### Alternatives

We could version the schema, and simply reference it within the classification by its URL. For example, the point tool, instead of including the entire schema in the classification, has a reference to `https://zooniverse.org/schemas/tools/point.schema.v1.json`. A change to the point tool output then becomes a new version number.

This would result in smaller classification object sizes, although forgoes the convenience of having a self-contained classification object.

## Status

Proposed

## Consequences

- The size of the classification object will increase.
- Any future change to the marking tool's output must be reflected in the schema. This will need to be enforced by including schema validation in the drawing tools tests.
- Project managers will need to be educated about schema availability, and how to use them in their data processing pipelines to handle any changes in classification structure.

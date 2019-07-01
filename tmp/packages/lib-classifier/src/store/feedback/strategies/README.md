## Strategies

A strategy tells the feedback processor how to define, validate, and process a set of feedback rules. For example, the `radial` strategy is used to determine whether a point annotation is within a given radius or not.

### API

A feedback strategy **must** export the following:

- `createRule` [function] - a function that accepts `subjectRule` and  `workflowRule` as an argument, and merges them to create a canonical representation of the rule.
- `id` [string] - a unique string identifying the strategy.
- `reducer` [function] - a function that accepts a canonical `rule` and `annotations`, and reduces them to a rule with a new property, `success` (boolean). It should also include any successful annotations as an array.
- `title` [string] - the human-readable name of the strategy, used in the Project Builder.

Optionally, it can also export:

- `labComponent` - a form component used to configure additional default options in the Project Builder.
- `validations` [array] - an array of functions, each of which accept the feedback definition as an argument, and which return a boolean. Define this if you're going to add extra default options using `labComponent`.

### Caveats

- The `reducer` function needs to be passed the rule it's checking, and the _entire_ annotation object for that task. This allows the `dud` strategy to check there are no annotations, without having to write a separate API for it.

# ADR XX: Drawing Shape Mark Annotation Models

Created: December 18, 2019

## Context

Panoptes-Front-End's drawing tools largely developed from previous custom projects and/or were added one at a time to support a specific project. Because of this, several inconsistencies have been discovered in downsteam analysis and aggregation. To explain the inconsistencies, a few definitions are needed:

- RHC: A right handed coordinate system, this is defined as a system where positive angles rotate an object from the +x axis to the +y axis with angle=0 along the +x axis

- LHC: A left handed coordinate system, this is defined as a system where positive angles rotate an object from the +x axis to the -y axis with angle=0 along the +x axis

- Domain: The range of values a number can take [ or ] is inclusive, ( or ) is exclusive.

- Upper origin: The point 0, 0 is in the upper left of the plot

- Lower origin: The point 0, 0 is in the lower left of the plot

The inconsistencies comprise of:

- The browser SVG coordinate systems use _RHC_ with an _upper origin_ resulting in positive angles rotating clockwise. Most plotting software (R, Python, Matlab) are _RHC_ with a _lower origin_ resulting in positive angles rotating counter-clockwise. 
  - The position of origin has been inconsistent between tools which has an effect on the final annotation too. Most use the center x, y point, but some don't
  - Some of the drawing tools use _LHC_
- Some tools' annotation use `angle` some use `rotation`
- It's unclear when the x, y annotation refers to the center point of the shape
- It's unclear when the x, y annotation is being used as the point of rotation

Some of the mark annotation models have a few other issues as well:

- Some shapes have default values which an create bias. For example, the ellipse has a default axis ratio of 0.5 and many volunteers have left the default creating a bias ([comment](https://github.com/zooniverse/front-end-monorepo/issues/500#issuecomment-516788821))
- The freehand drawing tool has peformance impact on the browser as the drawing is being created and with the job to create classification exports as well. This is because the current annotation consists of every single x, y point created

## Decision

The shape's mark annotation models should change for consistency and improved post-classification analysis in the following ways:

- The annotation should use the mathematical standard of _RHC_ with a domain of `(-180, 180]` or `[0, 360)` for consistent angle calculation
- The annotation model should use `angle` for naming
- The annotation model should consistency use `x_center` and `y_center` for shapes where that is applicable
  - The exceptions are point, line, fan. The fan tool is not symmetric. 
  - Shape clustering in aggregation is always done with the center
- All rotations should be defined about `x_center` and `y_center` point. If the rotation cannot be defined around the center point, then the point used that should be clearly recorded in the annotation as `x_rotation` and `y_rotation`
- Default values should be removed wherever possible. This may result in some tools drawing UX changing. 
  - The tools that have defaults are ellipse, rotate rectangle, fan. 
  - A proposed example for the ellipse may involve requiring the volunters to click twice to set the the two radii. ([comment](https://github.com/zooniverse/front-end-monorepo/issues/500#issuecomment-516788821))
- The freehand drawing tools mark annotation will be a string of the SVG's path and it will be the responsibility of post-classification analysis to convert this to usable x,y points. We will include a sample script in the `DataDigging` repo for project owners to reference on how to do this. Aggregation in Caesar will have to be updated to do the conversion first.
- An added `toolType` string name definition will be included. This would be `point`, `ellipse`, etc. This enables the aggregation for Caesar code to auto-configure which extractor to use without checking data types ([comment](https://github.com/zooniverse/front-end-monorepo/issues/823#issuecomment-493896524)).
  - `tool` will change to `toolIndex` to clarify it is referring to the index of the input from the task area.
  - The parent drawing task will have a `taskType` added as well.

Each Github issue tracking the port of each drawing tool will be updated with the specific changes relevant to that tool's mark annotation model. Certain models may have additional properties for use within the front-end application, like a unique id for use in maps, that will be removed from the annotation before submitting with the classification. These additional properties are internal for the application and may confuse project owners if included.

This ADR does not define the drawing sub-task annotation model. This will be in a follow up ADR.

## Status

Proposed

## Consequences

- These are breaking changes between PFE and the new classifier, so projects migrating from PFE to the new classifier may need to write new analysis code to deal with the changes. 
  - The new annotation models could be submitted with a JSON schema as proposed in ADR 07 to assist with this
- The aggregation code in Caesar will need to be updated. It can check the classification metadata for `classifier_version: 2.0` to know to use any updated clustering code. Any further updates to the mark annotation model could be checked against the proposed JSON schema if included in the annotation and the schema itself will be versioned starting at `2.0` (PFE is version `1.0`).
- The freehand drawing tool mark annotation is an exception to the rest of the marks' annotation models due to performance reasons and that will have to be communicated.


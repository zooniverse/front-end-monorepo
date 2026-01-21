# Subject Group

Subjects for the SubjectGroupViewer are a special case; a "Group Subject" is a randomised collection of X **single image Subjects** (where X = rows x columns) that the backend packages in to a single (transient) SubjectGroup.

- Subject Groups are called from the `/subjects/grouped` Panoptes endpoint (instead of the usual `/subjects/queued` endpoint)
  - An example request looks like `https://panoptes-staging.zooniverse.org/api/subjects/grouped?workflow_id=3412&num_rows=5&num_columns=5`
  - Note: `num_rows` and `num_columns` need to match the `workflow.configuration.subject_group` value. (See SubjectGroupViewer for info on how the `workflow.configuration` should be set up.)
  - Note: as of May 2021, there is a maximum limit of 25 constituent Subjects per Subject Group
- To the frontend, a Subject Group looks almost EXACTLY like a multi-image Subject, but with extra metadata.
  - `subject.locations` has X (where X = rows x columns) number of image URLs.
  - `subject.metadata.#group_subject_ids` is a string of X Subject IDs, consisting of the Subject Group's _constituent Subject's IDs_ joined together with the dash `-` character. e.g. "134859-134722-134823-134642-134700-134888-134853-134685-134843-134619-134864-134697-134637-134624-134832-134805-134623-134788-134828-134643-134610-134795-134756-134676-134714"
  - `subject.metadata.#subject_group_id` is a number indicating the (temporary) ID of this Subject Group. The _presence_ of this metadata key is important, not its _value_.
- Subject Groups are STRONGLY ASSOCIATED with the Subject Group Viewer. Please see `src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md` for more details.
- Subject Groups are STRONGLY ASSSOCIATED with the Subject Group Comparison Task. Please see `src/plugins/tasks/SubjectGroupComparisonTask/README.md` for more details.

## 2026-01-16: New Classifier behaviour:
When a classification for a Subject Group is submitted, all IDs for each of the group's constituent Subjects will be submitted in the `classification.links.subjects` data. The negative placeholder ID for the Subject Group (e.g., -1) is ignored and not submitted.
- `classification.links.subjects` is an array of Subject IDs, recorded as strings. The array will contain n entries, the number of real/constituent subjects in the subject group.
- Example: Subject Group -1 consists of constituent Subjects [9, 5, 2, 4]. The classification will be submitted with `myClassification.links.subjects = ["2", "4", "5", "9"]`
- 🐨 Note that the subject IDs in the classification links are sorted in ascending order, regardless of the order or arrangement of Subjects.

## Old Classifier behaviour (may be relevant when reviewing old Classification data):
- Subject Group "Pseudo" Subjects were deprecated in Jan 2026.
- Before 2026-01-16, After 2025-09-22: `classification.links.subjects` contained the ID of the SubjectGroup "pseudo" Subject _and_ the IDs of the individual group member Subjects.
- Before 2025-09-22: `classification.links.subjects` contained _only_ the ID of the SubjectGroup "pseudo" Subject. Pseudo Subjects were deprecated in Jan 2026.

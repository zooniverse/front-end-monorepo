# Subject Group

Subjects for the SubjectGroupViewer are a special case; a "Group Subject" is a randomised collection of X **single image Subjects** (where X = rows x columns) that the backend packages in to a single "pseudo" Subject.

- Subject Groups are called from the `/subjects/grouped` Panoptes endpoint (instead of the usual `/subjects/queued` endpoint)
  - An example request looks like `https://panoptes-staging.zooniverse.org/api/subjects/grouped?workflow_id=3412&num_rows=5&num_columns=5`
  - Note: `num_rows` and `num_columns` need to match the `workflow.configuration.subject_group` value. (See SubjectGroupViewer for info on how the `workflow.configuration` should be set up.)
  - Note: as of May 2021, there is a maximum limit of 25 constituent Subjects per Subject Group
- To the frontend, a Subject Group looks almost EXACTLY like a multi-image Subject, but with extra metadata.
  - `subject.locations` has X (where X = rows x columns) number of image URLs.
  - `subject.metadata.#group_subject_ids` is a string of X Subject IDs, consisting of the Subject Group's _constituent Subject's IDs_ joined together with the dash `-` character. e.g. "134859-134722-134823-134642-134700-134888-134853-134685-134843-134619-134864-134697-134637-134624-134832-134805-134623-134788-134828-134643-134610-134795-134756-134676-134714"
  - `subject.metadata.#subject_group_id` is a number indicating the unique ID of this Subject Group, which is distinct from `subject.id`. Honestly, don't worry about this for now.
- Subject Groups are STRONGLY ASSOCIATED with the Subject Group Viewer. Please see `src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md` for more details.
- Subject Groups are STRONGLY ASSSOCIATED with the Subject Group Comparison Task. Please see `src/plugins/tasks/SubjectGroupComparisonTask/README.md` for more details.

## 2025-09-22: New Classifier behaviour:
When a classification for a Subject Group is submitted, (1) all the IDs of the group's constituent Subjects, AND (2) the ID of the Subject Group itself, will be submitted in the `classification.links.subjects` data.
- `classification.links.subjects` is an array of Subject IDs, recorded as strings. The array will contain n + 1 entries, where n is the number of real/constituent subjects in the subject group.
- Example: Subject Group 1000 consists of constituent Subjects [9, 5, 2, 4]. The classification will be submitted with `myClassification.links.subjects = ["2", "4", "5", "9", "1000"]`
- 🐨 Note that the subject IDs in the classification links are sorted in ascending order, regardless of the order of real Subjects.
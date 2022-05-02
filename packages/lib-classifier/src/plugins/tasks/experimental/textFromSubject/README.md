# TextFromSubject Task

The textFromSubject task is a task type designed for use with OCR output verification, initially the DigiLeap project. The task is a text task that initializes the annotation value from a subject's text content.

The textFromSubject task requires subjects with a location of text mime type. The subject's text location content is used to initialize the annotation value. Subjects with a 1) single text location or 2) single image location and single text location are supported.

The textFromSubject task does not support a required property. Consider adding a required question task with a textFromSubject task within the same step/page of the workflow.

The textFromSubject task does not support tags (i.e. insertion, deletion).

The textFromSubject task is disabled until the subject's text content is loaded.

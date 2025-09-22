# Subject Group Modal

The Subject Group Modal is a component that overrides the standard "Done & Talk" behaviour of the Classifier, for SubjectGroup-type subjects (i.e. when using the SubjectGroupViewer)

Here's how it works:
- When a volunteer has completed annotation a SubjectGroup-type subject, and hits Done & Talk...
- ..._instead of_ immediately submitting the classification and opening the Subject Talk Page _for the SubjectGroup-type subject_...
- ...the Subject Group Modal is displayed, showing the individual Subjects (aka the "real Subjects") that are part of the group.
  - Volunteers can select which individual "real Subject" in the group they want to discuss. Clicking on an individual "real Subject" will take them to its respective Subject Talk Page. 
  - Note: as the Subject Group Modal is open, the classification is already being submitted in the background, and the next Subject is being fetched to classify. When the volunteer closes the Subject Group Modal, that next Subject is ready for them.

Context:
- The SubjectGroup subject type is a "pseudo subject" made up of multiple, dynamically-selected "real subjects". Each "pseudo subject" is a _one-off instance_ served to _one volunteer,_ and as such, it doesn't make sense to discuss that pseudo subject on Talk. (Nobody but that one volunteer would have seen it.) Much better if we're able to select which "real subject" in that group the volunteer would want to Talk about - hence, this modal. 
- For more info, see the SubjectGroupViewer (packages/lib-classifier/src/components/Classifier/components/SubjectViewer/components/SubjectGroupViewer/README.md) and the SubjectGroup (packages/lib-classifier/src/store/subjects/SubjectGroup/README.md)

Here's what's required to enable this feature:
- Configure the Workflow to use the SubjectGroupViewer, i.e. `workflow.configuration = {subject_viewer: 'subjectGroup', subject_viewer_config: { ...blah blah... } }`
- That's it. You should see the modal when you click Done & Talk.
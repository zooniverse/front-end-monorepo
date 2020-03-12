# Transcription Task

The transcription task is a task type designed for use in transcription humanities projects. It is a port of the tools experimented with the projects Anti-Slavery Manuscripts and Scribes of the Cairo Geniza. Based on the experiment, the port of these tools include an explicit new task type for transcription and a new drawing tool, the transcription line. 

The task type is very similar to the drawing task with these notable differences:

- The allowed tool type is limited to a single transcription line tool
- The marks that are annotated are limited to the transcription line tool's marks
- Requests to Caesar for previous transcriptions to start a new annotation only happen if this task type is part of the workflow
- The key for the caesar request, `'alice'`, is stored as a constant on the model. This is currently hard coded in the request code in the transcription reductions model, however, if this every needs to be configurable in the future, the transcription task model is an appropriate place for this and can be looked up before a caesar reduction request is made.

When the transcription task is selected in the lab, it will automatically select the transcription line as the tool, have no color options for the tool like standard drawing tools do, and will automatically configure a sub-task with a text task for the tool. These will not be editable. If the caesar key needs to be configurable in the future, we will add an input in its task editor in the lab.
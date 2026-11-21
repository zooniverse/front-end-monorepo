# Form Status And Submit Field

A div that combines the form's Submit button, "busy" indicator, and status messages. The Submit button can be disabled if you just want to show the status messages, e.g. the form uses auto-save but you still want the busy indicator + status messages.

Attributes:

- `showLoader`: (bool, false by default) Should the "busy" indicator be shown? The logic for when to showing the loader (e.g. "form is busy") should be handled in the form itself.
- `showSubmit`: (bool, true by default) Should the Submit button be shown? i.e. is this field being used in a "explicit save" form, or an "autosave" form? IMPORTANT: once the form has decided it has a submit button or not, KEEP it that way. Please do NOT conditionally show/hide the Submit button, as this may be bad for accessibility.
- `submitDisabled`: (boolean, false by default) Disables the Submit button. (Assuming it's rendered.) Usually the submit button is only disabled when a "save" (submit) operation is happening. For accessibility reasons, _don't_ disable the submit button "when there are no changes to be saved", because disabled buttons may not be "seen" by screen readers.
- `submitLabel`: (string, `''` by default) What do you want to label the submit button? "Save"? "Change"?
- `statusMessage`: (string, no default) string to be passed to the [Status Message component.](../../../../../../lib-react-components/src/StatusMessage/README.md) See that component for more details.
- `statusType`: (string, no default) string to be passed to the Status Message component.
- `...rest`: additional attributes to be passed to the _div container (Grommet Box)._

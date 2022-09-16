# formatTimeStamp

A helper function to convert a number to a string formatted as `mm:ss:ms` or `ss:ms`

The Zooniverse video player has a slider who's percentage `timeStamp` values are 0.0 to 1.0. As a video plays, the slider input will progress from 0 (start of the video) to 1 (end of the video). This function converts the decimal number to a human readable timestamp. The returned value is used in the VideoController and sent to the store as a property for temporal drawing tools.

### accepts

**displayTime:** Required. Type: number. Number must be between 0 and 1 having 3 decimal places. This represents the current position (time) on the video slider.

E.g. `0.287` or `0.962`

**duration:** Optional. Type: number. This is the total length of the video. This must be a number with 3 decimal places.

E.g. `4.025` or `8.480`

### returns

The function returns a string representing the current timestamp as `mm:ss` or `hh:ss`.

# formatTimeStamp

A helper function to convert a number in seconds to a human readable string `mm:ss`. We're assuming the timestamp of a video subject is always less than 1 hour.

The Zooniverse video player has a slider who's percentage `timeStamp` values are 0 to 1. As a video subject plays, the slider input will progress from 0 (start of the video) to 1 (end of the video). This function converts the decimal number to a human readable timestamp. The returned value is used in the VideoController and sent to the store as a property for temporal drawing tools.

### accepts

**displayTime:** Required. Type: number. Number must be between 0 and 1. This represents the current position (timeStamp) on the video slider.

E.g. `0.287` or `0.962`

**duration:** Optional. Type: number. This is the total length of the video. This must be a number.

E.g. `4.025` or `8.480`

### returns

The function returns a string representing the current timestamp as `mm:ss`.

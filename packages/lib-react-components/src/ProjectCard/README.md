# ProjectCard

A summary card of a Zooniverse project that links to the project's homepage. This component has four available sizes: `small`, `medium`, `large`, and `xlarge`.

## Example

```js
<ProjectCard
  description={project.description}
  displayName={project.display_name}
  href={project.slug}
  imageSrc={project.avatar_src}
  size='xlarge'
/>
```

export default function slugify(string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s_]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

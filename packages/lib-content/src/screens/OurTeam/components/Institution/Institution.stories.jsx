import Institute from './Institution.jsx'

export default {
  title: 'About / Our Team / Institution',
  component: Institute
}

export const Default = {
  args: {
    name: 'Institution Name',
    people: [
      {
        avatarSrc: 'https://images.ctfassets.net/jt90kyhvp0qv/4VLR5cADevEVF8bvlW6kFN/e9c51f81f54a466e7c77f0d660919afe/59866818-204c8d80-9352-11e9-8fcc-5676aa100fdf.jpg?w=160&h=160',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        jobTitle: 'Science Lead',
        name: 'Cliff Johnson'
      },
      {
        avatarSrc: 'https://images.ctfassets.net/jt90kyhvp0qv/1j7WkbxH80PpAw471yIJHo/e910c138d79260306c01037e237f570c/laura.jpg?w=160&h=160',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        jobTitle: 'Web Developer',
        name: 'Laura Trouille'
      }
    ],
    slug: 'institution-name'
  }
}

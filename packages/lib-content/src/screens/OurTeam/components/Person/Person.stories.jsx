import Person from './Person.jsx'

export default {
  title: 'About / Our Team / Person',
  component: Person
}

export const Default = {
  args: {
    avatarSrc: 'https://images.ctfassets.net/jt90kyhvp0qv/3iT0i6mJxGijAz8HaYviXo/17e8cc9b141165cf5e1d97d4450ae62d/chris-l.png?w=160&h=160',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    jobTitle: 'Job Title',
    name: 'Mock Person'
  }
}

export const PlaceholderAvatar = {
  args: {
    ...Default.args,
    avatarSrc: ''
  }
}

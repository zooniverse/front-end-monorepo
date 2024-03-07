import CloseButton from './CloseButton'
// import readme from './README.md'

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  args: {
    closeFn: () => true
  },
  // parameters: {
  //   docs: {
  //     description: {
  //       component: readme
  //     }
  //   }
  // }
}

export const Default = ({ closeFn }) => (
  <CloseButton closeFn={closeFn} />
)

export const Light = ({ closeFn }) => (
  <CloseButton color='neutral-6' closeFn={closeFn} />
)

export const Disabled = ({ closeFn }) => (
  <CloseButton disabled closeFn={closeFn} />
)

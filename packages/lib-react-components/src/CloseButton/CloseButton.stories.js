import CloseButton from './CloseButton'

export default {
  title: 'Components/CloseButton',
  component: CloseButton
}

export const Default = () => (
  <CloseButton />
)

export const CustomColor = () => (
  <CloseButton color='neutral-6' />
)

export const Disabled = () => (
  <CloseButton disabled />
)

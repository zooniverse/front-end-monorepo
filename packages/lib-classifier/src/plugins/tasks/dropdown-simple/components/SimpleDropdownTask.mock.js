export const SimpleDropdownTaskMockShort = {
  options: [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ],
  labels: {}
}
SimpleDropdownTaskMockShort.options.forEach((opt, i) => {
  SimpleDropdownTaskMockShort.labels[`selects.0.options.*.${i}.label`] = opt;
})


export const SimpleDropdownTaskMockMedium = {
  options: Array.from(Array(40), (_, i) => (i + 1).toString()),
  labels: {}
}
SimpleDropdownTaskMockMedium.options.forEach((opt, i) => {
  SimpleDropdownTaskMockMedium.labels[`selects.0.options.*.${i}.label`] = opt;
})


export const SimpleDropdownTaskMockLong = {
  options: Array.from(Array(200), (_, i) => (i + 1).toString()),
  labels: {}
}
SimpleDropdownTaskMockLong.options.forEach((opt, i) => {
  SimpleDropdownTaskMockLong.labels[`selects.0.options.*.${i}.label`] = opt;
})

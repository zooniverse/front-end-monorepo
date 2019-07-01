function reduceFeedbackMessages (messages) {
  let result = []

  if (messages && messages.length) {
    result = messages.reduce((acc, message) => {
      const messageExists = acc.find(obj => obj.text === message)
      if (messageExists) {
        messageExists.count++
      } else {
        acc.push({ text: message, count: 1 })
      }
      return acc
    }, [])
  }

  return result
}

export default reduceFeedbackMessages

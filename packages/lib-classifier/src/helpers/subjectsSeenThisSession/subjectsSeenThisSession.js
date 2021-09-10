const subjectsSeenThisSession = {
  add: (workflowID, subjectIDs = []) => {
    const storage = (window) ? window.sessionStorage : null
    let seenThisSession = []
    
    if (storage && storage.getItem("subjectsSeenThisSession")) {
      const alreadySeen = storage.getItem("subjectsSeenThisSession")
      seenThisSession = JSON.parse(alreadySeen)
    }

    if (subjectIDs.length > 0 && workflowID && storage) {
      subjectIDs.forEach((subjectID) => {
        const stringID = `${workflowID}/${subjectID}`
        if (!seenThisSession.includes(stringID)) {
          seenThisSession.push(stringID)
        }
      })

      storage.setItem("subjectsSeenThisSession", JSON.stringify(seenThisSession))
    }
  },

  check: (workflowID, subjectID) => {
    const storage = (window) ? window.sessionStorage : null
    const alreadySeen = (storage) ? storage.getItem("subjectsSeenThisSession") : ""
    const seenThisSession = (alreadySeen) ? JSON.parse(alreadySeen) : []

    return seenThisSession.includes(`${workflowID}/${subjectID}`)
  }
}

export default subjectsSeenThisSession
import asyncStates from '@zooniverse/async-states'
import { arrayOf, func, number, shape, string } from 'prop-types'

import { getAllUsers } from './getAllUsers'

async function generateExportWithWorker({ group, projects, stats, users }) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./generateExport.worker.js', import.meta.url))

    // send data to the worker
    worker.postMessage({ group, projects, stats, users })

    // handle messages from the worker
    worker.onmessage = ({ data }) => {
      if (data.error) {
        worker.terminate()
        reject(new Error(data.error)) // reject the promise with the error
      } else {
        const { csvContent, filename } = data

        // create the Blob and object URL on the main thread
        const csvBlob = new Blob([csvContent], { type: 'text/csv' })
        const dataExportUrl = URL.createObjectURL(csvBlob)

        worker.terminate()
        resolve({ filename, dataExportUrl }) // resolve the promise with the result
      }
    }

    // handle errors in the worker
    worker.onerror = (error) => {
      worker.terminate()
      reject(new Error(`Worker error: ${error.message}`)) // reject the promise with the error
    }
  })
}

export async function handleGenerateExport({
  group,
  memberIdsPerStats,
  projects,
  setDownloadUrl,
  setExportProgress,
  setExportStatus,
  setErrorMessage,
  stats
}) {
  setExportStatus(asyncStates.loading)
  setExportProgress(0)

  try {
    // fetch all users for the group
    const allUsers = await getAllUsers({ memberIdsPerStats, setExportProgress })
    
    // update exportStatus state to success
    setExportStatus(asyncStates.success)
    await new Promise(resolve => setTimeout(resolve, 0)) // helps React process the exportStatus state update

    // generate the export using a Web Worker
    const { filename, dataExportUrl } = await generateExportWithWorker({
      group,
      projects,
      stats,
      users: allUsers
    })

    // set the download URL and filename
    setDownloadUrl({ url: dataExportUrl, filename })
  } catch (error) {
    console.error('Error generating export: ', error)
    setErrorMessage(error.message)
    setExportStatus(asyncStates.error)
  }
}

handleGenerateExport.propTypes = {
  group: shape({
    id: string,
    display_name: string
  }),
  memberIdsPerStats: arrayOf(string),
  projects: arrayOf(shape({
    display_name: string,
    id: string
  })),
  setDownloadUrl: func,
  setExportProgress: func,
  setExportStatus: func,
  setErrorMessage: func,
  stats: shape({
    group_member_stats_breakdown: arrayOf(shape({
      user_id: number,
      count: number,
      session_time: number,
      project_contributions: arrayOf(shape({
        project_id: number,
        count: number,
        session_time: number
      }))
    }))
  })
}

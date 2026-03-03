import { lazy, Suspense } from 'react'

const VolumetricPreview = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer/VolumetricPreview'))

function VolumetricViewer({ jsonData }) {
  // Destructure data from jsonData
  const { data: volumetricData } = jsonData || {}

  const config = {
    subject: {
      subjectJSON: volumetricData
    },
    view: 'preview'
  }

  return <Suspense fallback={<p>Loading Volumetric Viewer...</p>}>
    <VolumetricPreview {...config} />
  </Suspense>
}

export default VolumetricViewer

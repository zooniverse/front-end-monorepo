import { lazy, Suspense } from 'react'

const VolumetricPreview = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer/VolumetricPreview'))

function VolumetricViewer({ data }) {
  const config = {
    subject: {
      subjectJSON: data
    },
    view: 'preview'
  }

  return <Suspense fallback={<p>Loading Volumetric Viewer...</p>}>
    <VolumetricPreview {...config} />
  </Suspense>
}

export default VolumetricViewer

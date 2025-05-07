import { lazy, Suspense } from 'react'

const VolumetricViewerComponent = lazy(() => import('@zooniverse/subject-viewers/VolumetricViewer').then(module => {
  return { default: module.default.Preview }
}))

function VolumetricViewer({ data }) {
  const config = {
    subject: {
      subjectJSON: data
    },
    view: 'preview'
  }

  return <Suspense fallback={<p>Loading Volumetric Viewer...</p>}>
    <VolumetricViewerComponent {...config} />
  </Suspense>
}

export default VolumetricViewer

async function getViewer (viewer) {
  let view = null;

  if (viewer === '__TEST__') {
    view = await import('./MockViewer');
  } else if (viewer === 'dataImage') {
    view = await import('./../../components/DataImageViewer');
  } else if (viewer === 'flipbook') {
    view = await import('./../../components/FlipbookViewer');
  } else if (viewer === 'jsonData') {
    view = await import('./../../components/JSONDataViewer');
  } else if (viewer === 'imageAndText') {
    view = await import('./../../components/ImageAndTextViewer');
  } else if (viewer === 'lightCurve') {
    view = await import('./../../components/JSONDataViewer');
  } else if (viewer ==='multiFrame') {
    view = await import('./../../components/MultiFrameViewer');
  } else if (viewer ==='scatterPlot') {
    view = await import('./../../components/JSONDataViewer');
  } else if (viewer === 'singleImage') {
    view = await import('./../../components/SingleImageViewer');
  } else if (viewer ==='singleText') {
    view = await import('./../../components/SingleTextViewer');
  } else if (viewer === 'singleVideo') {
    view = await import('./../../components/SingleVideoViewer');
  } else if (viewer ==='subjectGroup') {
    view = await import('./../../components/SubjectGroupViewer');
  } else if (viewer === 'variableStar') {	
    view = await import('./../../components/JSONDataViewer');
  } else if (viewer === 'volumetric') {
    const module = await import('@zooniverse/subject-viewers');
    view = module.VolumetricViewerData;
  };

  if (view && view.default) view = view.default;

  return view;
}

export default getViewer

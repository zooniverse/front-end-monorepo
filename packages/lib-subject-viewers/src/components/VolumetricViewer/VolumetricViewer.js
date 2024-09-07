import { useEffect, useState } from 'react'
import { Buffer } from 'buffer'
import { ComponentViewer } from "./components/ComponentViewer.js";
import { ModelViewer } from "./components/ModelViewer.js";
import { ModelAnnotations } from "./components/ModelAnnotations.js";
import { ModelTool } from "./components/ModelTool.js";

export default function VolumetricViewerComponent ({
  config,
  subjectUrl = 'https://panoptes-uploads-staging.zooniverse.org/subject_location/1101682c-5ffc-41ad-9c9d-8dd80682fa76.json',
  models
}) {
  const [ data, setData ] = useState(null);
  if (!models) {
    const [ data ] = useState({
      annotations: ModelAnnotations(),
      tool: ModelTool(),
      viewer: ModelViewer(),
    });
    models = data;
  }

  useEffect(() => {
    fetch(subjectUrl)
      .then((res) => res.json())
      .then((data) => {
        // data is base64. Convert to Uint8 array
        setData(Buffer.from(data, "base64"));
      });
  }, []);

  if (!data || !models) return <div>Loading...</div>;

  return (
    <ComponentViewer
      config={config}
      data={data}
      models={models}
    />
  )
}

export const VolumetricViewerData = (params) => {
  return {
    data: {
      config: {},
      subjectUrl: params?.subjectUrl ?? 'https://panoptes-uploads-staging.zooniverse.org/subject_location/1101682c-5ffc-41ad-9c9d-8dd80682fa76.json',
      models: {
        annotations: ModelAnnotations(),
        tool: ModelTool(),
        viewer: ModelViewer(),
      }
    },
    component: VolumetricViewerComponent
  };
};

import GeoMapViewer from './GeoMapViewer'

export default {
  title: 'Subject Viewers / GeoMapViewer',
  component: GeoMapViewer,
}

export const Default = {
  args: {},
}

export const EiffelTower = {
  args: {
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [2.2944810, 48.8583701]
          },
          properties: {
            name: 'Eiffel Tower'
          }
        }
      ]
    }
  }
}

export const StatueOfLiberty = {
  args: {
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-74.0445004, 40.6892494]
          },
          properties: {
            name: 'Statue of Liberty',
            uncertainty_radius: 1301
          }
        }
      ]
    }
  }
}

export const FourCornersMarker = {
  args: {
    geoJSON: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-109.0451723, 36.9989766]

          },
          properties: {
            name: 'Four Corners Monument',
            uncertainty_radius: 610
          }
        }
      ]
    }
  }
}

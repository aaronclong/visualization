import { GeoJSON } from 'react-leaflet'

/**
 * This module was coppied from:
 * https://github.com/open-austin/austingreenmap/blob/master/client/js/components/GeoJsonUpdatable.jsx
 * It allows for GeoJSON to be rerender and not coddified on load.
 */
class GeoJsonUpdatable extends GeoJSON {
  componentWillReceiveProps (prevProps) {
    if (prevProps.data !== this.props.data) {
      // Removes old data
      this.leafletElement.clearLayers()
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.data !== this.props.data) {
      // Adds new data to the map
      this.leafletElement.addData(this.props.data)
    }

    if (prevProps.visibleIds !== this.props.visibleIds) {
      this.leafletElement.eachLayer((layer) => {
        if (this.props.visibleIds.indexOf(layer.feature.id) === -1) {
          layer.setStyle({fillOpacity: 0, opacity: 0})
        } else {
          layer.setStyle({fillOpacity: 0.4, opacity: 1})
        }
      })
    }
  }
}

export default GeoJsonUpdatable
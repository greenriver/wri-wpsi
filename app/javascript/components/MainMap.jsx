import React from 'react'
import { Map, TileLayer, ZoomControl, LayersControl } from 'react-leaflet'
import SearchBox from 'components/SearchBox'
import RegionInfoBox from 'components/RegionInfoBox'
import ConflictRiskLayer from 'components/ConflictRiskLayer'

class MainMap extends React.Component {
  constructor(props) {
    super(props)

    const datasetId = '0c3dfe3b-2cd5-4125-ac84-9ce0a73f34b3'
    const layerId = '107b72a6-6a52-4c8e-a261-d01706627322'
    this.layerURL = `http://api.resourcewatch.org/v1/dataset/${datasetId}/layer/${layerId}`
    this.mapHeight = 800

    this.state = {
      initialPosition: [
        0, // Latitude
        0, // Longitude
      ],
      intitialZoom: 4,
      data: null,
      layerConfig: null,
      legendConfig: null,
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchLayer(this.layerURL)
  }

  optionsForCountrySearch() {
    return this.optionsForSearch('gid_0', 'name_0')
  }

  optionsForRegionSearch() {
    return this.optionsForSearch('gid_2', 'name_2')
  }

  optionsForSearch(valueField, labelField) {
    const features = this.state.data && this.state.data.features || []

    let dictionary = {}

    features.forEach((feature) => (
      dictionary[feature.properties[valueField]] = feature.properties[labelField]
    ))

    return Object.keys(dictionary).map((value) => {
      return {
        value: value,
        label: dictionary[value],
      }
    }).sort((a, b) => (a.label > b.label) ? 1 : -1)
  }

  getSelectedRegion() {
    const features = this.state.data && this.state.data.features || []
    let selectedRegion = null

    features.forEach((feature) => {
      if (feature.properties.gid_2 === this.state.selectedRegionGid2) {
        selectedRegion = feature
      }
    })

    return selectedRegion
  }

  countries() {
    return [
      'ETH',
      'SOM',
      'KEN',
      // 'IND',
    ]
  }

  fetchLayer(url) {
    fetch(url)
      .then(response => response.json())
      .then(layer => {
        this.setState(layer.data.attributes)
        this.fetchLayerData(this.state.layerConfig.body.layers[0])
      })
  }

  fetchLayerData(layer) {
    const sql = layer.options.sql
    const scope = `WHERE gid_0 IN ('${this.countries().join("', '")}')`

    fetch(`https://wri-rw.carto.com:443/api/v2/sql?format=geojson&q=${sql} ${scope}`)
      .then(response => response.json())
      .then(data => this.setState({ data, loading: false }))
  }

  handleCountrySelection(selectedRegionGid0) {
    this.setState({selectedRegionGid0: selectedRegionGid0})
  }

  handleRegionSelection(selectedRegionGid2) {
    this.setState({selectedRegionGid2: selectedRegionGid2})
  }

  handleLayerSelection(selectedLayer) {
    selectedLayer.bringToFront()
    this.zoomToLayer(selectedLayer)
    this.setState({selectedLayer: selectedLayer})
  }

  zoomToLayer(layer) {
    this.setState({mapBounds: layer.getBounds()})
  }

  clickToFeature(e) {
    const layer = e.target
    this.handleLayerSelection(layer)
    this.handleRegionSelection(layer.feature.properties.gid_2)
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: this.clickToFeature.bind(this),
    })
  }

  renderBasemaps() {
    const maxZoom = 19
    const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    const basemaps = [
      {name: 'Positron',                         url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'              },
      {name: 'Dark Matter',                      url: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'               },
      {name: 'Positron (No Labels)',             url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'         },
      {name: 'Dark Matter (No Labels)',          url: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'          },
      {name: 'CartoDB World Antique',            url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png' },
      {name: 'CartoDB World Eco',                url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png'     },
      {name: 'CartoDB World Flat Blue',          url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png'},
      {name: 'CartoDB World Midnight Commander', url: 'https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png'},
    ]
    const initialBasemap = 'Positron'

    return basemaps.map((basemap) => (
      <LayersControl.BaseLayer
        key={basemap.name}
        name={basemap.name}
        checked={basemap.name === initialBasemap}
      >
        <TileLayer
          url={basemap.url}
          attribution={attribution}
          maxZoom={maxZoom}
        />
      </LayersControl.BaseLayer>
    ))
  }

  render() {
    const features = this.state.data && this.state.data.features || []
    const selectedRegion = this.getSelectedRegion()

    return <React.Fragment>
      {this.state.loading ?
        <div style={{height: this.mapHeight, backgroundColor: '#EEE'}}>
          <div style={{maxWidth: '200px', margin: 'auto', paddingTop: this.mapHeight / 2}}>
            Loading...
          </div>
        </div>
        :
        <Map
          center={this.state.initialPosition}
          bounds={this.state.mapBounds}
          zoomControl={false}
          zoom={this.state.intitialZoom}
          minZoom={this.state.layerConfig.body.minzoom}
          maxZoom={this.state.layerConfig.body.maxzoom}
          style={{height: this.mapHeight}}
        >
          <ZoomControl position='topright' />
          <LayersControl position='topright'>

            {this.renderBasemaps()}

            <LayersControl.Overlay name={this.state.name} checked={true}>
              <ConflictRiskLayer
                name={this.state.name}
                features={features}
                selectedRegionGid0={this.state.selectedRegionGid0}
                selectedRegionGid2={this.state.selectedRegionGid2}
                onEachFeature={this.onEachFeature.bind(this)}
              />
            </LayersControl.Overlay>
          </LayersControl>
        </Map>
      }

      <SearchBox
        name='countries'
        options={this.optionsForCountrySearch()}
        onSelection={this.handleCountrySelection.bind(this)}
      />

      <SearchBox
        name='regions'
        options={this.optionsForRegionSearch()}
        onSelection={this.handleRegionSelection.bind(this)}
      />

      {selectedRegion && <RegionInfoBox region={selectedRegion} />}
    </React.Fragment>
  }
}

export default MainMap

import React from 'react'
import ResourceWatchMap from 'components/ResourceWatchMap'
import { DATASETS } from 'components/datasets'

const MapPage = () => {
  const [datasets, setDatasets] = React.useState([DATASETS[0]])

  const handleAdd = (e) => {
    addDataset({id: e.target.id})
  }

  const handleRemove = (e) => {
    removeDataset({id: e.target.id})
  }

  const addDataset = (dataset) => {
    setDatasets([dataset].concat(datasets))
  }

  const removeDataset = (dataset) => {
    setDatasets(datasets.filter((d) => d.id != dataset.id))
  }

  const toggleMapLayerGroup = ({ dataset, toggle }) => {
    if (toggle) {
      addDataset(dataset)
    } else {
      removeDataset(dataset)
    }
  }

  const renderDatasetsTable = (title, rows) => {
    return (
      <React.Fragment>
        <h1>{title}</h1>

        <table>
          <tbody>
            {rows.map((row) => {
              const datasetOnMap = datasets.map((d) => d.id).includes(row.id)

              return <tr key={row.name + row.id}>
                <td>{row.name}</td>
                <td>
                  <button id={row.id} onClick={datasetOnMap ? handleRemove : handleAdd}>
                    {datasetOnMap ? 'Remove' : 'Add'}
                  </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </React.Fragment>
    )
  }

  const tableStyle = {
    position: 'absolute',
    height: 500 - 40,
    bottom: 0,
    margin: 20,
  }

  return <React.Fragment>
    <ResourceWatchMap
      params={{
        datasetIds: DATASETS.map((dataset) => dataset.id),
        // datasetIds: ['0c3dfe3b-2cd5-4125-ac84-9ce0a73f34b3'],
      }}
      datasets={datasets.map((dataset) => dataset.id)}
      toggleMapLayerGroup={toggleMapLayerGroup}
      bottomGutter={500}
    />
    <div style={tableStyle}>
      {renderDatasetsTable('Datasets', DATASETS)}
    </div>
  </React.Fragment>
}

export default MapPage

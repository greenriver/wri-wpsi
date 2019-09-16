import React from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'components/Modal'

const LayerInfoPage = ({ match, history }) => {
  const { params } = match

  const layerId = params.layerId
  const layer = window.layers.find(layer => layer.id === layerId)
  const info = layer && layer.long_description || 'A long description of this dataset is not yet available.'

  return (
    <Modal>
      <h1>{layer ? layer.name : 'Dataset information not available'}</h1>

      <p dangerouslySetInnerHTML={{__html: info}} />

      <button onClick={() => history.goBack()}>Close</button>
    </Modal>
  )
}

import PropTypes from 'prop-types'
LayerInfoPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(LayerInfoPage)

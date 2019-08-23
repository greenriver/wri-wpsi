import React from 'react'

const Modal = ({ children }) => {
  const modalBackgroundStyle = {
    position: 'fixed',
    zIndex: '10001',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)',
  }
  const modalStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  }

  return (
    <div style={modalBackgroundStyle} id='modal-background'>
      <div style={modalStyle} id='modal'>
        {children}
      </div>
    </div>
  )
}

import PropTypes from 'prop-types'
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Modal
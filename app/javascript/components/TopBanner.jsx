import React from 'react'
import MenuBar from 'components/MenuBar'

const TopBanner = () => {
  return <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 10000,
      backgroundColor: 'white',
    }}>
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderBottom: '1px solid #B8C5D0',
    }}>
      <div style={{
        margin: '19px',
        fontSize: '33px',
        lineHeight: '40px',
      }}>
        Water, Peace & Security
      </div>
      <MenuBar selectedItem='map' onClick={() => null} />
    </div>
  </div>
}

export default TopBanner

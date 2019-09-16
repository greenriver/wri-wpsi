import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TopBanner from 'components/TopBanner'
import MapPage from 'components/MapPage'
import AboutPage from 'components/AboutPage'
import MethodologyPage from 'components/MethodologyPage'
import LayersList from 'components/LayersList'
import LayerMapPage from 'components/LayerMapPage'
import LayerInfoPage from 'components/LayerInfoPage'
import { Icons } from 'vizzuality-components'

const App = () => {
  const globalStyles = {
    font: '14px/16px Myriad Pro, PT Sans, Arial, Helvetica, sans-serif',
    color: '#4D4D4D',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <BrowserRouter>
      <div style={globalStyles}>
        <TopBanner />

        {/* Landing page with map */}
        <Route path="/map" component={MapPage} />
        <Route path="/map/learn_more/:layerId" component={LayerInfoPage} />

        {/* Static pages */}
        <Route path="/about" component={AboutPage} />
        <Route path="/methodology" component={MethodologyPage} />

        {/* Debugging pages, remove before going live! */}
        <Route path="/layers" exact component={LayersList} />
        <Route path="/layers/:layerId" component={LayerMapPage} />
        <Route path="/datasets/:datasetId" component={LayerMapPage} />
      </div>

      {/* Include Vizzuality icons for use in other Vizzuality components */}
      <Icons />
    </BrowserRouter>
  )
}

export default App

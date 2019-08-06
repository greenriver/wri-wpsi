// Original source:
// https://github.com/resource-watch/resource-watch/blob/develop/components/ui/map/controls/SearchControl.js

import React from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import * as actions from 'layout/explore/explore-actions';

// Components
import Geosuggest from 'react-geosuggest';
import { Icon } from 'vizzuality-components';

// Utils
// import { logEvent } from 'utils/analytics';

class SearchControl extends React.Component {
  static propTypes = { setMapLocation: PropTypes.func.isRequired };

  state = { showSearchInput: false };

  // UI EVENTS
  onToggleSearchInput = (to) => {
    this.setState({ showSearchInput: to }, () => {
      if (this.state.showSearchInput) {
        this.geosuggest.focus();
      }
    });
  }

  onSuggestSelect = (e) => {
    if (e) {
      const { gmaps, location } = e;
      const viewport = gmaps.geometry && gmaps.geometry.viewport;

      if (viewport) {
        const viewPortKeys = Object.keys(viewport);
        this.props.setMapLocation({
          bbox: [
            viewport[viewPortKeys[1]].j, viewport[viewPortKeys[0]].j,
            viewport[viewPortKeys[1]].l, viewport[viewPortKeys[0]].l
          ]
        });
      }

      if (!viewport && location) {
        this.props.setMapLocation({
          ...location,
          zoom: 7
        });
      }

      // if ('label' in e) {
      //   logEvent('Explore map', ' Search for a place', e.label);
      // }

      this.onToggleSearchInput(false);
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  // RENDER
  render() {
    const { showSearchInput } = this.state;
    const className = 'c-map-search-control';

    return (
      <div className={className}>
        {showSearchInput &&
          <Geosuggest
            ref={(r) => { this.geosuggest = r; }}
            onSuggestSelect={this.onSuggestSelect}
            onKeyDown={this.onKeyDown}
            bounds={{south: -31.5, west: -41.6, north: 67.2, east: 49.1}}
            types={['(regions)']}
          />
        }
        <button
          type="button"
          className="search-button"
          onClick={() => this.onToggleSearchInput(!showSearchInput)}
        >
          <Icon name="icon-search" className="-small" />
        </button>
      </div>
    );
  }
}

export default SearchControl;

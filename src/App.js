import React, { Component } from 'react';
import Flat from './components/flat';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      flats: []
    }
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
    .then(res => res.json())
    .then(data => {
      this.setState({
        flats: data,
        selectedFlat: null
      })
    })
  }
  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    })
  }

  render() {
    let center = {
      lat: 48.85,
      lng: 2.35
    }
    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      }
    }
    return (
      <div className='app'>
        <div className='flats-list'>
          {this.state.flats.map(flat => <Flat
            key={flat.name}
            flat={flat}
            selectFlat={this.selectFlat}/>
          )}
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
           zoom={11}>
          {this.state.flats.map(flat => <Marker
            key={flat.name}
            lat={flat.lat}
            lng={flat.lng}
            price={flat.price}/>)}
        </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;

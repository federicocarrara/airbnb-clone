import React, { Component } from 'react';
import Flat from './components/flat';
import './App.css';
import GoogleMapReact from 'google-map-react';
import Marker from './components/marker';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      search: ''
    }
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
    .then(res => res.json())
    .then(data => {
      this.setState({
        flats: data,
        // add allFlatts just because considering we are working with a boilerplate and not an API
        // when we filter we are renaming the this.flat with only the filtered flats
        allFlats: data,
        selectedFlat: null
      })
    })
  }
  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    })
  }
  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      flats: this.state.allFlats.filter(flat => {
        return flat.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
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
        <div className='main'>
          <div className="input">
            <input
            placeholder="Search"
            value={this.state.search}
            onChange={this.handleSearch}></input>
          </div>
          <div className='flats-list'>
            {this.state.flats.map(flat => <Flat
              key={flat.name}
              flat={flat}
              selectFlat={this.selectFlat}/>
            )}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            center={center}
           zoom={11}>
          {this.state.flats.map(flat => <Marker
            key={flat.name}
            lat={flat.lat}
            lng={flat.lng}
            price={flat.price}
            selected={flat === this.state.selectedFlat}/>)}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;

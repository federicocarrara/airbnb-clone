import React, { Component } from 'react';
import './flat.css';

class Flat extends Component {
  handleClick = () => {
    this.props.selectFlat(this.props.flat)
  }
  render() {
    const title = `${this.props.flat.price} ${this.props.flat.priceCurrency} ${this.props.flat.name}`;
    return (
      <div className='flat' onClick={this.handleClick}>
        <div className='flat-picture'>
          <img alt='flatImg' src={this.props.flat.imageUrl} />
        </div>
        <div className='flat-title'> {title} </div>
      </div>
    );
  }
}

export default Flat;

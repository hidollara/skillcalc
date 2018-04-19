import React from 'react';

class GradientSVG extends React.Component {
  render() {
    let stops = [];
    for (let offset in this.props.stops) {
      stops.push(<stop offset={`${offset}%`} stopColor={this.props.stops[offset]} />)
    }
    return (
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id={this.props.id}>
            {stops}
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default GradientSVG;

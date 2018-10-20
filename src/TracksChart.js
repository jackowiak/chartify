import React, {Component} from 'react';

export default class TracksChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.chart.map((c, i) => {
            return (
              <div key={i}>{c.name}</div>
            )
          })
        }
      </div>
    )
  }
}

import React, {Component} from 'react';

export default class ArtistsChart extends Component {
  constructor(props) {
    super(props);
  }

  showId = (id) => {
    this.props.fetchArtistsData(id);
  }

  render() {
    return (
      <div>
        {
          this.props.chart.map((c, i) => {
            return (
              <div key={i} onClick={() => this.showId(c.id)}>{c.name}</div>
            )
          })
        }
      </div>
    )
  }
}

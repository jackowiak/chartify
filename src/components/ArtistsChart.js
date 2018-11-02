import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

export default class ArtistsChart extends Component {
  render() {
    return (
      <Row>
        <Col xs={{ size: 8, offset: 2 }}>
          {
            this.props.payload.map((x, i) => {
              return (
                <Row key={i} className="artist-profile">
                  <Col xs={{ size: 4 }} className="pics">
                    <div className="image-container">
                      <img src={x.images[2].url} />
                    </div>
                  </Col>
                  <Col xs={{ size: 8 }}>
                    <Row className="artist-profile-name">{`${i + 1}. `}{x.name}</Row>
                    <Row className="artist-profile-genres">
                      {(x.genres.filter((y, j) => j < 2)).join(', ')}
                    </Row>
                  </Col>
                </Row>
              )
            })
          }
        </Col>
      </Row >
    )
  }
}

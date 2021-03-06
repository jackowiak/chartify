import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

export default class TracksChart extends Component {
  render() {
    return (
      <Row>
        <Col xs={{ size: 8, offset: 2 }}>
          {
            this.props.payload.map((x, i) => {
              return (
                <Row key={i} className="tracks-profile">
                  <Col xs={{ size: 4 }} className="pics">
                    <div className="image-container">
                      <img src={x.album.images[2].url} alt="artist" />
                    </div>
                  </Col>
                  <Col xs={{ size: 8 }}>
                    <Row className="tracks-profile-name">{`${i + 1}. `}{x.name}</Row>
                    <Row className="tracks-profile-artist">{x.artists[0].name}</Row>
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

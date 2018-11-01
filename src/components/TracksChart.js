import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export default class TracksChart extends Component {

  render() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          {
            this.props.payload.map((x, i) => {
              return (
                <Row key={i} className="tracks-profile">
                  <Col md={{ size: 4 }} className="pics">
                    <div className="image-container">
                      <img src={x.album.images[2].url} />
                    </div>
                  </Col>
                  <Col md={{ size: 8 }}>
                    <Row className="tracks-profile-name">{`${i + 1}.`}{x.name}</Row>
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

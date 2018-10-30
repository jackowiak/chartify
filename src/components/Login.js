import React, { Component } from 'react';

import { Row, Col, Button } from 'reactstrap';

import '../styles.css';

export default class Login extends Component {
    render() {
        return (
            <Row className="login-view align-items-center">
                <Col md={{ size: 6, offset: 3 }}>
                    <Button color="primary" onClick={this.props.logSpotify}>Log in to Spotify!</Button>
                </Col>
            </Row>
        )
    }
}
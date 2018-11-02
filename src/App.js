import React, { Component } from 'react';

import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';

import ArtistsChart from './components/ArtistsChart';
import TracksChart from './components/TracksChart';
import Login from './components/Login';
import { Loader } from './extras/Loader';

const queryString = require('query-string');
const types = { artists: 'artists', tracks: 'tracks' };
const ranges = { shortTerm: 'short_term', mediumTerm: 'medium_term', longTerm: 'long_term' };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: types.tracks,
      range: ranges.shortTerm,
      payload: [],
      connectedWithSpotify: false,
      rangeDropdownOpen: false,
      typeDropdownOpen: false,
      loading: false
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    if (accessToken) {
      this.setState({ connectedWithSpotify: true });
    };
  }

  toggleRange = () => {
    this.setState(prevState => ({
      rangeDropdownOpen: !prevState.rangeDropdownOpen
    }));
  }

  toggleType = () => {
    this.setState(prevState => ({
      typeDropdownOpen: !prevState.typeDropdownOpen
    }));
  }

  logSpotify = () => {
    window.location = "https://mybackend-chartify-dt.herokuapp.com/login";
  }

  loading = () => {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 900)
  }

  fetchTopChartByType = type => {
    this.setState({ loading: true }, () => {
      this.loading();

      const parsed = queryString.parse(window.location.search);
      const accessToken = parsed.access_token;

      const API_CALL = `https://api.spotify.com/v1/me/top/${type}?time_range=${this.state.range}`;

      axios.get(API_CALL, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(data => {
        this.setState({ type, payload: data.data.items })
      });
    });
  }

  fetchTopChartByRange = range => {
    this.setState({ loading: true }, () => {
      this.loading();

      const parsed = queryString.parse(window.location.search);
      const accessToken = parsed.access_token;

      const API_CALL = `https://api.spotify.com/v1/me/top/${this.state.type}?time_range=${range}`;

      axios.get(API_CALL, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }).then(data => {
        this.setState({ range, payload: data.data.items })
      });
    });
  }

  render() {
    return (
      <Container>
        {
          !this.state.connectedWithSpotify ?
            <Login logSpotify={this.logSpotify} />
            :
            <Row>
              <Col>
                <Row>
                  <Col xs={{ size: 6, offset: 3 }} className="title" >
                    <h4>Your favourite artists and tracks on Spotify</h4>
                  </Col>
                </Row>
                <Row className="selectors">
                  <Col xs={{ size: 1, offset: 5 }}>
                    <Dropdown isOpen={this.state.rangeDropdownOpen} toggle={this.toggleRange}>
                      <DropdownToggle caret color="primary">
                        Range
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.fetchTopChartByRange(ranges.shortTerm)}>Last month</DropdownItem>
                        <DropdownItem onClick={() => this.fetchTopChartByRange(ranges.mediumTerm)}>Last 6 months</DropdownItem>
                        <DropdownItem onClick={() => this.fetchTopChartByRange(ranges.longTerm)}>All time</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col xs={{ size: 1 }}>
                    <Dropdown isOpen={this.state.typeDropdownOpen} toggle={this.toggleType}>
                      <DropdownToggle caret color="primary">
                        Type
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.fetchTopChartByType(types.artists)}>Artist</DropdownItem>
                        <DropdownItem onClick={() => this.fetchTopChartByType(types.tracks)}>Track</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                </Row>
                {
                  this.state.type && this.state.range &&
                    this.state.loading ?
                    <Loader />
                    :
                    this.state.type === types.artists ?
                      <ArtistsChart payload={this.state.payload} />
                      :
                      <TracksChart payload={this.state.payload} />
                }
              </Col>
            </Row>
        }
      </Container>
    );
  }
}

export default App;

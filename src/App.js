import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios';

import ArtistsChart from './components/ArtistsChart';
import TracksChart from './components/TracksChart';
import ArtistsOverview from './components/ArtistsOverview';
import Login from './components/Login';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const queryString = require('query-string');
const types = { artists: 'artists', tracks: 'tracks' };
const ranges = { shortTerm: 'short_term', mediumTerm: 'medium_term', longTerm: 'long_term' };

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: types.artists,
      range: ranges.shortTerm,
      payload: {
        charts: {
          artists: [],
          tracks: []
        },
        artistsOverview: {
          features: [],
          overview: [],
          active: false
        }
      },
      connectedWithSpotify: false,
      rangeDropdownOpen: false,
      typeDropdownOpen: false
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

  componentDidMount() {
    if (this.state.connectedWithSpotify) this.fetchTopChart();
  }

  logSpotify = () => {
    window.location = "http://localhost:8888/login";
  }

  handleType = type => {
    this.setState({ type: type }, () => this.fetchTopChart());
  }

  handleRange = range => {
    this.setState({ range: range }, () => this.fetchTopChart());
  }

  fetchTopChart = () => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    const API_CALL = `https://api.spotify.com/v1/me/top/${this.state.type}?time_range=${this.state.range}`;

    axios.get(API_CALL, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(data => {
      this.setState({
        payload: {
          ...this.state.payload,
          charts: {
            artists: this.state.type === "artists" ? data.data.items : [],
            tracks: this.state.type === "tracks" ? data.data.items : []
          }
        },
        connectedWithSpotify: true
      }, () => console.log(this.state.payload))
    });
  }

  fetchArtistsData = (id) => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    const artists_id = id;
    const API_CALL = `https://api.spotify.com/v1/artists/${artists_id}/albums?include_groups=appears_on`;

    axios.get(API_CALL, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(data => {
      this.setState({
        payload: {
          ...this.state.payload,
          artistsOverview: {
            ...this.state.payload.artistsOverview,
            features: data.data
          }
        }
      })
    });

    const API_CALL_2 = `https://api.spotify.com/v1/artists/${artists_id}`;

    axios.get(API_CALL_2, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(data => {
      this.setState({
        payload: {
          ...this.state.payload,
          artistsOverview: {
            ...this.state.payload.artistsOverview,
            overview: data.data,
            active: true
          }
        }
      })
    });
  }

  render() {
    return (
      <Container>
        {
          this.state.connectedWithSpotify ?
            <Login logSpotify={this.logSpotify} />
            :
            <div>
              <Dropdown isOpen={this.state.rangeDropdownOpen} toggle={this.toggleRange}>
                <DropdownToggle caret>
                  Range
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={range => this.handleRange(ranges.longTerm)}>Long</DropdownItem>
                  <DropdownItem onClick={range => this.handleRange(ranges.mediumTerm)}>Medium</DropdownItem>
                  <DropdownItem onClick={range => this.handleRange(ranges.shortTerm)}>Short</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown isOpen={this.state.typeDropdownOpen} toggle={this.toggleType}>
                <DropdownToggle caret>
                  Type
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={type => this.handleType(types.artists)}>Artist</DropdownItem>
                  <DropdownItem onClick={type => this.handleType(types.tracks)}>Track</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {
                (this.state.connectedWithSpotify) ?
                  (this.state.type === 'artists') ?
                    <ArtistsChart
                      chart={this.state.payload.charts.artists}
                      fetchArtistsData={this.fetchArtistsData}
                      artistsOverview={this.state.payload.artistsOverview}
                    />
                    :
                    <TracksChart
                      chart={this.state.payload.charts.tracks}
                    />
                  :
                  null
              }

              {
                this.state.payload.artistsOverview.active ?
                  <ArtistsOverview artistsOverview={this.state.payload.artistsOverview} />
                  :
                  null
              }
            </div>
        }
      </Container>
    );
  }
}

export default App;

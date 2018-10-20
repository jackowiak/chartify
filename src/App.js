import React, { Component } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import ArtistsChart from './ArtistsChart';
import TracksChart from './TracksChart';
const queryString = require('query-string');

const types = {artists: 'artists', tracks: 'tracks'};
const ranges = {shortTerm: 'short_term', mediumTerm: 'medium_term', longTerm: 'long_term'};

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
        artistOverview: []
      },
      connectedWithSpotify: false
    };
  }

  componentDidMount() {
    if (this.state.connectedWithSpotify) this.fetchTopChart();
  }

  logSpotify = () => {
    window.location = "http://localhost:8888/login";
  }

  handleType = type => {
    this.setState({type: type}, () => this.fetchTopChart());
  }

  handleRange = range => {
    this.setState({range: range}, () => this.fetchTopChart());
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
          artistOverview: data.data
        }
      })
    })
  }

  render() {
    return (
      <div>
        <Button onClick={this.logSpotify}>Log in to Spotify!</Button>
        <ul>
          <li><Button onClick={type => this.handleType(types.artists)}>{types.artists}</Button></li>
          <li><Button onClick={type => this.handleType(types.tracks)}>{types.tracks}</Button></li>
        </ul>
        <ul>
          <li><Button onClick={range => this.handleRange(ranges.shortTerm)}>Short</Button></li>
          <li><Button onClick={range => this.handleRange(ranges.mediumTerm)}>Medium</Button></li>
          <li><Button onClick={range => this.handleRange(ranges.longTerm)}>Long</Button></li>
        </ul>
        {
          (this.state.connectedWithSpotify) ?
            (this.state.type === 'artists') ?
            <ArtistsChart chart={this.state.payload.charts.artists} fetchArtistsData={this.fetchArtistsData} />
            :
            <TracksChart chart={this.state.payload.charts.tracks} />
          :
          null
        }
      </div>
    );
  }
}

export default App;

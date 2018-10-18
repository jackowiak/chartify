import React, { Component } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
const queryString = require('query-string');

const types = {artists: 'artists', tracks: 'tracks'};
const ranges = {shortTerm: 'short_term', mediumTerm: 'medium_term', longTerm: 'long_term'};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: types.artists,
      range: ranges.shortTerm,
      payload: [],
      connectedWithSpotify: false
    };
  }

  componentDidMount() {
    if (this.state.loaded) this.fetchData();
  }

  logSpotify = () => {
    window.location = "http://localhost:8888/login";
    this.setState({connectedWithSpotify: true})
  }

  handleType = type => {
    this.setState({type: type}, () => this.fetchData());
  }

  handleRange = range => {
    this.setState({range: range}, () => this.fetchData());
  }

  fetchData = () => {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;
    const API_CALL = `https://api.spotify.com/v1/me/top/${this.state.type}?time_range=${this.state.range}`;

    axios.get(API_CALL, {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(data => {
      this.setState({payload: data.data.items}, () => console.log(data))
    });
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
          this.state.payload ?
          this.state.payload.map((track, i) => {
            return (
              <div key={i}>{track.name}</div>
            )
          })
          :
          null
        }
      </div>
    );
  }
}

export default App;

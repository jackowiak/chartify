import React, { Component } from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import {TrackView} from './TrackView';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const queryString = require('query-string');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        type: ['artists', 'tracks'],
        range: ['shortterm', 'mediumterm', 'longterm']
      },
      artists: {
        shortterm: [],
        mediumterm: [],
        longterm: []
      },
      tracks: {
        shortterm: [],
        mediumterm: [],
        longterm: []
      },
      currentType: null
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then(data => {
      this.setState({
        artists: {
          ...this.state.artists,
          shortterm: data
        }
      });
    })
  }

  logSpotify = () => {
    window.location = "http://localhost:8888/login";
  }

  handleType = (e) => {
    this.setState({currentType: e.target.textContent})
  }

  render() {
    return (
      <div>
        <Button onClick={this.logSpotify}>Log in to Spotify!</Button>
        <ul>
          {this.state.options.type.map((option, i) => {
            return (
              <li onClick={(e) => this.handleType(e)} key={i}>{option}</li>
            )
          })}
        </ul>
        {
          this.state.currentType ?
          <TrackView type={(this.state.currentType === "artists") ? this.state.artists : this.state.tracks} />
          :
          null
        }
      </div>
    );
  }
}

export default App;

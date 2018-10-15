import React, { Component } from 'react';
import {Button} from 'reactstrap';
const queryString = require('query-string');

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(resp => resp.json()).then(data => console.log(data));

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(resp => resp.json()).then(data => console.log(data));
  }

  logSpotify = () => {
    window.location = "http://localhost:8888/login";
  }

  render() {
    return (
      <div>
       Chartify
       <Button onClick={this.logSpotify}>Log in to Spotify!</Button>
      </div>
    );
  }
}

export default App;

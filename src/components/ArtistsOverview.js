import React, { Component } from 'react';

export default class ArtistsOverview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Name: {this.props.artistsOverview.overview.name}</p>
        <p>Genres: {this.props.artistsOverview.overview.genres.map(g => {
          return (
            <span>{`${g} `}</span>
          )
        })}</p>
        <p>Popularity: {this.props.artistsOverview.overview.popularity}</p>
        <p>Total followers: {this.props.artistsOverview.overview.followers.total}</p>
        <p>image link: {this.props.artistsOverview.overview.images[2].url}</p>
        <p>Link: {this.props.artistsOverview.overview.href}</p>
        <p>
          Featured albums:

          {
            this.props.artistsOverview.features ?
              this.props.artistsOverview.features.items.map(item => {
                return (item.album_type === "album") ? `${item.name} by ${item.artists[0].name}. ` : null
              })
              :
              null
          }

        </p>

        {console.log(this.props.artistsOverview)}
      </div>
    )
  }
}
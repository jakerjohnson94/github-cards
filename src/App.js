import React, { Component } from 'react';
import './App.css';
const GITHUB_FETCH_URL = 'https://api.github.com/users/jakerjohnson94';

const Card = props => (
  <div className="card">
    <div className="card-image">
      <figure className="image is-4">
        <img src={props.avatar_url} alt="Github Profile Image" />
      </figure>
    </div>
    <div className="card-content">
      <div className="media">
        <div className="media-content">
          <p className="title is-4">{props.name}</p>
          <p className="subtitle is-6">{props.location}</p>
        </div>
      </div>

      <div className="content">
        <p>{props.bio}</p>

        <a href="https://github.com/jakerjohnson94">{props.public_repos} Public Repositories</a>
      </div>
    </div>
  </div>
);
class App extends Component {
  state = {
    user: {},
    active: false,
  };
  handleClick = () =>
    fetch(GITHUB_FETCH_URL)
      .then(results => results.json())
      .then(data => {
        this.setState({ user: data });
        this.state.active === true
          ? this.setState({ active: false })
          : this.setState({ active: true });
      });

  render() {
    const { user = {} } = this.state;
    const isActive = this.state.active;
    return (
      <React.Fragment>
        <div className="buttonWrapper">
          <button id="cardBtn" className="button" onClick={this.handleClick}>
            Toggle Card
          </button>
        </div>
        <div className="cardWrapper">
          {isActive ? (
            <Card
              avatar_url={user.avatar_url}
              name={user.name}
              location={user.location}
              bio={user.bio}
              public_repos={user.public_repos}
            />
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default App;

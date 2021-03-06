import React, { Component } from "react";
import { firebaseLooper, firebaseMatches } from "../../../firebase";
import { reverseArray } from "../../../utils/misc";
import Slide from "react-reveal/Slide";

import { Block } from "../../ui/Elements";

class Blocks extends Component {
  state = {
    matches: []
  };
  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({
          matches: reverseArray(matches)
        });
      });
  }
  showMatches = matches =>
    matches
      ? matches.map(match => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <Block match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;

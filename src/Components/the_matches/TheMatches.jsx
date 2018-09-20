import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firebaseLooper, getAllMatches } from "../../firebase";
import { reverseArray } from "../../utils/misc";

import MatchesList from "./MatchesList";
import LeagueTable from "./LeagueTable";

class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filteredMatches: [],
    playerFilter: "All",
    resultFilter: "All"
  };

  componentDidMount() {
    getAllMatches().then(snapshot => {
      const matches = firebaseLooper(snapshot);
      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filteredMatches: reverseArray(matches)
      });
      console.log(this.state);
    });
  }
  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">Match Filters</div>
            <MatchesList matches={state.filteredMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default TheMatches;

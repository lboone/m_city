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
    playedFilter: "All",
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
  showPlayed = played => {
    let list = [];
    if (played === "All") {
      list = this.state.matches;
    } else {
      list = this.state.matches.filter(match => {
        return match.final === played;
      });
    }

    this.setState({
      filteredMatches: list,
      playedFilter: played,
      resultFilter: "All"
    });
  };
  showResult = result => {
    let list = [];
    if (result === "All") {
      list = this.state.matches;
    } else {
      list = this.state.matches.filter(match => {
        return match.result === result;
      });
    }

    this.setState({
      filteredMatches: list,
      playedFilter: "All",
      resultFilter: result
    });
  };
  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">ShowMatch</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.playedFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.playedFilter === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("Yes")}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${
                      state.playedFilter === "No" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("No")}
                  >
                    Not Played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result Game</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.resultFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "W" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "L" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("L")}
                  >
                    L
                  </div>
                  <div
                    className={`option ${
                      state.resultFilter === "D" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("D")}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
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

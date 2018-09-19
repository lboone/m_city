import React from "react";
import { Link } from "react-router-dom";

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.style
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const Block = ({ match }) => {
  return (
    <div className="match_block">
      <div className="match_date">
        {match.final ? match.date : `Match not played yet: ${match.date}`}
      </div>
      <div className="match_wrapper">
        <div className="match_top">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${match.localThmb}.png)`
              }}
            />
            <div className="team_name">{match.local}</div>
          </div>
          <div className="right">{match.final ? match.resultLocal : "-"}</div>
        </div>

        <div className="match_bottom">
          <div className="left">
            <div
              className="icon"
              style={{
                background: `url(/images/team_icons/${match.awayThmb}.png)`
              }}
            />
            <div className="team_name">{match.away}</div>
          </div>
          <div className="right">{match.final ? match.resultAway : "-"}</div>
        </div>
      </div>
    </div>
  );
};

export const Card = ({ number, firstName, lastName, bck }) => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{
          background: `#f2f9ff url(${bck})`
        }}
      />
      <div className="player_card_nfo">
        <div className="player_card_number">{number}</div>
        <div className="player_card_name">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
      </div>
    </div>
  );
};

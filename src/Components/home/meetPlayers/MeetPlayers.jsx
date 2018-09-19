import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../ui/Elements";
import Reveal from "react-reveal/Reveal";
import Card from "./Cards";

const allVals = ["Meet", "The", "Players"];

class MeetPlayers extends Component {
  state = {
    show: false
  };
  renderText = () =>
    allVals.map((val, i) => (
      <Tag
        key={i}
        bck="#0e1731"
        size="100px"
        color="#ffffff"
        style={{ display: "inline-block", marginBottom: "20px" }}
      >
        {val}
      </Tag>
    ));
  render() {
    return (
      <div
        className="home_meetplayers"
        style={{ background: `#ffffff url(${Stripes})` }}
      >
        <div className="container">
          <div className="home_meetplayers_wrapper">
            <Reveal
              fraction={0.7}
              onReveal={() => {
                this.setState({ show: true });
              }}
            >
              <div className="home_card_wrapper">
                <Card show={this.state.show} />
              </div>
            </Reveal>
            <div className="home_text_wrapper">
              <div>{this.renderText()}</div>
              <div>
                <Tag
                  bck="#ffffff"
                  size="27px"
                  color="#0e1731"
                  link={true}
                  linkTo="/the_team"
                  style={{
                    display: "inline-block",
                    marginBottom: "27px",
                    border: "1px solid #0e1731"
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeetPlayers;

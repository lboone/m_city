import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebaseAuth } from "../../../firebase";

const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches"
    },
    {
      title: "Add Match",
      linkTo: "/admin_matches/add_match"
    },
    {
      title: "Players",
      linkTo: "/admin_players/"
    },
    {
      title: "Add Player",
      linkTo: "/admin_players/add_player"
    }
  ];
  const style = {
    color: "#ffffff",
    fontWeitght: "300",
    borderBottom: "1px solid #353535"
  };
  const renderItems = () =>
    links.map(link => (
      <Link key={link.title} to={link.linkTo}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebaseAuth.signOut().then(
      () => {
        console.log("Log Out Successfull");
      },
      error => {
        console.log("Error Logging Out");
      }
    );
  };
  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Log Out
      </ListItem>
    </div>
  );
};

export default AdminNav;

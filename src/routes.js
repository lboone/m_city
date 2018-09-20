import React from "react";
import { Switch } from "react-router-dom";
import Layout from "./Hoc/Layout";

import PrivateRoutes from "./Components/auth_routes/PrivateRoutes";
import PublicRoutes from "./Components/auth_routes/PublicRoutes";

import Home from "./Components/home/Home";
import SignIn from "./Components/signin/SignIn";

import Players from "./Components/admin/players/Players";
import AddEditPlayer from "./Components/admin/players/AddEditPlayer";
import Matches from "./Components/admin/matches/Matches";
import AddEditMatch from "./Components/admin/matches/AddEditMatch";
import Dashboard from "./Components/admin/Dashboard";

import TheTeam from "./Components/the_team/TheTeam";
import TheMatches from "./Components/the_matches/TheMatches";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/add_match"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches/edit_match/:id"
          exact
          component={AddEditMatch}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/add_player"
          exact
          component={AddEditPlayer}
        />
        <PrivateRoutes
          {...props}
          path="/admin_players/edit_player/:id"
          exact
          component={AddEditPlayer}
        />
        <PrivateRoutes
          {...props}
          path="/admin_matches"
          exact
          component={Matches}
        />

        <PrivateRoutes
          {...props}
          path="/admin_players"
          exact
          component={Players}
        />
        <PublicRoutes
          {...props}
          restricted={true}
          exact
          component={SignIn}
          path="/sign_in"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={Home}
          path="/"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={TheTeam}
          path="/the_team"
        />
        <PublicRoutes
          {...props}
          restricted={false}
          exact
          component={TheMatches}
          path="/the_matches"
        />
      </Switch>
    </Layout>
  );
};

export default Routes;

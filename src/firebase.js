import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB5mJjLdwrgLQjmnNlYw25MVI1PDk1T0Hc",
  authDomain: "manchester-city-90cd2.firebaseapp.com",
  databaseURL: "https://manchester-city-90cd2.firebaseio.com",
  projectId: "manchester-city-90cd2",
  storageBucket: "manchester-city-90cd2.appspot.com",
  messagingSenderId: "65878343524"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseAuth = firebase.auth();
const firebasePositions = firebaseDB.ref("positions");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseMatches = firebaseDB.ref("matches");
const firebasePlayers = firebaseDB.ref("players");
const firebaseTeams = firebaseDB.ref("teams");

const firebaseLooper = snapshot => {
  const data = [];

  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

const getAllPositions = () => {
  return firebasePositions.once("value");
};
const getAllPromotions = () => {
  return firebasePromotions.once("value");
};
const getAllTeams = () => {
  return firebaseTeams.once("value");
};

const getAllPlayers = () => {
  return firebasePlayers.once("value");
};
const getAllMatches = () => {
  return firebaseMatches.once("value");
};

const getPlayerById = playerId => {
  return firebaseDB.ref(`players/${playerId}`).once("value");
};

const getPlayerImageURL = img => {
  return firebase
    .storage()
    .ref("players")
    .child(img)
    .getDownloadURL();
};
const getMatchById = matchId => {
  return firebaseDB.ref(`matches/${matchId}`).once("value");
};

export {
  firebaseLooper,
  firebase,
  firebaseAuth,
  firebaseDB,
  firebasePromotions,
  firebaseMatches,
  firebasePlayers,
  firebaseTeams,
  getAllPositions,
  getAllPromotions,
  getAllPlayers,
  getAllTeams,
  getAllMatches,
  getPlayerById,
  getPlayerImageURL,
  getMatchById
};

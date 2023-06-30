import firebase from "firebase";

import * as codTournamentService from "../services/codtournamentService";

const WEEK_TIME = 1000 * 60 * 60 * 24 * 7;

/**
 * @typedef {Object} User
 * @property {string} uid
 * @property {string} unoId
 * @property {string} avatar
 * @property {Object} cod
 * @property {Object} content
 * @property {string} username
 * @property {string} email
 * @property {string} gameid
 * @property {string} secondaryGameId
 * @property {Date} lastUpdate
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} UserProveoftruth
 * @property {string} id
 * @property {string} email
 * @property {string} username
 * @property {number} wallet
 */

/**
 * Funcion aux para recuperar las stats de nuevo y setearse al user en el context
 * @param {*} user
 * @param {*} onChange
 */
const updateUserStats = (user) => {
  return codTournamentService
    .getUserStats(user.gameid, user.cod.platform)
    .then((stats) => {
      if (stats.status === "success") {
        const { kdRatio, deaths, kills, wins } = stats.wz.br_all.properties;
        const newCod = { ...user.cod, kdRatio, deaths, kills, wins };
        updateDBUserStats(user.id, newCod);
        const newUser = { ...user, cod: newCod };
        return newUser;
      } else return user;
    });
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvnXT8lIDhKc1JUwbMXqsw6ZLbQHfda1A",
  authDomain: "cod-tournaments.firebaseapp.com",
  projectId: "cod-tournaments",
  storageBucket: "cod-tournaments.appspot.com",
  messagingSenderId: "1036929202217",
  appId: "1:1036929202217:web:5f7698523e0480f2454438",
  measurementId: "G-N4YHY5PZZE",
};

const firebaseConfig2 = {
  apiKey: "AIzaSyCLCWVvqXPa7w4aG7oRO7cuZw4L_aD-rDg",
  authDomain: "codjf-tournaments.firebaseapp.com",
  projectId: "codjf-tournaments",
  storageBucket: "codjf-tournaments.appspot.com",
  messagingSenderId: "826598295492",
  appId: "1:826598295492:web:46dbf3c99cc5615cc80691",
  measurementId: "G-NN4J2HEM6L",
};

const firebaseConfig3 = {
  apiKey: "AIzaSyDlLw8x5ZUszb8tKZtNuxRF_uXpNI7huiw",
  authDomain: "codjf-tournament.firebaseapp.com",
  projectId: "codjf-tournament",
  storageBucket: "codjf-tournament.appspot.com",
  messagingSenderId: "850305239056",
  appId: "1:850305239056:web:a78958b077a3417a396295",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig3);

const dbService = firebase.firestore();

/**
 * **************************************************
 * **            USER-auth                        **
 * **************************************************
 */

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    // console.log('-------CAMBIA', user)
    if (user) {
      const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
      // Comprobar con usuario en db
      getDBUser(normalizedUser.uid).then((user) => {
        if (user) {
          if (
            user.cod &&
            (!user.lastUpdate ||
              user.lastUpdate < new Date().getTime() - WEEK_TIME)
          ) {
            updateUserStats(user).then(onChange);
            // onChange(user);
          } else {
            onChange(user);
          }
        } else {
          createDBUser(normalizedUser);
          onChange(normalizedUser);
        }
      });
    } else return null;
  });
};

/**
 * example comprobar si esta authenticated
 */
export const isAuth = () => {
  const user = firebase.auth().currentUser;
  console.log(user);
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

export const logOutFromGoogle = () => {
  return firebase.auth().signOut();
};

/**
 * **************************************************
 * **            USERs-                            **
 * **************************************************
 */

export const createDBUser = ({
  avatar = null,
  content = null,
  uid,
  email,
  username,
  gameid = null,
  cod = null,
}) => {
  return dbService
    .collection("users")
    .doc(uid)
    .set({
      avatar,
      content,
      uid,
      username,
      email,
      gameid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      cod,
      tournaments: [],
      content: {
        wallet: 0, //saldo
        wasted: 0, //dinero gastado
        lastReward: 0, // ultimo premio a cobrar
        rewards: 0, // Total premios
      },
    })
    .then(function (a) {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
};

export const unregisterUser = (uid, gameid) => {
  var userRef = dbService.collection("users").doc(uid);

  return userRef.set(
    {
      cod: null,
      gameid: null,
      previousGameid: gameid,
      secondaryGameid: null,
    },
    { merge: true }
  );
};

export const updateDBUser = (
  uid,
  gameid,
  secondaryGameId = "",
  unoId = "",
  cod
) => {
  var userRef = dbService.collection("users").doc(uid);

  return userRef.set(
    {
      gameid: gameid,
      secondaryGameId,
      lastUpdate: firebase.firestore.Timestamp.fromDate(new Date()),
      unoId,
      cod: cod,
    },
    { merge: true }
  );
};

/**
 * Nuevo valor para wallet
 * @param {string} uid
 * @param {number} wallet
 * @returns
 */
export const updateUserWallet = (uid, wallet) => {
  var userRef = dbService.collection("users").doc(uid);

  return userRef.set(
    {
      content: { wallet },
    },
    { merge: true }
  );
};

/**
 * Actualizar solo user.cod
 * @param {String} uid
 * @param {Object} cod
 */
export const updateDBUserStats = (uid, cod) => {
  var userRef = dbService.collection("users").doc(uid);
  return userRef.set(
    {
      lastUpdate: firebase.firestore.Timestamp.fromDate(new Date()),
      cod: cod,
    },
    { merge: true }
  );
};

/**
 *
 * @param {string} uid
 * @returns {User} TypeDefined
 */
export const getDBUser = (uid) => {
  return dbService
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        const id = doc.id;
        const { createdAt, lastUpdate } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
          lastUpdate: lastUpdate ? +lastUpdate.toDate() : undefined,
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

/**
 * TO DO - buscar como traer solo el gameid de la db
 */
const getDBUserGameId = (uid) => {
  return dbService
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const data = doc.data();
        return data.gameid;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

export const fetchAllUsers = () => {
  return dbService
    .collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const setUserPayed = (userid, tid, payed) => {
  var userRef = dbService.collection("users").doc(userid);
  return userRef
    .update({
      tournaments: firebase.firestore.FieldValue.arrayRemove({
        tid,
        payed: !payed,
      }),
    })
    .then(() => {
      var userRefSet = dbService.collection("users").doc(userid);
      userRefSet.set(
        {
          tournaments: firebase.firestore.FieldValue.arrayUnion({
            tid,
            payed: payed,
          }),
        },
        { merge: true }
      );
    })
    .catch((e) => {
      console.log("Error guardando el torneo en el user", e);
    });
};

export const updateAllUsersTour = (tourid, imp) => {
  console.log("tourid", tourid);
  return dbService
    .collection("users")
    .where("tournaments", "array-contains", {
      tid: tourid,
      payed: imp,
    })
    .get()
    .then((snapshot) => {
      const promises = [];
      snapshot.forEach((doc) => {
        promises.push(
          doc.ref.update({
            tournaments: firebase.firestore.FieldValue.arrayRemove({
              tid: tourid,
              payed: imp,
            }),
          })
        );
      });
      return Promise.all(promises);
    })
    .then((r) => console.log("------>", r))
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

/**
 * **************************************************
 * **            TOURNAMENTS                       **
 * **************************************************
 */

export const createTournament = (tour) => {
  tour.fecha = firebase.firestore.Timestamp.fromDate(tour.fecha);
  return dbService
    .collection("tournament")
    .add(tour)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const getTournament = (tourid) => {
  return dbService
    .collection("tournament")
    .doc(tourid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        const id = doc.id;
        const { fecha } = data;

        return {
          ...data,
          id,
          fecha: +fecha.toDate(),
          stats: [],
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

export const getTournamentWithStats = (tourid) => {
  return dbService
    .collection("tournament")
    .doc(tourid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        const id = doc.id;
        const { fecha } = data;

        return {
          ...data,
          id,
          fecha: +fecha.toDate(),
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

export const fetchAllTournaments = () => {
  return dbService
    .collection("tournament")
    .orderBy("fecha", "asc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { fecha } = data;

        return {
          ...data,
          id,
          fecha: +fecha.toDate(),
          stats: [],
        };
      });
    });
};

export const inscribeUserToTournament = (uid, tournament) => {
  console.log("inscribeUserToTournament");
  const { id: tid, topay } = tournament;
  if (topay.includes(uid))
    return new Promise(() => undefined).then(() =>
      console.log("Error: User already inscribed")
    );
  var tournamentRef = dbService.collection("tournament").doc(tid);

  return tournamentRef
    .update({
      topay: firebase.firestore.FieldValue.arrayUnion(uid),
      totalTopay: firebase.firestore.FieldValue.increment(1),
    })
    .then(() => {
      var userRef = dbService.collection("users").doc(uid);
      userRef
        .update({
          tournaments: firebase.firestore.FieldValue.arrayUnion({
            tid,
            payed: false,
          }),
        })
        .catch((e) => {
          console.log("Error guardando el torneo en el user", e);
        });
    })
    .catch((e) => {
      console.log("Error guardando el user en el torneo", e);
    });
};

export const deleteUserToTournament = (uid, tournament) => {
  const { id: tid, topay } = tournament;
  // if (!topay.includes(uid)) return // Tratar eso el tour viene de props server aun no actualizado
  var tournamentRef = dbService.collection("tournament").doc(tid);

  return tournamentRef
    .update({
      topay: firebase.firestore.FieldValue.arrayRemove(uid),
      totalTopay: firebase.firestore.FieldValue.increment(-1),
    })
    .then(() => {
      var userRef = dbService.collection("users").doc(uid);
      userRef
        .update({
          tournaments: firebase.firestore.FieldValue.arrayRemove({
            tid,
            payed: false,
          }),
        })
        .catch((e) => {
          console.log("Error guardando el torneo en el user", e);
        });
    })
    .catch((e) => {
      console.log("Error guardando el user en el torneo", e);
    });
};

export const setTourStats = (tourid, stats) => {
  var userRef = dbService.collection("tournament").doc(tourid);

  return userRef
    .set(
      {
        stats,
        hasStats: true,
      },
      { merge: true }
    )
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

/**
 * **************************************************
 * **            TEAMS                             **
 * **************************************************
 */

//TO COMPLETE
export const getUserTeams = (userid, tourid) => {
  return dbService
    .collection("tournament")
    .doc(tourid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        const id = doc.id;

        getUserTeams(id);

        return {
          ...data,
          id,
        };
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

/**
 * TO BE COMPLETED
 * @param {String} teamid
 * @param {String} userid
 */
export const getUserTeam = (teamid, userid) => {
  return dbService
    .collection("teams")
    .doc(teamid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        const data = doc.data();
        const { users } = data;
        if (users.includes(userid)) {
          const promises = users.map((user) => getDBUserGameId(user));
          return Promise.all(promises);
        } else return [];
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
    });
};

/**
 * Busca un team con ese nombre
 * solo busca equipos con ese tourid
 * Cuidado cambios en teams impricar cambios aqui
 * TODO paralelizar las segundas peticiones
 */
export const getTeamByName = (lookTeamName, tourid) => {
  return dbService
    .collection("teams")
    .where("tourid", "==", tourid)
    .where("teamName", "==", lookTeamName)
    .get()
    .then((query) => {
      let teams = [];
      query.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const { teamName, tourid, teamKD, users } = doc.data();
        teams = [{ teamid: doc.id, teamName, tourid, teamKD, users }, ...teams];
      });
      return teams;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

/**
 * Importante hay que pasarle el objeto a buscar completo
 * @param {String} userid
 * @param {String} tourid
 * @param {String} secondaryGameId
 * @param {String} tourid
 */
export const getUserTeamByTour = (userid, gameid, secondaryGameId, tourid) => {
  return dbService
    .collection("teams")
    .where("tourid", "==", tourid)
    .where("users", "array-contains", { gameid, user: userid, secondaryGameId })
    .get()
    .then((query) => {
      let teams = [];
      query.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        teams = [{ ...doc.data() }, ...teams];
      });
      return teams;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

export const inscribeTeam = (team) => {
  if (team.teamid)
    return dbService
      .collection("teams")
      .doc(team.teamid)
      .set(team, { merge: true });
  else return dbService.collection("teams").add(team);
  // .then(function (docRef) {
  //   console.log("Document written with ID: ", docRef.id);
  // })
  // .catch(function (error) {
  //   console.error("Error adding document: ", error);
  // });
};

/**
 * TODO
 * @param {*} teamName
 */
export const deteleTeam = (teamName) => {
  db.collection("teams")
    .doc("") //teamid sacdo del teamName ?¿
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

/**
 *
 * @param {String} teamid -->
 * @param {Boolean} payed  --> true para marcar como pagado | false no pagado
 */
export const setTeamPayed = (teamid, payed) => {
  var userRef = dbService.collection("teams").doc(teamid);
  return userRef.set(
    {
      payed,
    },
    { merge: true }
  );
};

/**
 * Get all teams of a tour
 * @param {} tourid
 */
export const getTourTeams = (tourid) => {
  return dbService
    .collection("teams")
    .where("tourid", "==", tourid)
    .get()
    .then((query) => {
      let teams = [];
      query.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const { teamName, tourid, users } = doc.data();
        teams = [{ teamid: doc.id, teamName, tourid, users }, ...teams];
      });
      return teams;
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
};

/**
 * **************************************************
 * **            USER-prove_of_truth               **
 * **************************************************
 */

export const createUserProveOfTruth = (userid, proveOfTruth) => {
  return dbService.collection("userProveoftruth").doc(userid).set(proveOfTruth);
};
export const setUserProveOfTruth = (userid, prize) => {
  return dbService
    .collection("userProveoftruth")
    .doc(userid)
    .update(
      {
        wallet: firebase.firestore.FieldValue.increment(-prize),
      },
      { merge: true }
    );
};

export const haveProveOfTruth = (userid) => {
  return dbService
    .collection("userProveoftruth")
    .doc(userid)
    .get()
    .then((doc) => doc.exists);
};

/**
 * return false si no existe
 * @param {string} uid
 * @returns {UserProveoftruth} TypeDefined || false
 */
export const getProveOfTruth = (userid) => {
  return dbService
    .collection("userProveoftruth")
    .doc(userid)
    .get()
    .then((doc) => {
      if (!doc.exists) return false;
      // console.log("Document data:", doc.data());
      const data = doc.data();
      const id = doc.id;
      const { email, username, wallet } = data;
      return { id, email, username, wallet };
    });
};

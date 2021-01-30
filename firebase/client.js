import firebase from "firebase";

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

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const dbService = firebase.firestore();

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
    if (user) {
      const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
      // Comprobar con usuario en db
      getDBUser(normalizedUser.uid).then((user) => {
        if (user) onChange(user);
        else {
          createDBUser(normalizedUser);
          onChange(normalizedUser);
        }
      });
    } else return null;
  });
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

export const createDBUser = ({
  avatar = null,
  content = null,
  uid,
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
    },
    { merge: true }
  );
};

export const updateDBUser = (uid, gameid, cod) => {
  var userRef = dbService.collection("users").doc(uid);

  return userRef.set(
    {
      cod: cod,
      gameid: gameid
    },
    { merge: true }
  );
};

const getDBUser = (uid) => {
  return dbService
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      console.log("doc", doc);
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
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

const torn1 = {
  fecha: firebase.firestore.Timestamp.fromDate(new Date("2021/02/14 17:00:00")),
  visible: true,
  kdmax: 2.0,
  prize: 5,
  modo: "Tríos",
  format: "Standar",
  mapa: "Verdansk",
  region: "UE",
  payed: [],
  topay: [],
};
const torn2 = {
  fecha: firebase.firestore.Timestamp.fromDate(new Date("2021/02/21 17:00:00")),
  visible: true,
  kdmax: 2.0,
  prize: 5,
  modo: "Tríos",
  format: "Standar",
  mapa: "Verdansk",
  region: "UE",
  payed: [],
  topay: [],
};
const torn3 = {
  fecha: firebase.firestore.Timestamp.fromDate(new Date("2021/02/28 17:00:00")),
  visible: true,
  kdmax: 2.0,
  prize: 5,
  modo: "Tríos",
  format: "Standar",
  mapa: "Verdansk",
  region: "UE",
  payed: [],
  topay: [],
};

const createTournament = () => {
  return dbService
    .collection("tournament")
    .add(torn3)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
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
        };
      });
    });
};

export const inscribeUserToTournament = (uid, tournament) => {
  const { id: tid, topay } = tournament;
  if (topay.includes(uid)) return (new Promise(() => undefined))
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
  if (!topay.includes(uid)) return
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

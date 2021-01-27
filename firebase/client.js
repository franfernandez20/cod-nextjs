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

const dbService = firebase.firestore()

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
      getDBUser(normalizedUser.uid).then( (user) =>{
        if (user) onChange(user)
        else {
          createDBUser(normalizedUser)      
          onChange(normalizedUser)
        }
      })
    } else return null
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
  return firebase.auth().signOut()
}


export const createDBUser =  ({ avatar = null , content = null , uid, username, gameid=null, cod=null }) => {  
  return dbService.collection('users').doc(uid).set({
    avatar,
    content,
    uid,
    username,
    gameid,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    cod,
    content: {
      wallet: 0, //saldo
      wasted: 0, //dinero gastado
      lastReward: 0, // ultimo premio a cobrar
      rewards: 0, // Total premios
    }
  }).then(function(a) {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
}

export const unregisterUser = (uid, gameid) => {
  var userRef = dbService.collection('users').doc(uid);

  return userRef.set({
      cod: null,
      gameid: null,
      previousGameid: gameid
  }, { merge: true });
}

const getDBUser =  (uid) => {
  return dbService
    .collection("users")
    .doc(uid)
    .get()
    .then(( doc ) => {
      console.log('doc', doc)
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
    
        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null
    }
      
    }) 
}

export const fetchAllUsers = () => {
  return dbService
    .collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        }
      })
    })
}

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAhFpol0R1BjrVK1g8RvCiML7z0f3JLieY",
  authDomain: "odin-library-f4bf9.firebaseapp.com",
  databaseURL: "https://odin-library-f4bf9.firebaseio.com",
  projectId: "odin-library-f4bf9",
  storageBucket: "odin-library-f4bf9.appspot.com",
  messagingSenderId: "861858209946",
  appId: "1:861858209946:web:67c1e02c0282318790bf23",
  measurementId: "G-181GMCSNCM",
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);
const fbDatabase = firebase.database(fbApp);
const rootRef = fbDatabase.ref("users");

function syncUserData(userId, targetArray) {
  let userData = rootRef.child(userId);
  console.log("inside sync");
  return userData.once("value").then((data) => {
    console.log("syncing");
    targetArray = data.val();
    console.log(data.val());
  });
}

function writeUserData(userId, objectList) {
  fbDatabase.ref("users/" + userId).set(objectList);
}

function loginWithGoogle() {
  console.log("login");
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    });
}

let currentUid = null;

const loginButton = document.querySelector("#login");
loginButton.addEventListener("click", loginWithGoogle);

firebase.auth().onAuthStateChanged((loggedInUser) => {
  if (loggedInUser) {
    currentUid = loggedInUser.uid;
  }
});

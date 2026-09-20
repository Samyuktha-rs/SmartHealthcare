const firebaseConfig = {
    apiKey: "AIzaSyD-zzbA9GJdWx0Q_i_vt3mmd_6TPabjT_M",
    authDomain: "smarthealthcare-4b46f.firebaseapp.com",
    projectId: "smarthealthcare-4b46f",
    storageBucket: "smarthealthcare-4b46f.firebasestorage.app",
    messagingSenderId: "537877131084",
    appId: "1:537877131084:web:406e8d6c3d8e1a7d2369e9"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
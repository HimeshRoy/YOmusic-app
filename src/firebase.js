import {
    initializeApp,
} from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
} from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyClBZcg3r_-wQW_Gw-Fjbp2y_-IcBoSbFM",

    authDomain:
        "yomusic-2026.firebaseapp.com",

    projectId:
        "yomusic-2026",

    storageBucket:
        "yomusic-2026.firebasestorage.app",

    messagingSenderId:
        "726928278569",

    appId:
        "1:726928278569:web:4a995071194b8249fc4838",
    measurementId: "G-WVGHHE733L",

};

const app =
    initializeApp(firebaseConfig);

export const auth =
    getAuth(app);

export const googleProvider =
    new GoogleAuthProvider();

export const db =
    getFirestore(app);
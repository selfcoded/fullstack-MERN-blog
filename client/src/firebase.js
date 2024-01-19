import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_APIKEY,
    authDomain: "portfolio-aa150.firebaseapp.com",
    projectId: "portfolio-aa150",
    storageBucket: "portfolio-aa150.appspot.com",
    messagingSenderId: "877162218814",
    appId: "1:877162218814:web:9c081d548158be1509186f"
}

export const app = initializeApp(firebaseConfig)
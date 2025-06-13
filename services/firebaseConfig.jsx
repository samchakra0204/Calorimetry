// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth/react-native";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "calorimetry-7fa9f.firebaseapp.com",
  projectId: "calorimetry-7fa9f",
  storageBucket: "calorimetry-7fa9f.firebasestorage.app",
  messagingSenderId: "168749564736",
  appId: "1:168749564736:web:b4f518f8a88078fbb870a5",
  measurementId: "G-E6Y7WZJPYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=Platform.OS=='web'?getAuth(app):initializeAuth(app, {
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})*/

import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'calorimetry-7fa9f.firebaseapp.com',
  projectId: 'calorimetry-7fa9f',
  storageBucket: 'calorimetry-7fa9f.appspot.com',
  messagingSenderId: '168749564736',
  appId: '1:168749564736:web:b4f518f8a88078fbb870a5',
  measurementId: 'G-E6Y7WZJPYW',
};

const app = initializeApp(firebaseConfig);

export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

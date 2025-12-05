import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyD0iu59Uql8q5Tm7ySal2ZErE23ewvjl5M',
  authDomain: 'studio-booker-f89da.firebaseapp.com',
  databaseURL:
    'https://studio-booker-f89da-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'studio-booker-f89da',
  storageBucket: 'studio-booker-f89da.firebasestorage.app',
  messagingSenderId: '104834253023',
  appId: '1:104834253023:web:f6067b3934e7f37b86296a',
}

export const app = initializeApp(firebaseConfig)
export { firebaseConfig }

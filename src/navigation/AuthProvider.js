import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [display_name, set_display_name] = useState('');

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        display_name,
        set_display_name,
        logout: async () => {

          try {
            await set_display_name(''); //hacky fix lmao
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (u_display_name, email, password) => {
          try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            console.log('user created');
            console.log(response)
            if (response.user.uid) {
              const user = {
                uid: response.user.uid,
                // username: username,
                email: email,
                // major: major,
                // gradYear: gradYear,
                display_name: u_display_name
              }
              console.log('user declared');
              firestore().collection("users").doc(response.user.uid).set(user)
              console.log('user set');
              // dispatch({ type: SIGNUP, payload: user })
            }
            
          } catch (e) {
            console.log(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
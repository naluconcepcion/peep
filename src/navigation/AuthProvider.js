import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
              db.collection("users").doc(response.user.uid).set(user)
              console.log('user set');
              // dispatch({ type: SIGNUP, payload: user })
            }
            
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
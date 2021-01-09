import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Firebase, {realtime} from './config/Firebase';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'

import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './navigation/AuthStackNavigator'
import MainNavigator from './navigation/MainNavigator'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoading: true,
    };
  }
  async componentDidMount() {
    await Firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        this.setState({
          user: user.uid,
          isLoading: false,
        });
      }
      else {
        this.setState({
          user: null,
          isLoading: false,
        })
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
          <NavigationContainer>
            { this.state.user ? (
              <MainNavigator/>
            ) : (
              <AuthStackNavigator/>
            )}
          </NavigationContainer>
        </Provider>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Login Page</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState, useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';

export default function AddRoomScreen({ navigation }) {
  const {user, display_name} = useContext(AuthContext);
  const currentUser = user.toJSON();
  // const [roomName, setRoomName] = useState('');
  // ... Firestore query will come here later

  async function handleButtonPress() {

    console.log("nicememe");
    const self_data = await firestore().collection('users').doc(currentUser.uid).get();
    console.log(self_data);
    const room_name = self_data.data()["display_name"];
    console.log(room_name);
    console.log("nicememe2");

    const greeting = "Let people know where you're sitting!";

    if (room_name) {
      console.log("ROOM CREATED")

      firestore()
        .collection('THREADS')
        .add({
          name: room_name,
          latestMessage: {
            text: greeting,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: greeting,
            createdAt: new Date().getTime(),
            system: true
          });
          navigation.navigate('Home');
        });
    }
  }

  return (

    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon='close-circle'
          size={36}
          color='#6646ee'
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create room</Title>
        {/* <FormInput
          labelName='Room Name'
          value={roomName}
          onChangeText={text => setRoomName(text)}
          clearButtonMode='while-editing'
        /> */}
        <FormButton
          title='Create'
          modeValue='contained'
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  buttonLabel: {
    fontSize: 22
  }
});
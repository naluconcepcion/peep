import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateMajor, updateGradYear, signup, getUser } from '../actions/user'

import Icon from 'react-native-vector-icons/FontAwesome5';

class DemographicsScreen extends Component {
  static navigationOptions = {
    title: 'Demographics'
  }

  handleSignUp = () => {
    this.props.signup()
  }

  render() {
    return (
      <View
      style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/ontoologo.png')}
      />
      <Icon name="chevron-left" size={20} color="white"
        onPress={() => this.props.navigation.navigate('Opening')}
        style={styles.back}
      />
      <Text style={styles.textHeading}>Tell us about yourself.</Text>
      
      <Text style={styles.textHeading}>My major(s)...</Text>
        <TextInput
          value={this.props.user.major}
          onChangeText={major => this.props.updateMajor(major)}
          style={[styles.textBar, styles.username]}
          />
      <Text style={styles.textHeading}>My grad year...</Text>
        <TextInput
          value={this.props.user.gradYear}
          onChangeText={gradYear => this.props.updateGradYear(gradYear)}
          style={[styles.textBar, styles.username]}
          />
      <Text style={styles.textHeading}>My classes...</Text>
      <TouchableOpacity
      title="SIGN UP"
      style={styles.button}
      onPress={this.handleSignUp}
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: '100%',
  },
  tinyLogo: {
    position: 'relative',
    width: '50%',
    height: '10%',
    top: '-10%'
  },
  textHeading: {
    fontFamily: 'Avenir',
    position: 'relative',
    paddingRight: 190,
    color: '#D2D2D2',
    paddingTop: 10,
  },
  back: {
    top: 10,
    left: 5 ,
    padding: 10,
    width: 40,
  },
  textBar: {
    fontFamily: 'Avenir',
    position: 'relative',
    justifyContent: 'center',
    width: '70%',
    height: '5%',
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#F9F9F9',
    borderBottomColor: '#212121',
    padding: 10
  },
  button: {
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    top: '7%',
    width: '80%',
    backgroundColor: '#212121',
    borderRadius: 23,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Avenir',
    lineHeight: 45,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.035,
    color: '#F9F9F9',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateMajor, updateGradYear, signup, getUser }, dispatch)
}

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemographicsScreen)

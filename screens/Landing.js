import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';

// redux magic
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUser, logout } from '../actions/user';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      isLoading: true,
    }
  }

  handleLogout = () => {
    this.props.logout();
  }
  async componentDidMount() {
    // await this.fetchOthersNearby();
  }


  render() {
      return(
        <View style={styles.container}>
        <Text>Temporary middleman page.</Text>
        <TouchableOpacity
         style={styles.icon}
         onPress={() => this.props.navigation.openDrawer()}>
         <Image
         source={require('../assets/images/menu.png')}/>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>log out</Text>
        </TouchableOpacity>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  jump: {
    fontSize: 30,
    lineHeight: 30,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '82%',
    backgroundColor: '#B31B1B',
    height: '7%',
    width: '70%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  buttonText: {
    fontFamily: 'Avenir-Medium',
    fontSize: 25,
    lineHeight: 30,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  mailbox: {
    position: 'absolute',
    top: '5%',
    left: '7%'
  },

  // icon styling
  icon: {
    position: 'absolute',
    top: '5%',
    right: '7%',
    color: '#32a852'
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser, logout }, dispatch)
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)

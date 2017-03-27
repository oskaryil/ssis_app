import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import Auth0Lock from 'react-native-lock';

const lock = new Auth0Lock({clientId: "UL0g6a8ogTTe0j0zkNsYwQNx7pkQiuCI", domain: "oskaryil.eu.auth0.com"});


const TokenView = (props) => {
  return (
      <View style={styles.tokenContainer}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{props.username}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{props.email}</Text>
        <Text style={styles.label}>JWT:</Text>
        <Text style={styles.value}>{props.jwt}</Text>
        <Text style={styles.label}>Refresh Token:</Text>
        <Text style={styles.value}>{props.refreshToken}</Text>
      </View>
    );
};

class LoginScreen extends Component {

  state = {
    logged: false
  };

  componentWillMount() {
  }

  showLock() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // Authentication worked!
      console.log('Logged in with Auth0!');
    });
  }

  _onShowLock() {
  lock.show({
    closable: true,
    authParams: {
      scope: "openid email offline_access",
    },
  }, (err, profile, token) => {
    if (err) {
      console.log(err);
      return;
    }
    this.setState({
      token: token,
      profile: profile,
      logged: true,
    });
    console.log(this.state);
  });
}
_onLogout() {
  this.setState({logged: false});
}
_onRefresh() {
  console.log("Refresh token " + this.state.token.idToken);
  lock.authenticationAPI()
    .refreshToken(this.state.token.refreshToken)
    .then(response => {
      let token = this.state.token;
      token.idToken = response.idToken;
      this.setState({token: token});
      console.log(response);
    })
    .catch(error => console.log(error));
}
_onUserInfo() {
  const token = this.state.token.accessToken;
  console.log("Fetching user info with token " + token);
  lock
    .authenticationAPI()
    .userInfo(token)
    .then(profile => {
      Alert.alert(
        `Hi ${profile.name}`,
        `Your email is ${profile.email}`,
        [
          {text: 'OK', onPress: () => {}},
        ]
      )
    })
    .catch(error => console.log(error));
}


  render() {
    if (this.state.logged) {
      return (
        <View style={styles.container}>
          <View style={styles.actionContainer}>
            <TokenView
              style={styles.token}
              username={this.state.profile.name}
              email={this.state.profile.email}
              jwt={this.state.token.idToken}
              refreshToken={this.state.token.refreshToken}
            />
            <TouchableHighlight style={styles.actionButton} onPress={this._onUserInfo.bind(this)}>
              <Text style={styles.actionButtonText}>Greet</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={this._onRefresh.bind(this)}>
              <Text style={styles.actionButtonText}>Refresh</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.actionButton} onPress={this._onLogout.bind(this)}>
              <Text style={styles.actionButtonText}>Logout</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Please tap on 'Show Lock' to continue.
        </Text>
        <View style={styles.actionContainer}>
          <TouchableHighlight style={styles.actionButton} onPress={this._onShowLock.bind(this)}>
            <Text style={styles.actionButtonText}>Show Lock</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    paddingTop: 54
  },
  token: {
    flex: 1,
  },
  actionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    backgroundColor: '#F5FCFF',
  },
  actionButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16214D',
    borderRadius: 5,
    margin: 8,
  },
  actionButtonText: {
    color: '#ffffff',
  },
  message: {
    fontFamily: 'HelveticaNeue-Thin',
    fontSize: 14,
    alignSelf: 'center',
  },

  // Token View
  tokenContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#D0D2D3',
    margin: 8,
    padding: 10,
  },
  label: {
    fontFamily: 'HelveticaNeue-Medium',
    marginTop: 10,
  },
  value: {
    fontFamily: 'HelveticaNeue-Light',
    alignSelf: 'center',
  },

  // Header View
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 20,
  },
  logo: {
    height: 70,
    width: 191
  }
}

export default LoginScreen;

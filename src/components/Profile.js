import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Profile extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 54}}>
        <Text>User Logged in {this.props.username}</Text>
      </View>
    );
  }
}

export default Profile;

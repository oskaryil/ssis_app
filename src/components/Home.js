import React, { Component } from 'react';
import { ListView, View, Text, TouchableWithoutFeedback, Fetch } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import qs from 'qs';
import iso885915 from 'iso-8859-15';
import  { Card, CardSection, ColorfulSection } from './common';

class Home extends Component {

  state = {
    pentry: [],
  };

  componentWillMount() {
    axios.get('http://ssis.nu:3333/pantry')
      .catch(err => console.error(err))
      .then(response => this.setState({ pentry: response.data.split('\n').splice(0, 2) }));

    const options = {
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    };

    // const params = new URLSearchParams();
    // params.append('user', '15bayi');
    // params.append('pass', 'Stufuck341');

    const formData = new FormData();
    // for(var k in params) {
    //   formData.append(k, params[k]);
    // }
    // formData.append('user', '15bayi');
    // formData.append('pass', 'Stufuck341');
    console.log(formData);

    // fetch('https://api.ssis.nu/login', {
    //   method: 'POST',
    //   headers: {
    //     // 'Accept': 'application/json',
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: formData
    // })
    axios.post('https://api.ssis.nu/login/', qs.stringify({'user': '15bayi', 'pass': 'Stufuck341'}), {
      headers: {
        "Accept": 'text/plain',
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => console.log(response))
    .catch(err => console.log(err));
  }
  //
  renderPentry() {
    if(this.state.pentry) {
      console.log(iso885915.decode(this.state.pentry.join(': ')));
      return (
        iso885915.decode(this.state.pentry.join(': '))
        // iso885915.encode(this.state.pentry.join(': '))
      );
    }
  }

  render() {

    const { cardTitle, containerStyle } = styles;

    return (
      <View style={containerStyle}>
        <ColorfulSection subText={this.renderPentry()} bgColor='#F3BB72'>
          PENTRY
        </ColorfulSection>
        <ColorfulSection onPress={() => Actions.lunchMenu()} bgColor='#FF85A7'>
          LUNCH
        </ColorfulSection>
        <ColorfulSection bgColor="#7BECED">
          INFO
        </ColorfulSection>
        <ColorfulSection onPress={() => Actions.loginScreen()} bgColor="#B3DE7B">
          ELEV
        </ColorfulSection>
    </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800'
  }
}

export default Home;

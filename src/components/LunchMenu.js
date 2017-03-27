import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import axios from 'axios';
import { Card, CardSection } from './common';

class LunchMenu extends Component {

  state = {
    lunchMeny: {}
  };

  componentWillMount() {
    axios.get('http://ssis.nu:3333/lunchMeny')
      .catch(err => console.error(err))
      .then(response => this.setState({ lunchMenu: response.data }));
  }

  renderLunchMenu() {
    const { lunchMenu } = this.state;
    if(lunchMenu) {
      let dishes = [];
      for(let key in lunchMenu) {
        if(lunchMenu.hasOwnProperty(key)) {
          dishes.push(lunchMenu[key].map(dish => {
            return (
                <Text key={dish
                }>{dish}</Text>
            );
          }));
        }
      }
      // return (
      //
      // );
      return (
        <View style={{ flex: 1 }}>
          {dishes}
        </View>
      );
    }
  }


  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <CardSection>
            {this.renderLunchMenu()}
          </CardSection>
        </Card>
      </ScrollView>
    );
  }

}

export default LunchMenu;

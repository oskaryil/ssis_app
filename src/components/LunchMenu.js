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
      .then(response => {
        // console.log(response);
        this.setState({ lunchMenu: JSON.parse(response.data)});
        // console.log(response);
      });
  }

  renderLunchMenu() {
    const { lunchMenu } = this.state;
    if(lunchMenu) {
      console.log(lunchMenu);
      let cards = [];
      let days = [
        'Måndag',
        'Tisdag',
        'Onsdag',
        'Torsdag',
        'Fredag'
      ];
      const dayCounter = 0;
      lunchMenu.days.map(lunchDay => {
        if(lunchDay !== null) {
          console.log(lunchDay);
          // console.log(lunchMenu.days.findIndex(lunchDay));
          // dishes.push(<Text key={days[dayCounter]}>{days[dayCounter]}</Text>)
          let dishesForDay = [];

          lunchDay.map(dish => {
            dishesForDay.push(<Text style={styles.lunchDish} key={dish}>* {dish}</Text>);
          });
          cards.push(
            <Card key={days[dayCounter]}>
              <CardSection><Text style={styles.lunchDay}>{days[dayCounter]}</Text></CardSection>
              <CardSection><Text style={styles.lunchDishes}>{dishesForDay}</Text></CardSection>
            </Card>
          );
          dayCounter++;
        }
      });

      // for(let key in lunchMenu) {
      //   if(lunchMenu.hasOwnProperty(key)) {
      //     dishes.push(lunchMenu[key].map(dish => {
      //       return (
      //           <Text key={dish
      //           }>{dish}</Text>
      //       );
      //     }));
      //   }
      // }
      // return (
      //
      // );
      return (
        <View style={{ flex: 1 }}>
          {cards}
        </View>
      );
    }
  }


  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderLunchMenu()}
      </ScrollView>
    );
  }

}

const styles = {
  lunchDay: {
    fontSize: 18
  },
  lunchDish: {
    alignSelf: 'stretch',
    textAlign: 'center',
    flex: 1
  }
};

export default LunchMenu;

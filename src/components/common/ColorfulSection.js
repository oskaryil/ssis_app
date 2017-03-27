import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class ColorfulSection extends Component {

  subText() {
    if(this.props.subText) {
      return (
        <Text>{this.props.subText}</Text>
      );
    }
  }

  render() {
    return (
      <View style={Object.assign({}, styles.containerStyle, { backgroundColor: this.props.bgColor }) } >
        <TouchableHighlight onPress={this.props.onPress}>
          <Text style={styles.textStyle}>{this.props.children}</Text>
        </TouchableHighlight>
        {this.subText()}
      </View>
    );
  }
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 100,
  },
  textStyle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500'
  }
};

export { ColorfulSection };

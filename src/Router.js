import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './components/Home';
import LunchMenu from './components/LunchMenu';
import LoginScreen from './components/LoginScreen';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 54 }}>
      <Scene
        key="home"
        component={Home}
        title="SSIS"
        initial
      />
      <Scene
        key="lunchMenu"
        component={LunchMenu}
        title="Lunchmeny"
      />
      <Scene
        key="loginScreen"
        component={LoginScreen}
        title="Login"
      />
    </Router>
  );
};

export default RouterComponent;

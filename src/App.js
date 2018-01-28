import React, { Component } from "react";

import { StackNavigator, DrawerNavigator } from "react-navigation";

import { Dimensions} from 'react-native';

import DrawerMenu from "./containers/DrawerMenu";

import ChatContainer from "./containers/Chat";

import Login from "./containers/Login";

import Home from "./containers/Home";

import Register from "./containers/SignUp";

import ForgetPassword from "./containers/ForgetPassword";

import Settings from "./containers/Settings";

const MainScreenNavigator = StackNavigator({
  Home: {screen: Home},
  Login: { screen: Login },
  Register: { screen: Register },
  ForgetPassword: {screen: ForgetPassword},
  Chat: { screen: ChatContainer },
  Settings: { screen: Settings }
});

const Drawer = DrawerNavigator(
  {
    Main: { screen: MainScreenNavigator }
  },
  {
    contentComponent: DrawerMenu,
    drawerWidth: Dimensions.get('window').width*70/100
  }
);

export default Drawer;
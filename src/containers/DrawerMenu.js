import React, { Component } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux"
import * as userAction  from "../actions/userActions"
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationActions } from "react-navigation";

const CONFIG = require('../../config.json');

class DrawerMenu extends Component {
  // This function is used to initialise the state and method
  constructor(props){
    super(props)
    this.state = {
      name: CONFIG.homepageTitle
    }
  }

  /*This method is called when we click on
   * navigation menu
  */
  navigate(route) {
    return this.props.navigation.dispatch(
      NavigationActions.navigate({ routeName: route })
    );
  }

  signOut(){
    if(this.props.user.user && this.props.user.user.id){
      this.props.dispatch(userAction.userLogout(this.props.user.user.id))
    } 
    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })]
      })
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerHeader}>
          <View style={{padding:15}}>
            <Icon name="account-circle" size={60} color="white"/>
          </View>
          <Text style={styles.userName}>{this.state.name}</Text>
          <Text style={styles.subtitle}>{CONFIG.homePageSubtitle}</Text>
        </View>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.navigate("Chat", { isStatusBarHidden: false })}
          >
            <View style={styles.row}>
              <View style={{paddingTop:5, paddingRight:10}}>
                <Icon name="chat" size={20} color="black"/>
              </View>
              <Text style={styles.menuItemText}>Chat</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => this.navigate("Settings", { isStatusBarHidden: false })}
          >
            <View style={styles.row}>
              <View style={{paddingTop:5, paddingRight:10}}>
                <Icon name="settings" size={20} color="black"/>
              </View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={this.signOut.bind(this)}
          >
            <View style={styles.row}>
              <View style={{paddingTop:5, paddingRight:10}}>
                <Icon name="power-settings-new" size={20} color="black"/>
              </View>
              <Text style={styles.menuItemText}>SignOut</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  drawerHeader:{
    height:160,
    backgroundColor:'#156489',
  },
  userName:{
    fontSize: 24,
    color:'white',
    paddingLeft:10,
  },  
  subtitle:{
    fontSize: 20,
    color:'white',
    paddingLeft:10,
    paddingTop:5,
    color: "#c9c9c9",
  },  
  drawerContent:{
    paddingTop:10,
  },
  menuItem: {
    padding: 10,
    justifyContent: "center",
    marginBottom: 2
  },
  menuItemText: {
    fontSize: 20,
    color:'black',
  },
  row:{
    flexDirection: "row",
  }
});

function mapStateToProps(state){
  return { user: state.user}
}
export default connect(mapStateToProps)(DrawerMenu);
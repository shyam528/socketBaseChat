import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image, AsyncStorage, Platform } from 'react-native';

//const HomePageLogo = require("../components/images/HomePageLogo.png")

const CONFIG = require('../../config.json');

class Home extends Component {

  //This function is used for state and method intilisation
  constructor(props){
    super(props)
    this.goToLogin = this.goToLogin.bind(this);
  }
  //Header of the chat page
  static navigationOptions = {header:false}

  //This method redirect to login page
  goToLogin() {
    this.props.navigation.navigate('Login',{})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:60, alignSelf:'center'}}>
          <Text style={styles.textHeader}>{CONFIG.homepageTitle}</Text>
        </View>
        <View style={{paddingTop:20, alignSelf:'center'}}>
          <Text style={styles.textHeader}>{CONFIG.homePageSubtitle}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={this.goToLogin}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register',{})}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Chat',{})}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Chat As Anonymous</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: CONFIG.homePageColor,
    padding:6,
  },
  textHeader:{
    color:'#000000',
    fontSize:30,
    alignSelf:'center',
    fontFamily:Platform.OS === 'android'?'cursive':null
  },
  button: {
    height: 40,
    width: 260,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#156489',
    margin:10,
  },
  buttonGroup: {
    position: "absolute",
    left: 0,
    bottom: 20,
    right: 0,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  buttonText:{
    color:'white',
    fontFamily:Platform.OS === 'android'?'fantasy':null
  },
});

export default Home;
import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, Button,StyleSheet,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationActions } from "react-navigation";
import * as userAction  from "../actions/userActions";
import { connect } from "react-redux";

class Login extends Component {
    constructor (props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        isLoggedIn:false
      };
      this.onLogin = this.onLogin.bind(this);
    }

    //Header of the chat page
    static navigationOptions = {header:false}

    onLogin () {
      var userData = {
        email:this.state.email,
        password: this.state.password,
        source: 'platform'
      }
      this.props.dispatch(userAction.userLogin(userData))
    }

    componentDidUpdate() {
      if(this.props.user.loggedIn) {
        this.props.navigation.navigate('Chat',{})
      }
    }

    render() {
      return (
        <ScrollView style={{padding: 60,backgroundColor:'white'}} keyboardShouldPersistTaps="handled">
          <View style={styles.row}>
            <View>
              <Text style={{fontSize: 27}}>SignIn</Text>
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.dispatch(NavigationActions.back())}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input}
              placeholder='Username' 
              autoCapitalize='none' 
              autoCorrect={false} 
              autoFocus={false} 
              keyboardType='email-address' 
              value={this.state.email} 
              underlineColorAndroid={'rgba(1,1,1,1)'}
              onChangeText={(text) => this.setState({ email: text })} />
          <TextInput style={styles.input}
              placeholder='Password' 
              autoCapitalize='none' 
              autoCorrect={false} 
              secureTextEntry={true} 
              underlineColorAndroid={'rgba(1,1,1,1)'}
              value={this.state.password} 
              onChangeText={(text) => this.setState({ password: text })} />
          <View style={{margin: 7}}/>
          <Button onPress={this.onLogin.bind(this)} title="Login"/>
          <View style={{margin: 7}}/>
          <Button onPress={()=> this.props.navigation.navigate('ForgetPassword',{})} title="Forget Password"/>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input:{
    fontSize:20,
  }
});

function mapStateToProps(state){
  return { user: state.user}
}
export default connect(mapStateToProps)(Login);
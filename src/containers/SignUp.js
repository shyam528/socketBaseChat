import React, { Component } from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationActions } from "react-navigation";
import * as userAction  from "../actions/userActions";
import { connect } from "react-redux";

class Register extends Component {

    //This method is used to initialise the method and state
    constructor (props) {
      super(props);
      this.state = {
        fullName:'',
        username: '',
        email:'',
        password: '',
        number:'',
      };
      this.register = this.register.bind(this);
    }

    //Header of the chat page
    static navigationOptions = {header:false}

    componentDidUpdate(){
      if(this.props.user.signup){
        this.props.navigation.navigate('Login',{})
      }
    }

    register () {
      let userData = {
        fullName : this.state.fullName,
        username : this.state.username,
        email : this.state.email,
        password : this.state.password,
        number : this.state.number,
      }
      this.props.dispatch(userAction.userSignUp(userData))
    }

    render() {
      return (
        <ScrollView style={{padding: 60,backgroundColor:'white'}} keyboardShouldPersistTaps="handled">
          <View style={styles.row}>
            <View>
              <Text style={{fontSize: 27}}>SignUp</Text>
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.dispatch(NavigationActions.back())}>
              <Icon name="close" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TextInput style={{fontSize:20}}
            placeholder='Full Name' 
            autoCapitalize='none' 
            autoCorrect={false} 
            autoFocus={false} 
            underlineColorAndroid={'rgba(1,1,1,1)'}
            value={this.state.fullName} 
            onChangeText={(text) => this.setState({ fullName: text })} 
          />
          <TextInput style={{fontSize:20}}
            placeholder='Phone Number' 
            autoCapitalize='none' 
            autoCorrect={false} 
            autoFocus={false} 
            underlineColorAndroid={'rgba(1,1,1,1)'}
            value={this.state.number} 
            onChangeText={(text) => this.setState({ number: text })} 
          />
          <TextInput style={{fontSize:20}}
            placeholder='Username' 
            autoCapitalize='none' 
            autoCorrect={false} 
            underlineColorAndroid={'rgba(1,1,1,1)'}
            value={this.state.username} 
            onChangeText={(text) => this.setState({ username: text })} 
          />
          <TextInput style={{fontSize:20}}
            placeholder='Email' 
            autoCapitalize='none' 
            autoCorrect={false} 
            keyboardType='email-address' 
            underlineColorAndroid={'rgba(1,1,1,1)'}
            value={this.state.email} 
            onChangeText={(text) => this.setState({ email: text })} 
          />
          <TextInput style={{fontSize:20}}
            placeholder='Password' 
            autoCapitalize='none' 
            autoCorrect={false} 
            underlineColorAndroid={'rgba(1,1,1,1)'}
            secureTextEntry={true} 
            value={this.state.password} 
            onChangeText={(text) => this.setState({ password: text })} 
          />
          <View style={{margin: 7}}/>
          <Button onPress={this.register} title="Register"/>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  row:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function mapStateToProps(state){
  return { user: state.user}
}
export default connect(mapStateToProps)(Register);